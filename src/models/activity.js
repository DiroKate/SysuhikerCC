import * as ActivityService from '../services/activity';

export default {
  namespace: 'activity',
  state: {
    list: [],
  },

  reducers: {
    getActivities(state, action) {
      return {
        ...state,
        list: action.payload.list,
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
  },

  subscriptions: {
    setup({ dispatch }) {
      dispatch({
        type: 'getAllActivities',
        payload: {
          pagesize: 10,
          page: 1,
        },
      });
    },
  },
};
