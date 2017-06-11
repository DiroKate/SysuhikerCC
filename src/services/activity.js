import request from '../utils/request';


export async function getActivities(params) {
  // return request('/api/?service=User.GetEventList', {
  return request('/api/serviceUser.GetEventList', {
    method: 'POST',
    body: JSON.stringify(params),
  });
}
