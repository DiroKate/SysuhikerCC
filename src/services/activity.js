import request from '../utils/request';


export async function getActivities(params) {
  return request('/api/?service=Event.GetEventList', {
  // return request('/api/serviceUser.GetEventList', {
    method: 'POST',
    body: JSON.stringify(params),
  });
}
