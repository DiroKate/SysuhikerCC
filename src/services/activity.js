import request from '../utils/request';

export async function getActivities(params) {
  return request('/api/?service=Event.GetEventList', {
    method: 'POST',
    body: JSON.stringify(params),
  });
}

export async function getActivityDetails(params) {
  return request('/api/?service=Event.GetEventInfo', {
    method: 'POST',
    body: JSON.stringify(params),
  });
}

export async function joinActivity(params) {
  return request('/api/?service=Event.JoinEvent', {
    method: 'POST',
    body: JSON.stringify(params),
  });
}

/**
 * 获取活动的报名列表
 * @param  { dict } params {event_id: number}
 */
export async function getEventJoinList(params) {
  return request('/api/?service=Event.GetEventJoinList', {
    method: 'POST',
    body: JSON.stringify(params),
  });
}

/**
 * 获取活动的评论列表
 * @param  { dict } params {event_id: number}
 */
export async function getEventReList(params) {
  return request('/api/?service=Event.GetEventReList', {
    method: 'POST',
    body: JSON.stringify(params),
  });
}

/**
 * 增加活动评论
 * @param  { dict } params {eventId: int, userId: int, userComments: string}
 */
export async function addReForum(params) {
  return request('/api/?service=Event.AddEventRe', {
    method: 'POST',
    body: JSON.stringify(params),
  });
}
/**
 * 修改活动评论
 */
export async function editReForum(params) {
  return request('/api/?service=Event.EditEventRe', {
    method: 'POST',
    body: JSON.stringify(params),
  });
}


/**
 * 创建活动
 */
export async function addActivity(params) {
  return request('/api/?service=Event.AddEvent', {
    method: 'POST',
    body: JSON.stringify(params),
  });
}

/**
 * 退出活动
 */
export async function quitActivity(params) {
  return request('/api/?service=Event.Quit', {
    method: 'POST',
    body: JSON.stringify(params),
  });
}

/**
 * 修改活动信息
 */
export async function editActivity(params) {
  return request('/api/?service=Event.EditEvent', {
    method: 'POST',
    body: JSON.stringify(params),
  });
}

/**
 * 修改审核状态
 */
export async function changeJoinState(params) {
  return request('/api/?service=Event.UpdateJoinStatus', {
    method: 'POST',
    body: JSON.stringify(params),
  });
}

export async function uploadImage(params) {
  console.log(params);
  return request('/api/?service=Upload.Upload', {
    method: 'POST',
    body: JSON.stringify(params),
  });
}
