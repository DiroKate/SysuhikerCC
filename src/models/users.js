import * as UsersService from '../services/users';

export default {
  namespace: 'users',
  state: {
    login: false,
    user: {
      name: '',
      email: '',
    },
  },
  reducers: {},
  effects: {
    *login({ payload: data }, { call }) {
      yield call(UsersService.login, data);
    },
  },
  subscriptions: {},
};
