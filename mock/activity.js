const Mock = require('mockjs');

const Random = Mock.Random;

Random.extend({
  eventType() {
    const eventTypes = ['休闲拉练', '正常拉练', '极限拉练', '休闲露营', '长线露营', '休闲户外', '非户外活动AA约伴'];
    return this.pick(eventTypes);
  },
});

const activityListData = Mock.mock({
  'data|20': [
    {
      event_id: '@id',
      event_name: '测试活动',
      event_type: '@eventType',
      event_starttime: '@datetime',
      event_join_endtime: '@datetime',
      event_comments: '这是活动备注',

      event_leader: '@name',
      event_leader_email: '@email',
      event_pic() {
        return Mock.Random.image('800x600', Mock.Random.color(), '#757575', 'png', this.event_name);
      },
      event_endtime: '@datetime',
      event_membernum: 10,
      event_membermax: 12,
      event_abstract: '从活动正文中截取前200字|从活动正文中截取前200字|从活动正文中截取前200字|从活动正文中截取前200字|从活动正文中截取前200字|从活动正文中截取前200字|',
    },
  ],
});

const database = activityListData.data;


module.exports = {
  'POST /api/serviceUser.GetEventList': function (req, res) {
    res.status(200).json({
      ret: '200',
      data: {
        code: 0,
        msg: '',
        list: database,
      },
      msg: '',
    });
  },

};
