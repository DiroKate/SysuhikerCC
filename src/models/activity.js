import pathToRegexp from 'path-to-regexp';
import { routerRedux } from 'dva/router';
import * as ActivityService from '../services/activity';
import * as UsersService from '../services/users';
import { activityPostUitls, notificaionUtils, joinActivityUtils } from '../utils';

export default {
  namespace: 'activity',
  state: {
    list: [],
    activityDetails: {}, // 活动详情
    activityName: '',
    activityId: '',
    activityLeader: {}, // 活动领队信息
    activityJoinList: [], // 活动队员信息
    activityReList: [], // 活动评论信息
  },

  reducers: {
    getActivitiesReducer(state, action) {
      return {
        ...state,
        list: action.payload.list,
      };
    },

    activityDetailReducer(state, action) {
      const leaderInfo = {
        id: action.payload.event_createUserId,
      };
      return {
        ...state,
        activityLeader: leaderInfo,
        activityDetails: action.payload,
        activityId: action.payload.event_id,
      };
    },

    getLeaderInfoReducer(state, action) {
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

    updateJoinListReducer(state, action) {
      return {
        ...state,
        activityJoinList: action.payload.list,
      };
    },

    updateReListReducer(state, action) {
      return {
        ...state,
        activityReList: action.payload.list,
      };
    },


  },

  effects: {
    *getAllActivities({ payload: params }, { call, put }) {
      const { data } = yield call(ActivityService.getActivities, params);
      const { code, list } = data.data;
      if (code === 0) {
        yield put({
          type: 'getActivitiesReducer',
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
          type: 'activityDetailReducer',
          payload: {
            ...data.data.info,
          },
        });
      }

      const userId = yield select(state => state.activity.activityLeader.id);
      const userData = yield call(UsersService.userInfo, { user_id: userId });
      const userCode = userData.data.data.code;
      const userInfo = userData.data.data.info;
      if (userCode === 0) {
        yield put({
          type: 'getLeaderInfoReducer',
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
    *joinActivity({ payload }, { call, put, select }) {
      const userId = yield select(state => state.app.userId);
      console.log('join the activity', { ...payload, userId });
      console.log(joinActivityUtils({ ...payload, userId }));
      const { data } = yield call(
        ActivityService.joinActivity,
        joinActivityUtils({ ...payload, userId }),
       );
      const { code } = data.data;
      if (code === 0) {
        yield put(routerRedux.push(`/activity/details/${payload.eventId}`));
        yield put({ type: 'getEventJoinList', payload: { id: payload.eventId } });
        notificaionUtils('success', '报名成功');
      } else {
        notificaionUtils('error', '报名失败');
      }
    },

    /**
     * 发布活动
     * */
    *postActivity({ payload: params }, { select, call, put }) {
      const userId = yield select(state => state.app.userId);
      const retValues = activityPostUitls(params, userId);
      const { data } = yield call(ActivityService.addActivity, retValues);
      const { code } = data.data;
      if (code === 0) {
        yield put(routerRedux.push('/activity'));
        yield put({
          type: 'getAllActivities',
          payload: { pagesize: 100, page: 1 },
        });
        notificaionUtils('success', '已经发布活动啦');
      }
    },

    /**
     * 获取活动报名列表
     */
    *getEventJoinList({ payload }, { call, put }) {
      const { data } = yield call(ActivityService.getEventJoinList, { event_id: payload.id });
      const { code, list } = data.data;
      if (code === 0) {
        yield put({
          type: 'updateJoinListReducer',
          payload: { list },
        });
      } else {
        yield put({
          type: 'updateJoinListReducer',
          payload: { list: [] },
        });
      }
    },

    /**
     * 获取活动评论列表
     */
    *getEventReList({ payload }, { call, put }) {
      const { data } = yield call(ActivityService.getEventReList, { event_id: payload.id });
      const { code, list } = data.data;
      if (code === 0) {
        yield put({
          type: 'updateReListReducer',
          payload: { list },
        });
      } else {
        yield put({
          type: 'updateReListReducer',
          payload: { list: [] },
        });
      }
    },

    /**
     * 增加活动评论
     */
    *addReForum({ payload }, { call, select, put }) {
      const userId = yield select(state => state.app.userId);
      const activityId = yield select(state => state.activity.activityId);
      const { data } = yield call(
        ActivityService.addReForum,
        { eventId: activityId, userId, userComments: payload },
      );
      if (data.data.code === 0) {
        notificaionUtils('success', '评论成功');
        yield put({ type: 'getEventReList', payload: { id: activityId } });
      }
    },

    *uploadImage({ payload }, { call }) {
      console.log('xxxxxxxxxxxx');
      const xxxx = yield call(ActivityService.uploadImage, payload);
      console.log(xxxx);
    },

    *quitActivity(_, { call, put, select }) {
      const event_joinlist_userid = yield select(state => state.app.userId);
      const event_joinlist_eventid = yield select(state => state.activity.activityId);
      const { data } = yield call(ActivityService.quitActivity, {
        event_joinlist_userid,
        event_joinlist_eventid,
        event_joinlist_comments: '(如需重新报名请联系活动发起人修改报名状态)' });
      if (data.data.code === 0) {
        notificaionUtils('success', '退出活动成功');
        yield put({ type: 'getEventJoinList', payload: { id: event_joinlist_eventid } });
      }
      console.log(data);
    },

  },

  subscriptions: {
    setup({ dispatch, history }) {
      dispatch({
        type: 'getAllActivities',
        payload: {
          pagesize: 100,
          page: 1,
        },
      });

      history.listen(() => {
        const pathname = location.pathname;
        const match = pathToRegexp('/activity/details/:id').exec(pathname);
        if (match) {
          dispatch({ type: 'getActivityDetails', payload: { id: match[1] } });
          dispatch({ type: 'getEventJoinList', payload: { id: match[1] } });
          dispatch({ type: 'getEventReList', payload: { id: match[1] } });
        }
        const match2 = pathToRegexp('/activity/apply/:id').exec(pathname);
        if (match2) {
          dispatch({ type: 'getActivityDetails', payload: { id: match2[1] } });
        }
      });
    },
  },
};
