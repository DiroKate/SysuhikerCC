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
