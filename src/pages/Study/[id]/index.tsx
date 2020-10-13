import React from 'react';
import { useLocation } from 'umi';

import { Tabs } from 'antd';

import Header from '@/components/Header';

import VideosList from './components/VideosList';

import DocumentList from './components/DocumentList'

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
    if (value === TabKeys.VIDEO) return <VideosList />;
    if (value === TabKeys.DOCUMENT) return <DocumentList documentList={[
      {name: '数据结构第一章', src: 'https://www.baidu.com'},
      {name: '数据结构第一章', src: 'https://www.baidu.com'},
      {name: '数据结构第一章', src: 'https://www.baidu.com'},
      {name: '数据结构第一章', src: 'https://www.baidu.com'},
      {name: '数据结构第一章', src: 'https://www.baidu.com'},
    ]}/>;
    return null;
  };
  const courseName = useLocation().query.course;

  return (
    <div>
      <Header title={courseName} />
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
