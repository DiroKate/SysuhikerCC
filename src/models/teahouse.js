import pathToRegexp from 'path-to-regexp';
import * as TeahouseService from '../services/teahouse';
import { getBBSReList, notificaionUtils } from '../utils';

export default {
  namespace: 'teahouse',
  state: {
    list: [], // 显示列表
    listType: 'all', // 列表类型
    total: 0, // 总数
    pagesize: 10, // 分页处理
    page: 1,
    details: {}, // 内容
    detailId: null, // 当前主题的ID
    showRelist: [], // 当前的分页评论列表
    currentReList: [], // 当前的所有评论列表
  },

  reducers: {
    topicListReducer(state, action) {
      const { list, total, page, pagesize, listType } = action.payload;
      return {
        ...state,
        list,
        total,
        pagesize,
        page,
        listType,
      };
    },
    topicDetailReducer(state, action) {
      const { info, detailId } = action.payload;
      return {
        ...state,
        details: info,
        detailId,
      };
    },
    currentReListReducer(state, action) {
      const { list } = action.payload;
      const currentReList = getBBSReList(state.details, list);
      console.log({ currentReList });
      return {
        ...state,
        currentReList,
        showRelist: currentReList.slice(0, 10),
      };
    },

    showRelistReducer(state, action) {
      const { pageSize, page } = action.payload;
      const showRelist = state.currentReList.slice((page - 1) * pageSize, page * pageSize);
      return {
        ...state,
        showRelist,
      };
    },
  },

  effects: {
    /**
     * 获取所有的话题
     */
    *getTopicList({
      payload,
    }, { put, call, select }) {
      const listType = yield select(state => state.teahouse.listType);
      const { data } = yield call(TeahouseService.getTopicList, {
        ...payload,
        post_type: payload.post_type || listType,
      });
      const { code, list, totalCount: total, pagesize, page } = data.data;
      if (code === 0) {
        yield put({
          type: 'topicListReducer',
          payload: {
            list,
            total,
            pagesize,
            page,
            listType: payload.post_type || listType,
          },
        });
      } else {
        yield put({
          type: 'topicListReducer',
          payload: {
            list: [],
            total: 0,
            pagesize: 10,
            page: 1,
          },
        });
      }
    },

    /**
     * 获取一个话题详情
     */
    *getTopicInfo({
      payload,
    }, { put, call, select }) {
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
          payload: {
            info,
            detailId: info.post_id,
          },
        });
      }
    },

    /**
     * 获取话题评论列表
     */
    *getTopicReList({
      payload,
    }, { put, call }) {
      const { data } = yield call(TeahouseService.getTopicReList, {
        post_id: payload.topicId || payload.post_id,
        pagesize: 500,
        page: 1,
      });
      const { code, list } = data.data;
      const { lastFlag } = payload;
      if (code === 0) {
        yield put({
          type: 'currentReListReducer',
          payload: {
            list,
            lastFlag,
          },
        });
      } else {
        yield put({
          type: 'currentReListReducer',
          payload: {
            list: [],
          },
        });
      }
    },

    /**
     * 发表话题
     */
    *postTopicRe({
      payload: userComments,
    }, { put, call, select }) {
      const userId = yield select(state => state.app.userId);
      const postId = yield select(state => state.teahouse.detailId);
      const { data } = yield call(TeahouseService.sendTopicRe, {
        post_id: postId,
        user_id: userId,
        userComments,
      });
      const { code } = data.data;
      if (code === 0) {
        yield put({
          type: 'getTopicReList',
          payload: {
            post_id: postId,
            lastFlag: true,
          },
        });
        notificaionUtils('success', '评论成功！');
      }
    },
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname === '/bbs') {
          dispatch({
            type: 'getTopicList',
            payload: {
              pagesize: 10,
              page: 1,
              post_type: 'all',
            },
          });
        }

        const match = pathToRegexp('/bbs/:id').exec(pathname);
        if (match) {
          dispatch({
            type: 'getTopicInfo',
            payload: {
              topicId: match[1],
            },
          });
          dispatch({
            type: 'getTopicReList',
            payload: {
              topicId: match[1],
              page: 1,
            },
          });
        }
      });
    },
  },
};
