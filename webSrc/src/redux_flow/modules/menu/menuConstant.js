import keyMirror from 'key-mirror';

export default keyMirror({
  UPDATE_ACTIVE_ITEMS: null,
});

export const menus = [
  {
    id: 1,
    title: '待辦事項',
    children: [{
      title: 'TodoList',
      redirectUrl: '/',
    }]
  }, {
    id: 2,
    title: '計數器',
    children: [{
      title: 'Counter',
      redirectUrl: '/counter',
    }]
  }, {
    id: 3,
    title: '檔案上傳',
    children: [{
      title: 'Upload',
      redirectUrl: '/upload',
    }]
  },
];
