import { routerRedux } from 'dva/router';
import * as UsersService from '../services/users';
import { registerPostUitls, notificaionUtils } from '../utils';

export default {
  namespace: 'app',
  state: {
    mode: false, // 是否为mobile模式，T手机模式，F电脑模式
    isLogin: false, // 是否已经登录
    userId: null, // 已登录用户的ID
    userEmail: null, // 已登录用户的邮箱
    userName: null, // 已登陆用户的昵称
    userAvatarUrl: null, // 已登陆用户头像
    loginUser: {}, // 已登陆用户的所有信息
  },

  reducers: {
    setMode(state, action) {
      return {
        ...state,
        mode: action.payload || false,
      };
    },
    loginSuccessReducer(state, action) {
      return {
        ...state,
        userId: action.payload.userId,
        isLogin: true,
      };
    },
    getUserInfoReducer(state, action) {
      const userInfo = {
        ...action.payload,
        user_psw: '*********************',
      };
      return {
        ...state,
        userId: action.payload.user_id,
        userEmail: action.payload.user_email,
        userName: action.payload.user_nick,
        userAvatarUrl: action.payload.user_avatar_url,
        loginUser: userInfo,
      };
    },
  },

  effects: {
    /**
     * 查询用户信息
     * @param  {dict} payload 带有user_id字段的
     */
    *queryUser({
      payload,
    }, { call, put, select }) {
      const userId = yield select(state => state.app.userId);
      let params;
      if (userId) {
        params = payload || {
          user_id: userId,
        };
      } else {
        return;
      }

      const { data } = yield call(UsersService.userInfo, params);
      const { code, info } = data.data;
      if (code === 0) {
        yield put({
          type: 'getUserInfoReducer',
          payload: {
            ...info,
          },
        });
      } else {
        throw Error(`获取用户信息失败: ${userId}`);
      }
    },

    /**
     * 用户登录
     * @param  {dict} payload 用户的账户和密码
     */
    *login({
      payload: params,
    }, { call, put }) {
      const { data } = yield call(UsersService.login, params);
      const { code } = data.data;
      if (code === 0) {
        const userId = data.data.userid;
        yield put({ type: 'loginSuccessReducer',
          payload: {
            userId,
          } });

        yield put({
          type: 'queryUser',
          payload: {
            user_id: userId,
          },
        });

        // 回到上页
        yield put(routerRedux.goBack());
        notificaionUtils('success', '登录成功！');
      }
    },

    /**
     * 新用户注册
     * @param  {dict} payload 新用户参数
     */
    *register({
      payload,
    }, { call, put }) {
      const params = registerPostUitls(payload);
      const { data } = yield call(UsersService.register, params);
      const { code } = data.data;
      if (code === 0) {
        const userId = data.data.userid;
        yield put({ type: 'loginSuccessReducer',
          payload: {
            userId,
          } });

        yield put({
          type: 'queryUser',
          payload: {
            user_id: userId,
          },
        });
        yield put(routerRedux.goBack());
        notificaionUtils('success', '注册成功！');
      }
    },

    /**
     * 用户资料更新
     */
    *updateUser({
      payload,
    }, { call, put, select }) {
      const user = yield select(state => state.app.loginUser);
      const { user_id, user_email } = user;
      const { user_interest } = payload;

      const { data } = yield call(UsersService.updateUserInfo, {
        ...payload,
        user_id,
        user_email,
        user_interest: user_interest.join('+'),
      });
      const { code } = data.data;
      if (code === 0) {
        yield put({ type: 'queryUser',
          payload: {
            user_id,
          } });
      }
    },
  },

  subscriptions: {
    setup({ dispatch }) {
      dispatch({ type: 'queryUser' });
    },
  },
};
