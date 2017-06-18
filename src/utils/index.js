import config from './config';

const days = (start, end) => {
  const time1 = Date.parse(start);
  const time2 = Date.parse(end);
  const dayCount = Math.ceil((Math.abs(time2 - time1)) / 1000 / 60 / 60 / 24);
  return dayCount;
};

const compareDays = (date1, date2) => (
  Date.parse(date1) > Date.parse(date2)
);

const activityPostUitls = (params, userId) => ({
  event_createUserId: userId,
  event_name: params.activityTitle,
  event_type: params.activityType,
  event_detail: params.activityDetail,
  event_starttime: params.activityTime[0].format('YYYY-MM-DD HH:mm:ss'),
  event_endtime: params.activityTime[1].format('YYYY-MM-DD HH:mm:ss'),
  event_join_starttime: params.applyTime[0].format('YYYY-MM-DD HH:mm:ss'),
  event_join_endtime: params.applyTime[1].format('YYYY-MM-DD HH:mm:ss'),
  event_comments: params.notes,
  event_maxhiker: params.maxPeople,
  event_gather_location: params.collectionLocation,
  event_gather_time: params.collectionTime.format('YYYY-MM-DD HH:mm:ss'),
  event_place_of_departure: params.departure,
  event_destination: params.arrivals,
});

const registerPostUitls = params => ({
  user_email: params.email,
  user_psw: params.password,
  user_urgentname: params.emergency,
  user_urgentphone: params.emergencyPhone,
  user_name: params.realName,
  user_nick: params.nickname,
  user_gender: params.gender,
  user_phone: params.phone,
  user_address: params.address,
  user_qq: params.QQ,
  user_weibo: params.weibo,
  user_interest: params.role.join('+'),
  user_comments: params.notes,
});

module.exports = {
  config,
  days,
  compareDays,
  activityPostUitls,
  registerPostUitls,
};
