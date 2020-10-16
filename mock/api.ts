// import AVATAR from '../src/assets/1.jpg';

const AVATAR = 11;
const CourseList = [
  {
    id: 123,
    name: '数据库',
    teacher: '老张',
    cover: AVATAR,
    token: 'fasfsa',
  },
  {
    id: 1234,
    name: 'c语言',
    teacher: '老张',
    cover: AVATAR,
    token: 'fasfsa',
  },
  {
    id: 123345,
    name: '编译原理',
    teacher: '老张',
    cover: AVATAR,
    token: 'fasfsa',
  },
];
const VideoList = [
  {
    id: 63987387,
    name: '元的生产',
    isCompleted: true,
  },
  {
    id: 3543453,
    name: '母猪的产后护理',
    isCompleted: true,
  },
  {
    id: 24524534,
    name: '钢铁是怎样炼成的',
    isCompleted: false,
  },
  {
    id: 3453453345345,
    name: '炉里奇迹',
    isCompleted: false,
  },
];

export default {
  // 支持值为 Object 和 Array
  'GET /api/users': { users: [1, 2] },
  // GET 可忽略
  '/api/users/1': { id: 1 },
  // 支持自定义函数，API 参考 express@4
  'POST /api/login': {
    code: 200,
    description: 'success',
    data: {
      name: 'wyh',
    },
  },
  'GET /api/getVideoList': {
    code: 200,
    description: 'success',
    data: VideoList,
  },
  'GET /api/course/getCourseList': {
    code: 200,
    description: '网络错误',
    data: CourseList,
  },
  'GET /api/getVideoProcess': {
    code: 200,
    description: 'success',
    data: 50,
  },
  'GET /api/course/joinCourse': {
    code: 200,
    description: 'success',
    data: null,
  },

  'GET /api/getVideo': {
    code: 200,
    description: 'success',
    data: { id: 23123, url: '的就拉开时间到了', name: '钢铁是怎样炼成的' },
  },
  'POST /api/reportVideoProcess': {
    code: 200,
    description: 'success',
    data: null,
  },
  'POST /api/finishVideo': {
    code: 200,
    description: 'success',
    data: null,
  },
  'GET /api/getQuestions': {
    code: 200,
    description: 'success',
    data: null,
  },
  'GET /api/getDocuments': {
    code: 200,
    description: 'success',
    data: [
      {
        id: 4656,
        name: '数据库第一节课件',
        url:
          'https://learn-pass.oss-cn-beijing.aliyuncs.com/document/%E8%B5%B5%E8%AF%97%E5%A5%87%E4%B8%AA%E4%BA%BA%E7%AE%80%E5%8E%86.pdf',
        fileName: '1.pdf',
        createTime: '2020 12:40:45 GMT+0800',
      },
      {
        id: 456,
        name: '数据库第二节课件',
        url:
          'https://learn-pass.oss-cn-beijing.aliyuncs.com/document/%E8%B5%B5%E8%AF%97%E5%A5%87%E4%B8%AA%E4%BA%BA%E7%AE%80%E5%8E%86.pdf',
        fileName: '1.ppt',
        createTime: '2020 12:40:45 GMT+0800',
      },
      {
        id: 46323256,
        name: '学习学个屁',
        url:
          'https://learn-pass.oss-cn-beijing.aliyuncs.com/document/%E8%B5%B5%E8%AF%97%E5%A5%87%E4%B8%AA%E4%BA%BA%E7%AE%80%E5%8E%86.pdf',
        fileName: '1.doc',
        createTime: '2020 12:40:45 GMT+0800',
      },
    ],
  },
  'DELETE /api/course/deleteCourse:*': {
    code: 200,
    description: 'success',
    data: null,
  },
  'POST /api/course/createCourse': {
    code: 200,
    description: 'success',
    data: null,
  },
};
