import * as UsersService from '../services/users';

export default {
  namespace: 'app',
  state: {
    login: false,
    userId: '',
  },

  reducers: {
    loginSuccess(state, action) {
      return {
        ...state,
        userId: action.payload.userId,
        login: true,
      };
    },
    getUserInfo(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },

  effects: {
    *queryUser({ payload: params }, { call }) {
      if (typeof (params) === 'undefined') {
        return;
      }
      const { data } = yield call(UsersService.userInfo, params);
      const { code } = data.data;
      if (code === 0) {
        console.log('获取用户信息成功');
      } else {
        console.warn('获取用户信息失败');
      }
    },
  },

  subscriptions: {
    setup({ dispatch }) {
      dispatch({ type: 'queryUser' });
      // window.onresize = () => {
      //   dispatch({ type: 'changeNavbar' })
      // }
    },
  },
};
