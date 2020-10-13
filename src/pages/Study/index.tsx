import React, { useState, useEffect } from 'react';
import { history } from 'umi';
import { Skeleton, Button, Modal, Input, message } from 'antd';
import CopyToClipboard from 'react-copy-to-clipboard';

import { RightOutlined, PlusOutlined } from '@ant-design/icons';

import { getCourseList, joinCourse } from '@/server';

import Header from '@/components/Header';
import PullDown from '@/components/PullDown';

import makeQuery from '@/util/makeQuery';

import styles from './index.less';

interface Course {
  name: string;
  teacher: string;
  coverUrl: string;
  id: number;
  token: string;
}

export default () => {
  const [courseModalShow, setCourseModalShow] = useState<boolean>(false);
  const [courseList, setCourseList] = useState<Course[]>();
  const [loading, setLoading] = useState<boolean>(true);
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
  const [courseToken, setCourseToken] = useState<string>('');

  const fetchCourseList = () => {
    setLoading(true);
    getCourseList()
      .then(({ data }: { data: Course[] }) => {
        setCourseList(data);
        setTimeout(() => {
          setLoading(false);
        }, 200);
      })
      .catch(() => {
        setLoading(false);
      });
  };
  const handleJoinCourse = () => {
    setConfirmLoading(true);
    const reset = () => {
      setConfirmLoading(false);
      setCourseModalShow(false);
    };
    joinCourse({ token: courseToken })
      .then(() => {
        reset();
        setCourseToken('');
        message.success('加入课程成功');
        fetchCourseList();
      })
      .catch(() => {
        reset();
      });
  };

  useEffect(() => {
    fetchCourseList();
  }, []);
  return (
    <>
      <div className={styles.course}>
        <Header
          leftPart={null}
          title="全部课程"
          // rightPart={<span>管理课程</span>}
        />
        <PullDown
          abandonHeight={220}
          onRefresh={() => {
            fetchCourseList();
          }}
        >
          <>
            <Skeleton
              active
              avatar={{ shape: 'square' }}
              round
              title={false}
              loading={loading}
              className={styles.skeleton}
            >
              {courseList?.map(
                ({ name, teacher, coverUrl, id, token }: Course) => (
                  <div
                    key={id}
                    className={styles.courseItem}
                    onClick={() => {
                      history.push(
                        `${history.location.pathname}/${id}${makeQuery({
                          course: name,
                        })}`,
                      );
                    }}
                  >
                    <img src={coverUrl} className={styles.cover} />
                    <div className={styles.content}>
                      <p className={styles.name}>{name}</p>
                      <p className={styles.description}>
                        <span>{teacher}</span>

                        <CopyToClipboard
                          text={token}
                          onCopy={() => {
                            message.success('复制成功');
                          }}
                        >
                          <span onClick={e => e.stopPropagation()}>
                            口令: <span className={styles.token}>{token}</span>
                          </span>
                        </CopyToClipboard>
                      </p>
                    </div>
                    <RightOutlined className={styles.enter} />
                  </div>
                ),
              )}
            </Skeleton>
            <div className={styles.addCourse}>
              <Button
                onClick={() => {
                  setCourseModalShow(true);
                }}
                type="primary"
                icon={<PlusOutlined />}
              >
                加入课程
              </Button>
            </div>
          </>
        </PullDown>
      </div>
      <Modal
        visible={courseModalShow}
        title="请输入课程号"
        confirmLoading={confirmLoading}
        closable
        centered
        destroyOnClose
        onOk={handleJoinCourse}
        onCancel={() => {
          setCourseModalShow(false);
        }}
        okText="加入"
        cancelText="取消"
        width={1000}
      >
        <Input
          autoFocus
          value={courseToken}
          onChange={e => {
            setCourseToken(e.target.value);
          }}
        />
      </Modal>
    </>
  );
};
