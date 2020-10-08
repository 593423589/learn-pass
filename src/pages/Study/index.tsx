import React, { useState, useEffect } from 'react';
import { history } from 'umi';
import { Skeleton, Button, Modal, Input, message } from 'antd';

import { RightOutlined, PlusOutlined } from '@ant-design/icons';

import { getCourseList } from '@/server';

import Header from '@/components/Header';
import PullDown from '@/components/PullDown';

import makeQuery from '@/util/makeQuery';

import styles from './index.less';

interface Course {
  name: string;
  teacher: string;
  avatar: string;
  id: string;
}

export default () => {
  const [courseModalShow, setCourseModalShow] = useState<boolean>(false);
  const [courseList, setCourseList] = useState<Course[]>();
  const [loading, setLoading] = useState<boolean>(true);
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);

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
          footerHeight={60}
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
              {courseList?.map(({ name, teacher, avatar, id }: Course) => (
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
                  <img src={avatar} className={styles.avatar} />
                  <div className={styles.content}>
                    <p className={styles.name}>{name}</p>
                    <p className={styles.teacher}>{teacher}</p>
                  </div>
                  <RightOutlined className={styles.enter} />
                </div>
              ))}
            </Skeleton>
            <div
              className={styles.addCourse}
              onClick={() => {
                setCourseModalShow(true);
              }}
            >
              <div className={styles.addCourseBox}>
                <Button type="primary" icon={<PlusOutlined />}>
                  加入课程
                </Button>
              </div>
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
        onOk={() => {
          setConfirmLoading(true);
          setTimeout(() => {
            setConfirmLoading(false);
            setCourseModalShow(false);
            message.success('加入课程成功');
            fetchCourseList();
          }, 1000);
        }}
        onCancel={() => {
          setCourseModalShow(false);
        }}
        okText="加入"
        cancelText="取消"
        width={1000}
      >
        <Input />
      </Modal>
    </>
  );
};
