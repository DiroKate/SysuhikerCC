import * as UsersService from '../services/users';

export default {
  namespace: 'app',
  state: {
    login: false,
    userId: '',
    loginUser: {},

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
      console.log(action);
      state.loginUser = action.payload;
      console.log(state);
      return {
        ...state,
      };
    },
  },

  effects: {
    *queryUser({ payload }, { call, put, select }) {
      const userId = yield select(state => state.app.userId);
      let params;
      if (userId === '') {
        return;
      } else {
        params = payload || { userId };
      }

      const { data } = yield call(UsersService.userInfo, params);
      const { code, info } = data.data;
      if (code === 0) {
        console.log('获取用户信息成功');
        yield put({
          type: 'getUserInfo',
          payload: {
            ...info,
          },
        });
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
