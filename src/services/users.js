import request from '../utils/request';

/**
 * 用户登录
 * @param  {dict} params json体
 */
export async function login(params) {
  return request('/api/?service=User.Login', {
  // return request('/api/serviceUser.Login', {
    method: 'POST',
    body: JSON.stringify(params),
  });
}

/**
 * 用户注册
 * @param  {dict} params 新用户信息
 */
export async function register(params) {
  return request('/api/?service=User.Register', {
  // return request('/api/serviceUser.Register', {
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
  // return request('/api/serviceUser.GetBaseInfo', {
    method: 'POST',
    body: JSON.stringify(params),
  });
}

/**
 * 更新用户信息
 */
export async function updateUserInfo(params) {
  console.log("send(data)", params);
  return request('/api/?service=User.Update', {
    method: 'POST',
    body: JSON.stringify(params),
  });
}