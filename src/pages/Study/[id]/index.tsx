// import React, { FC } from 'react';
// import { Tabs } from 'antd';

// import Header from '@/components/Header';

// import VideosList from './components/VideosList';

// import styles from './index.less';

// enum TabKeys {
//   VIDEO = 'video',
//   DOCUMENT = 'document',
//   QUESTION = 'question',
// }

// const TAB_LIST = [
//   {
//     value: '视频',
//     key: TabKeys.VIDEO,
//   },
//   {
//     value: '课件',
//     key: TabKeys.DOCUMENT,
//   },
//   {
//     value: '习题',
//     key: TabKeys.QUESTION,
//   },
// ];

// export default (): FC => {
//   const { TabPane } = Tabs;

//   const renderContent = (value: TabKeys) => {
//     if (value === TabKeys.VIDEO) return <VideosList />;
//     return null;
//   };

//   return (
//     <div>
//       <Header title="课程" />
//       <Tabs className={styles.tab}>
//         {TAB_LIST.map(tab => (
//           <TabPane className={styles.tabPane} tab={tab.value} key={tab.key}>
//             {renderContent(tab.key)}
//           </TabPane>
//         ))}
//       </Tabs>
//     </div>
//   );
// };
