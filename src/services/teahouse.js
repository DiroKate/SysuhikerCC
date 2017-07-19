import request from '../utils/request';

export async function getTopicList(params) {
  return request('/api/?service=BBS.GetBBSList', {
    method: 'POST',
    body: JSON.stringify(params),
  });
}

export async function getTopicInfo(params) {
  return request('/api/?service=BBS.GetBBSInfo', {
    method: 'POST',
    body: JSON.stringify(params),
  });
}

export async function getTopicReList(params) {
  return request('/api/?service=BBS.GetBBSReList', {
    method: 'POST',
    body: JSON.stringify(params),
  });
}

export async function sendTopicRe(params) {
  return request('/api/?service=BBS.AddPostRe', {
    method: 'POST',
    body: JSON.stringify(params),
  });
}

export async function sendNewTopic(params) {
  return request('/api/?service=BBS.AddPost', {
    method: 'POST',
    body: JSON.stringify(params),
  });
}
