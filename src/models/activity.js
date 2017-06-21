import pathToRegexp from 'path-to-regexp';
import * as ActivityService from '../services/activity';


export default {
  namespace: 'activity',
  state: {
    list: [],
    activityDetails: {}, // 活动详情
  },

  reducers: {
    getActivities(state, action) {
      return {
        ...state,
        list: action.payload.list,
      };
    },

    activityDetail(state, action) {
      return {
        ...state,
        activityDetails: action.payload,
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
    *getActivityDetails({ payload }, { call, put }) {
      const { data } = yield call(ActivityService.getActivityDetails, { event_id: payload.id });
      const { code } = data.data;
      if (code === 0) {
        yield put({
          type: 'activityDetail',
          payload: {
            ...data.data.info,
          },
        });
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
        const match = pathToRegexp('/activity/details/:id').exec(location.pathname);
        if (match) {
          dispatch({ type: 'getActivityDetails', payload: { id: match[1] } });
        }
      });
    },
  },
};
