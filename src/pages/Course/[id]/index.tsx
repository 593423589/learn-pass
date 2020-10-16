import React from 'react';
import { useLocation, history } from 'umi';

import { Tabs, Button, message } from 'antd';

import Header from '@/components/Header';
import { deleteCourse } from '@/server';

import DocumentList from './components/DocumentList';
import VideoList from './components/VideoList';

import styles from './index.less';

enum TabKeys {
  VIDEO = 'video',
  DOCUMENT = 'document',
  QUESTION = 'question',
}

const TAB_LIST = [
  {
    value: '视频',
    key: TabKeys.VIDEO,
  },
  {
    value: '课件',
    key: TabKeys.DOCUMENT,
  },
  {
    value: '习题',
    key: TabKeys.QUESTION,
  },
];

export default () => {
  const { TabPane } = Tabs;

  const renderContent = (value: TabKeys) => {
    if (value === TabKeys.VIDEO) return <VideoList />;
    if (value === TabKeys.DOCUMENT) return <DocumentList />;
    return null;
  };

  // @ts-ignore
  //umi useLocation type bug
  const courseName = useLocation().query.courseName;
  // @ts-ignore
  const courseId = useLocation().query.courseId;

  return (
    <div>
      <Header
        title={courseName}
        rightPart={
          <Button
            danger
            type="primary"
            size="small"
            onClick={() => {
              deleteCourse({
                courseId,
              }).then(() => {
                message.success('删除成功');
                history.go(-1);
              });
            }}
          >
            删除
          </Button>
        }
      />
      <Tabs className={styles.tab}>
        {TAB_LIST.map(tab => (
          <TabPane className={styles.tabPane} tab={tab.value} key={tab.key}>
            {renderContent(tab.key)}
          </TabPane>
        ))}
      </Tabs>
    </div>
  );
};
