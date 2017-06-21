import { routerRedux } from 'dva/router';
import pathToRegexp from 'path-to-regexp';
import * as UsersService from '../services/users';
import * as ActivityService from '../services/activity';
import { activityPostUitls, registerPostUitls } from '../utils';


export default {
  namespace: 'app',
  state: {
    isLogin: false, // 是否已经登录
    userId: null, // 已登录用户的ID
    userEmail: null, // 已登录用户的邮箱
    userName: null,  // 已登陆用户的昵称
    loginUser: {}, // 已登陆用户的所有信息
  },

  reducers: {
    loginSuccess(state, action) {
      return {
        ...state,
        userId: action.payload.userId,
        isLogin: true,
      };
    },
    getUserInfo(state, action) {
      return {
        ...state,
        userId: action.payload.user_id,
        userEmail: action.payload.user_email,
        userName: action.payload.user_nick,
        loginUser: action.payload,
      };
    },
  },

  effects: {
    /**
     * 查询用户信息
     * @param  {dict} payload 带有user_id字段的
     */
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

    /**
     * 发布活动
     * */
    *postActivity({ payload: params }, { select, call, put }) {
      const login = yield select(state => state.app.login);
      console.log('into postActivity', login);
      if (login) {
        const userId = yield select(state => state.app.userId);
        const retValues = activityPostUitls(params, userId);
        console.log('after post change: ', retValues);
        const { data } = yield call(ActivityService.createActivities, params);
        console.log('data', data);
        const { code } = data.data;
        if (code === 0) {
          console.log('创建成功');
        }
      } else {
        console.log('转到登录界面');
        yield put(routerRedux.push('/login'));
      }
    },


    /**
     * 用户登录
     * @param  {dict} payload 用户的账户和密码
     */
    *login({ payload: params }, { call, put }) {
      const { data } = yield call(UsersService.login, params);
      const { code } = data.data;
      if (code === 0) {
        const userId = data.data.userid;
        yield put({
          type: 'loginSuccess',
          payload: {
            userId,
          },
        });

        // 获取登录用户行基本信息
        const userParams = {
          user_id: userId,
        };
        const userInfo = yield call(UsersService.userInfo, userParams);
        const userData = userInfo.data;
        const loginUserInfo = userData.data.info;
        yield put({
          type: 'getUserInfo',
          payload: {
            ...loginUserInfo,
          },
        });

        // 回到主页
        // yield put(routerRedux.push('/'));
        yield put(routerRedux.goBack());
      }
    },

    /**
     * 新用户注册
     * @param  {dict} payload 新用户参数
     */
    *register({ payload }, { call, put }) {
      const params = registerPostUitls(payload);
      const { data } = yield call(UsersService.register, params);
      const { code } = data.data;
      if (code === 0) {
        const userId = data.data.userid;
        yield put({
          type: 'loginSuccess',
          payload: {
            userId,
          },
        });

        // 获取登录用户行基本信息
        const userParams = {
          user_id: userId,
        };
        const userInfo = yield call(UsersService.userInfo, userParams);
        const userData = userInfo.data;
        const loginUserInfo = userData.data.info;
        yield put({
          type: 'getUserInfo',
          payload: {
            ...loginUserInfo,
          },
        });

        yield put(routerRedux.goBack());
      }
    },
  },

  subscriptions: {
    setup({ dispatch, history }) {
      dispatch({ type: 'queryUser' });
    },
  },
};
