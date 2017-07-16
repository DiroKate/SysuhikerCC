import request from '../utils/request';

export async function getTopicList(params) {
  return request('/api/?service=BBS.GetBBSList', {
    method: 'POST',
    body: JSON.stringify(params),
  });
}
