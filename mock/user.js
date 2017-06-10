const Mock = require('mockjs');

const login = Mock.mock({
  ret: 200,
  data: {
    code: 0,
    msg: '',
    userid: '35',
  },
  msg: '',
});
const userinfo = Mock.mock({
  ret: 200,
  data: {
    code: 0,
    msg: '',
    info: {
      user_id: '35',
      user_name: '@name',
      user_nick: '@last',
      user_gender: 'gg',
      user_psw: '2359e60dbd7623a7f1553f3c3712b9b9',
      user_address: '华景新城',
      user_phone: /^1[34578]\d{9}$/,
      user_email: 'yuyun233@qq.com',
      user_qq: /\d{9}$/,
      user_weiboName: 'Diro仔_sysu',
      user_weiboLink: 'http://weibo.com/smallcancan',
      user_urgentName: '@name',
      user_urgentPhone: /^1[34578]\d{9}$/,
      user_interest: '协作+头驴+尾驴+无线通讯+骑行+游泳+跑步+奢靡腐败',
      user_experienceGrade: '0',
      user_knowledgeScore: '0',
      user_comments: '亂甘跑的小强',
      user_createtime: '@datetime',
    },
  },
  msg: '',
});

module.exports = {
  'POST /api/serviceUser.Login': login,
  'POST /api/serviceUser.GetBaseInfo': userinfo,
};
