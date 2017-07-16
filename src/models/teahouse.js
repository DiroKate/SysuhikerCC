import * as TeahouseService from '../services/teahouse';

export default {
  namespace: 'teahouse',
  state: {
    list: [], // 显示列表
    total: 0, // 总数
    pagesize: 10, // 分页处理
    page: 1,
  },

  reducers: {
    topicListReducer(state, action) {
      const { list, total, page, pagesize } = action.payload;
      return { ...state, list, total, pagesize, page };
    },

  },

  effects: {
    /**
     * 获取所有的话题
     */
    *getTopicList({ payload }, { put, call }) {
      console.log(':::::::::::::::::::');
      const { data } = yield call(TeahouseService.getTopicList, payload);
      const { code, list, totalCount: total, pagesize, page } = data.data;
      if (code === 0) {
        yield put({
          type: 'topicListReducer',
          payload: { list, total, pagesize, page },
        });
      } else {
        yield put({
          type: 'topicListReducer',
          payload: { list: [], total: 0, pagesize: 10, page: 1 },
        });
      }
    },

  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname === '/bbs') {
          dispatch({
            type: 'getTopicList',
            payload: { pagesize: 10, page: 1 },
          });
        }
      });
    },
  },
};
