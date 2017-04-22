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

  reducers: {
    loginSuccess(state, action) {
      return {
        ...state,
        ...action.payload,
        login: true,
      };
    },
  },

  effects: {
    *login({ payload: params }, { call, put }) {
      const { data } = yield call(UsersService.login, params);
      const { code } = data.data;
      if (code === 0) {
        yield put({
          type: 'loginSuccess',
          payload: {
            userId: data.data.userid,
          },
        });
      }
    },
    *queryUser() {
      console.log('queryUserqueryUserqueryUserqueryUserqueryUser');
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
