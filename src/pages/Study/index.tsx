// import React, { useState } from 'react';
// import { history } from 'umi';
// import { RightOutlined, PlusOutlined } from '@ant-design/icons';

// import Header from '@/components/Header';
// import CourseModal from './components/CourseModal';
// import AVATAR from '@/assets/1.jpg';

// import styles from './index.less';
// const MOCK = [
//   {
//     id: 123,
//     name: '数据库',
//     teacher: '老张',
//     avatar: AVATAR,
//   },
//   {
//     id: 1234,
//     name: '数据库',
//     teacher: '老张',
//     avatar: AVATAR,
//   },
//   {
//     id: 123345,
//     name: '数据库',
//     teacher: '老张',
//     avatar: AVATAR,
//   },
// ];

// export default () => {
//   const [courseModalShow, setCourseModalShow] = useState<boolean>(false);
//   return (
//     <>
//       <div className={styles.course}>
//         <Header leftPart={null} title="全部课程" />
//         {MOCK.map(({ name, teacher, avatar, id }) => (
//           <div
//             key={id}
//             className={styles.courseItem}
//             onClick={() => {
//               history.push(`${history.location.pathname}/${id}`);
//             }}
//           >
//             <img src={avatar} className={styles.avatar} />
//             <div className={styles.content}>
//               <p className={styles.name}>{name}</p>
//               <p className={styles.teacher}>{teacher}</p>
//             </div>
//             <RightOutlined className={styles.enter} />
//           </div>
//         ))}
//         <div
//           className={styles.addCourse}
//           onClick={() => {
//             setCourseModalShow(true);
//           }}
//         >
//           <div className={styles.addCourseBox}>
//             <PlusOutlined />
//           </div>
//         </div>
//       </div>
//       {courseModalShow && <CourseModal show={courseModalShow} />}
//     </>
//   );
// };
