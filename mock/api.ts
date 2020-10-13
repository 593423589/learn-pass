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
  // 'GET /api/getCourseList': {
  //   code: 200,
  //   description: '网络错误',
  //   data: CourseList,
  // },
  'GET /api/getCourseList': {
    code: 200,
    description: 'success',
    data: CourseList,
  },
  'GET /api/getVideoProcess': {
    code: 200,
    description: 'success',
    data: 20,
  },
  'GET /api/joinCourse': {
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
    data: null,
  },
};
