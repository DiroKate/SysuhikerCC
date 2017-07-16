import request from '../utils/request';

export async function getTopicList(params) {
  return request('/api/?service=BBS.GetBBSList', {
    method: 'POST',
    body: JSON.stringify(params),
  });
}

export async function getTopicInfo(params) {
  console.log('getTopicInfo', params);
  return request('/api/?service=BBS.GetBBSInfo', {
    method: 'POST',
    body: JSON.stringify(params),
  });
}
