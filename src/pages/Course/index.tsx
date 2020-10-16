import React, { useState, useEffect } from 'react';
import { history } from 'umi';
import { Skeleton, Button, Modal, Input, message, Form, Upload } from 'antd';
import CopyToClipboard from 'react-copy-to-clipboard';

import {
  RightOutlined,
  PlusOutlined,
  LoadingOutlined,
} from '@ant-design/icons';

import { getCourseList, joinCourse, createCourse } from '@/server';

import Header from '@/components/Header';
import PullDown from '@/components/PullDown';

import { getUerInfo } from '@/util';
import makeQuery from '@/util/makeQuery';
import { uploadCover } from '@/util/oss';

// @ts-ignore
import IMG from '@/assets/0.jpg';

import styles from './index.less';

interface Course {
  name: string;
  teacher: string;
  coverUrl: string;
  id: number;
  token: string;
}

// @ts-ignore
const isStudent = getUerInfo().isStudent;

export default () => {
  const [joinCourseModalShow, setJoinCourseModalShow] = useState<boolean>(
    false,
  );
  const [creatCourseModalShow, setCreatCourseModalShow] = useState<boolean>(
    false,
  );
  const [courseList, setCourseList] = useState<Course[]>();
  const [courseListLoading, setCourseListLoading] = useState<boolean>(false);
  const [uploadCoverLoading, setUploadCoverLoading] = useState<boolean>(false);
  const [confirmJoinCourse, setConfirmJoinCourse] = useState<boolean>(false);
  const [courseTokenValue, setCourseTokenValue] = useState<string>('');
  const [courseCoverUrl, setCourseCoverUrl] = useState<string>('');
  const [courseCoverError, setCourseCoverError] = useState<boolean>(false);

  const fetchCourseList = () => {
    setCourseListLoading(true);
    getCourseList()
      .then(({ data }: { data: Course[] }) => {
        setCourseList(data);
        setTimeout(() => {
          setCourseListLoading(false);
        }, 200);
      })
      .catch(() => {
        setCourseListLoading(false);
      });
  };
  const handleJoinCourse = () => {
    setConfirmJoinCourse(true);
    const reset = () => {
      setConfirmJoinCourse(false);
      setJoinCourseModalShow(false);
    };

    joinCourse({ token: courseTokenValue })
      .then(() => {
        reset();
        setCourseTokenValue('');
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

  const uploadButton = (
    <div>{uploadCoverLoading ? <LoadingOutlined /> : <PlusOutlined />}</div>
  );

  return (
    <>
      <div className={styles.course}>
        <Header leftPart={null} title="全部课程" />
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
              loading={courseListLoading}
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
                          courseName: name,
                          courseId: id,
                        })}`,
                      );
                    }}
                  >
                    {/* <img src={coverUrl} className={styles.cover} /> */}
                    <img src={IMG} className={styles.cover} />
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
                            <span className={styles.token}>
                              复制口令: {token}
                            </span>
                          </span>
                        </CopyToClipboard>
                      </p>
                    </div>

                    <RightOutlined className={styles.enter} />
                  </div>
                ),
              )}
            </Skeleton>
            <div className={styles.courseOperationWrapper}>
              {isStudent ? (
                <Button
                  onClick={() => {
                    setJoinCourseModalShow(true);
                  }}
                  type="primary"
                >
                  加入课程
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    setCreatCourseModalShow(true);
                  }}
                  type="primary"
                  className={styles.createCourse}
                >
                  创建课程
                </Button>
              )}
            </div>
          </>
        </PullDown>
      </div>
      <Modal
        visible={joinCourseModalShow}
        title="请输入课程复制口令"
        confirmLoading={confirmJoinCourse}
        closable
        centered
        destroyOnClose
        onOk={handleJoinCourse}
        onCancel={() => {
          setJoinCourseModalShow(false);
        }}
        okText="加入"
        cancelText="取消"
        width={1000}
      >
        <Input
          autoFocus
          value={courseTokenValue}
          onChange={e => {
            setCourseTokenValue(e.target.value);
          }}
        />
      </Modal>

      <Modal
        visible={creatCourseModalShow}
        title="创建课程"
        confirmLoading={confirmJoinCourse}
        closable
        centered
        destroyOnClose
        onCancel={async () => {
          setCreatCourseModalShow(false);
          setCourseCoverError(false);
          setCourseCoverUrl('');
          setUploadCoverLoading(false);
        }}
        footer={false}
        width={1000}
      >
        <Form
          onFinish={({ name, description }) => {
            setCourseCoverError(!Boolean(courseCoverUrl));
            console.log(name, description, courseCoverUrl);

            if (!name || !courseCoverUrl) return;
            createCourse({
              name,
              description,
              cover: courseCoverUrl,
            }).then(() => {
              message.success('创建成功');
              setCreatCourseModalShow(false);
            });
          }}
        >
          <Form.Item
            label="课程名"
            name="name"
            rules={[{ required: true, message: '请输入课程名' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="课程封面"
            name="cover"
            rules={[{ required: true, message: '请上传课程封面' }]}
            validateStatus="error"
            help={courseCoverError ? '请上传课程封面' : null}
          >
            <Upload
              listType="picture-card"
              accept="image/*"
              showUploadList={false}
              beforeUpload={file => {
                const isLt5M = file.size / 1024 / 1024 < 5;
                if (!isLt5M) {
                  message.error('文件大小不能超过 5MB');
                  return false;
                }
                return true;
              }}
              onChange={info => {
                if (info.file.status === 'uploading') {
                  setUploadCoverLoading(true);
                  return;
                }
                uploadCover(info.file.originFileObj as File).then(({ url }) => {
                  setCourseCoverUrl(url);
                });
              }}
            >
              {courseCoverUrl ? (
                <img
                  className={styles.coverImage}
                  src={courseCoverUrl}
                  alt="avatar"
                  onClick={e => {
                    setCourseCoverUrl('');
                    setUploadCoverLoading(false);
                    e.stopPropagation();
                  }}
                />
              ) : (
                uploadButton
              )}
            </Upload>
          </Form.Item>

          <Form.Item label="其它信息" name="description">
            <Input.TextArea maxLength={30} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className={styles.submit}>
              提交
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
