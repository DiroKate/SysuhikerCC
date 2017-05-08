import request from '../utils/request';

/**
 * 用户登录
 * @param  {dict} params json体
 */
export async function login(params) {
  return request('/api/?service=User.Login', {
    method: 'POST',
    body: JSON.stringify(params),
  });
}

/**
 * 用户登出
 */
export async function logout(params) {
  return request('/api/logout', {
    method: 'POST',
    body: JSON.stringify(params),
  });
}

/**
 * 获取用户信息
 */
export async function userInfo(params) {
  return request('/api/?service=User.GetBaseInfo', {
    method: 'POST',
    body: JSON.stringify(params),
  });
}
