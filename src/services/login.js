import request from '../utils/request';

/**
 * 用户登录
 * @param  {dict} params json体
 */
export async function login(params) {
  // return request('/api/?service=User.Login', {
  return request('/api/serviceUser.Login', {
    method: 'POST',
    body: JSON.stringify(params),
  });
}
