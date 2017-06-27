import pathToRegexp from 'path-to-regexp';
import * as ActivityService from '../services/activity';
import * as UsersService from '../services/users';
import { activityPostUitls } from '../utils';


export default {
  namespace: 'activity',
  state: {
    list: [],
    activityDetails: {}, // 活动详情
    activityName: '',
    activityId: '',
    activityLeader: {}, // 活动领队信息
  },

  reducers: {
    getActivities(state, action) {
      return {
        ...state,
        list: action.payload.list,
      };
    },

    activityDetail(state, action) {
      const leaderInfo = {
        id: action.payload.event_createUserId,
      };
      return {
        ...state,
        activityLeader: leaderInfo,
        activityDetails: action.payload,
      };
    },

    getLeaderInfo(state, action) {
      const { user_id, user_nick, user_email, user_avatar_url } = action.payload;
      const leaderInfo = {
        id: user_id,
        nick: user_nick,
        email: user_email,
        avatar: user_avatar_url,
      };
      return {
        ...state,
        activityLeader: leaderInfo,
      };
    },
  },

  effects: {
    *getAllActivities({ payload: params }, { call, put }) {
      const { data } = yield call(ActivityService.getActivities, params);
      const { code, list } = data.data;
      if (code === 0) {
        yield put({
          type: 'getActivities',
          payload: {
            list,
          },
        });
      }
    },

    /**
     * 获取活动详细信息
     */
    *getActivityDetails({ payload }, { call, put, select }) {
      // 判断是不是已经获取了活动信息了
      const eventId = yield select(state => state.activity.activityDetails.event_id);
      if (eventId === payload.id) {
        return;
      }


      const { data } = yield call(ActivityService.getActivityDetails, { event_id: payload.id });
      const { code } = data.data;
      if (code === 0) {
        yield put({
          type: 'activityDetail',
          payload: {
            ...data.data.info,
          },
        });
      } else {
        throw Error('获取活动信息失败');
      }

      const userId = yield select(state => state.activity.activityLeader.id);
      const userData = yield call(UsersService.userInfo, { user_id: userId });
      const userCode = userData.data.data.code;
      const userInfo = userData.data.data.info;
      if (userCode === 0) {
        yield put({
          type: 'getLeaderInfo',
          payload: {
            ...userInfo,
          },
        });
      } else {
        throw Error('获取用户信息失败');
      }
    },

    /**
     * 报名活动
     */
    joinActivity({ payload }, { call, put, select }) {
      console.log('join the activity');
    },

    /**
     * 发布活动
     * */
    *postActivity({ payload: params }, { select, call }) {
      const userId = yield select(state => state.app.userId);
      const retValues = activityPostUitls(params, userId);
      console.log('after post change: ', retValues);
      const { data } = yield call(ActivityService.createActivities, params);
      console.log('data', data);
      const { code } = data.data;
      if (code === 0) {
        console.log('创建成功');
      }
    },

  },

  subscriptions: {
    setup({ dispatch, history }) {
      dispatch({
        type: 'getAllActivities',
        payload: {
          pagesize: 10,
          page: 1,
        },
      });

      history.listen(() => {
        const pathname = location.pathname;
        const match = pathToRegexp('/activity/details/:id').exec(pathname);
        if (match) {
          dispatch({ type: 'getActivityDetails', payload: { id: match[1] } });
        }
        const match2 = pathToRegexp('/activity/apply/:id').exec(pathname);
        if (match2) {
          dispatch({ type: 'getActivityDetails', payload: { id: match2[1] } });
        }
      });
    },
  },
};
