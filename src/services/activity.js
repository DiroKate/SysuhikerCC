import request from '../utils/request';

export async function getActivities(params) {
  return request('/api/?service=Event.GetEventList', {
  // return request('/api/serviceUser.GetEventList', {
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
