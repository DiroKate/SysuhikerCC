import request from '../utils/request';

export async function login(params) {
  return request('/users/login', {
    method: 'POST',
    body: JSON.stringify(params),
  });
}
export async function logout(params) {
  return request('/users/logout', {
    method: 'POST',
    body: JSON.stringify(params),
  });
}
export async function userInfo(id) {
  return request(`/users/${id}`);
}
