import { message } from 'antd';
import config from './config';

const days = (start, end) => {
  const time1 = Date.parse(start);
  const time2 = Date.parse(end);
  const dayCount = Math.ceil((Math.abs(time2 - time1)) / 1000 / 60 / 60 / 24);
  return dayCount;
};

const compareDays = (date1, date2) => (Date.parse(date1) > Date.parse(date2));

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

const notificaionUtils = (type, content) => {
  message[type](content);
};
const arrayFormatUtils = list => (list
  ? list.join('+')
  : null);
const joinActivityUtils = params => ({
  event_joinlist_eventid: params.eventId,
  event_joinlist_userid: params.userId,
  event_joinlist_userphone: params.phoneNum,
  event_joinlist_qq: params.qq,
  event_joinlist_userurgentname: params.emergencyMan,
  event_joinlist_userurgentphone: params.emergencyNum,
  event_joinlist_useraddress: params.address,
  event_joinlist_userrole: arrayFormatUtils(params.role),
  event_joinlist_comments: params.notes,
  event_joinlist_insurance: params.insurance,
  event_joinlist_usercamp: arrayFormatUtils(params.camp),
  event_joinlist_usercamppad: arrayFormatUtils(params.fangchaodian),
  event_joinlist_usersleepingbag: params.sleepBag,
  event_joinlist_userinterphone: arrayFormatUtils(params.duijiangji),
  event_joinlist_userbag: params.backpack,
  event_joinlist_userBurner: arrayFormatUtils(params.lutou),
  event_joinlist_userpot: arrayFormatUtils(params.taoguo),
});

const getBBSReList = (details, currentReList) => {
  const allDataSource = [];
  allDataSource.push({
    index: 1,
    title: details.post_title,
    content: details.post_detail,
    author: details.post_createUserNick,
    createTime: details.post_createTime,
    keywords: details.post_keywords,
    avatarUrl: details.post_createUserAvatarUrl,
  });
  currentReList.map((item, index) => {
    allDataSource.push({
      index: index + 2,
      title: `Re: ${details.post_title}`,
      content: item.re_detail,
      author: item.re_createUserNick,
      avatarUrl: item.re_createUserAvatarUrl,
      createTime: item.re_createTime,
      keywords: null,
    });
  });
  return allDataSource;
};

module.exports = {
  config,
  days,
  compareDays,
  activityPostUitls,
  registerPostUitls,
  notificaionUtils,
  joinActivityUtils,
  getBBSReList,
};
