import { routerRedux } from 'dva/router';
import * as UserService from '../services/users.js';

export default {
  namespace: 'users',
  state: {
    login: false,
    userId: '',
  },

  reducers: {

  },

  effects: {
    *register({ payload }, { call, put }) {
      const params = {
        user_email: payload.email,
        user_psw: payload.password,
        user_urgentname: payload.emergency,
        user_urgentphone: payload.emergencyPhone,
        user_name: payload.realName,
        user_nick: payload.nickname,
        user_gender: payload.gender,
        user_phone: payload.phone,
        user_address: payload.dress,
        user_qq: payload.QQ,
        user_weibo: payload.weibo,
        user_interest: payload.role.join('+'),
        user_comments: payload.notes,

      };
      console.log(params);
      const { data } = yield call(UserService.register, params);
      const { code } = data.data;
      if (code === 0) {
        yield put({
          type: 'app/loginSuccess',
          payload: {
            userId: data.data.userid,
          },
        });
        yield put(routerRedux.push('/'));
      }
    },
  },

  subscriptions: {

  },
};
