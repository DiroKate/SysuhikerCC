import pathToRegexp from 'path-to-regexp';
import * as TeahouseService from '../services/teahouse';

export default {
  namespace: 'teahouse',
  state: {
    list: [], // 显示列表
    total: 0, // 总数
    pagesize: 10, // 分页处理
    page: 1,
    details: {}, // 内容
    detailId: null, // 当前主题的ID
  },

  reducers: {
    topicListReducer(state, action) {
      const { list, total, page, pagesize } = action.payload;
      return { ...state, list, total, pagesize, page };
    },
    topicDetailReducer(state, action) {
      const { info, detailId } = action.payload;
      return { ...state, details: info, detailId };
    },

  },

  effects: {
    /**
     * 获取所有的话题
     */
    *getTopicList({ payload }, { put, call }) {
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

    /**
     * 获取一个话题详情
     */
    *getTopicInfo({ payload }, { put, call, select }) {
      // 判断是否已经获取了信息了
      const topicId = yield select(state => state.teahouse.detailId);
      if (topicId === payload.topicId) {
        return;
      }
      const { data } = yield call(TeahouseService.getTopicInfo, { post_id: payload.topicId });
      const { code, info } = data.data;
      if (code === 0) {
        yield put({
          type: 'topicDetailReducer',
          payload: { info, detailId: info.post_id },
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

        const match = pathToRegexp('/bbs/details/:id').exec(pathname);
        if (match) {
          dispatch({ type: 'getTopicInfo', payload: { topicId: match[1] } });
        }
      });
    },
  },
};
