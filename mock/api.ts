// import AVATAR from '../src/assets/1.jpg';
const AVATAR = 11;
const CourseList = [
  {
    id: '123',
    name: '数据库',
    teacher: '老张',
    avatar: AVATAR,
  },
  {
    id: '1234',
    name: 'c语言',
    teacher: '老张',
    avatar: AVATAR,
  },
  {
    id: '123345',
    name: '编译原理',
    teacher: '老张',
    avatar: AVATAR,
  },
];

export default {
  // 支持值为 Object 和 Array
  'GET /api/users': { users: [1, 2] },
  // GET 可忽略
  '/api/users/1': { id: 1 },
  // 支持自定义函数，API 参考 express@4
  'POST /api/login': {
    code: 0,
    description: 'succese',
    data: {
      name: 'wyh',
    },
  },
  'GET /api/getVideos': {
    code: 0,
    description: 'succese',
    data: [
      {
        thumbnail: '',
        name: '第一节课',
        creater: '王有赫',
        time: '2020-10-10',
        id: 'sadasd',
        isCompleted: true,
      },
      {
        thumbnail: '',
        name: '第一节课',
        creater: '王有赫',
        time: '2020-10-10',
        id: 'sadasd',
        isCompleted: true,
      },
      {
        thumbnail: '',
        name: '第一节课',
        creater: '王有赫',
        time: '2020-10-10',
        id: 'sadasd',
        isCompleted: false,
      },
      {
        thumbnail: '',
        name: '第一节课',
        creater: '王有赫',
        time: '2020-10-10',
        id: 'sadasd',
        isCompleted: false,
      },
    ],
  },
  'GET /api/getCourseList': {
    code: 0,
    description: 'succese',
    data: CourseList,
  },
};
