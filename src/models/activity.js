import pathToRegexp from 'path-to-regexp';
import { browserHistory } from 'dva/router';
import * as ActivityService from '../services/activity';
import * as UsersService from '../services/users';
import { activityPostUitls, notificaionUtils, activityUpdateUitls, joinActivityUtils } from '../utils';

export default {
  namespace: 'activity',
  state: {
    list: [],
    total: 0, // 条目总数
    activityDetails: {}, // 活动详情
    activityName: '',
    activityId: '',
    activityLeader: {}, // 活动领队信息
    activityJoinList: [], // 活动队员信息
    activityReList: [], // 活动评论信息
  },

  reducers: {
    getActivitiesReducer(state, action) {
      const { list, totalCount } = action.payload;
      return {
        ...state,
        list,
        total: totalCount,
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
    *getAllActivities({
      payload: params,
    }, { call, put }) {
      const { data } = yield call(ActivityService.getActivities, params);
      const { code, list, totalCount } = data.data;
      if (code === 0) {
        yield put({
          type: 'getActivitiesReducer',
          payload: {
            list,
            totalCount,
          },
        });
      }
    },

    /**
     * 获取活动详细信息
     */
    *getActivityDetails({
      payload,
    }, { call, put, select }) {
      // // 判断是不是已经获取了活动信息了
      // const eventId = yield select(state => state.activity.activityDetails.event_id);
      // if (eventId === payload.id) {
      //   return;
      // }

      const { data } = yield call(ActivityService.getActivityDetails, { event_id: payload.id });
      const { code, info } = data.data;
      if (code === 0) {
        yield put({
          type: 'activityDetailReducer',
          payload: {
            ...info,
          },
        });
      }

      const userId = yield select(state => state.activity.activityLeader.id);
      const { data: userData } = yield call(UsersService.userInfo, { user_id: userId });
      const { code: userCode, info: userInfo } = userData.data;
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
    *joinActivity({
      payload,
    }, { call, put, select }) {
      const userId = yield select(state => state.app.userId);
      const { data } = yield call(ActivityService.joinActivity, joinActivityUtils({
        ...payload,
        userId,
      }));
      const { code } = data.data;
      if (code === 0) {
        yield put({
          type: 'getEventJoinList',
          payload: {
            id: payload.eventId,
          },
        });
        browserHistory.push(`/activity/details/${payload.eventId}`);
        notificaionUtils('success', '报名成功');
      } else {
        notificaionUtils('error', '报名失败');
      }
    },

    /**
     * 发布活动
     * */
    *postActivity({
      payload: params,
    }, { select, call, put }) {
      const userId = yield select(state => state.app.userId);
      const retValues = activityPostUitls(params, userId);
      const { data } = yield call(ActivityService.addActivity, retValues);
      const { code } = data.data;
      if (code === 0) {
        browserHistory.push('/activity');
        yield put({
          type: 'getAllActivities',
          payload: {
            pagesize: 10,
            page: 1,
          },
        });
        notificaionUtils('success', '已经发布活动啦');
      }
    },
    /**
     * 编辑活动
     */
    *editActivity({
      payload,
    }, { call, select }) {
      const userId = yield select(state => state.app.userId);
      const activityDetails = yield select(state => state.activity.activityDetails);
      const { event_createUserId, event_id } = activityDetails;
      const retValues = activityUpdateUitls({
        ...payload,
        event_createUserId,
        event_id,
      }, userId);
      const { data } = yield call(ActivityService.editActivity, retValues);
      const { code, msg } = data.data;
      if (code === 0) {
        browserHistory.push(`/activity/${event_id}`);
        notificaionUtils('success', '更新成功');
      } else {
        notificaionUtils('error', msg);
      }
    },

    /**
     * 获取活动报名列表
     */
    *getEventJoinList({
      payload,
    }, { call, put }) {
      const { data } = yield call(ActivityService.getEventJoinList, { event_id: payload.id });
      const { code, list } = data.data;
      if (code === 0) {
        yield put({ type: 'updateJoinListReducer',
          payload: {
            list,
          } });
      } else {
        yield put({
          type: 'updateJoinListReducer',
          payload: {
            list: [],
          },
        });
      }
    },

    /**
     * 获取活动评论列表
     */
    *getEventReList({
      payload,
    }, { call, put }) {
      const { data } = yield call(ActivityService.getEventReList, { event_id: payload.id });
      const { code, list } = data.data;
      if (code === 0) {
        yield put({ type: 'updateReListReducer',
          payload: {
            list,
          } });
      } else {
        yield put({
          type: 'updateReListReducer',
          payload: {
            list: [],
          },
        });
      }
    },

    /**
     * 增加活动评论
     */
    *addReForum({
      payload,
    }, { call, select, put }) {
      const userId = yield select(state => state.app.userId);
      const activityId = yield select(state => state.activity.activityId);
      const { data } = yield call(ActivityService.addReForum, {
        eventId: activityId,
        userId,
        userComments: payload,
      });
      if (data.data.code === 0) {
        yield put({
          type: 'getEventReList',
          payload: {
            id: activityId,
          },
        });
        notificaionUtils('success', '评论成功！');
      } else {
        notificaionUtils('error', data.data.msg);
      }
    },

    /**
     * 修改活动评论，暂不提供
     */
    // *editReForum({
    //   payload,
    // }, { call, select, put }) {
    //   const userId = yield select(state => state.app.userId);
    //   const activityId = yield select(state => state.activity.activityId);
    //   const { reId } = reId;
    //   const { data } = yield call(ActivityService.editReForum, {
    //     re_id: reId,
    //     user_id: userId,
    //     userComments: payload,
    //   });
    //   if (data.data.code === 0) {
    //     yield put({
    //       type: 'getEventReList',
    //       payload: {
    //         id: activityId,
    //       },
    //     });
    //     notificaionUtils('success', '评论成功！');
    //   } else {
    //     notificaionUtils('error', data.data.msg);
    //   }
    // },


    *uploadImage({
      payload,
    }, { call }) {
      const xxxx = yield call(ActivityService.uploadImage, payload);
    },

    /**
     * 退出活动
     */
    *quitActivity(_, { call, put, select }) {
      const userId = yield select(state => state.app.userId);
      const eventid = yield select(state => state.activity.activityId);
      const { data } = yield call(ActivityService.quitActivity, {
        event_joinlist_userid: userId,
        event_joinlist_eventid: eventid,
        event_joinlist_comments: '(如需重新报名请联系活动发起人修改报名状态)',
      });
      const { code, msg } = data.data;
      if (code === 0) {
        yield put({
          type: 'getEventJoinList',
          payload: {
            id: eventid,
          },
        });
        notificaionUtils('success', '退出活动成功');
      } else {
        notificaionUtils('error', msg);
      }
    },

    /**
     * 审核状态
     */
    *changeJoinState({ payload }, { select, put, call }) {
      console.log('changeJoinState', payload);
      const { targetUserId, status } = payload;
      const eventId = yield select(state => state.activity.activityId);
      const { data } = yield call(ActivityService.changeJoinState, {
        event_joinlist_eventid: eventId,
        event_joinlist_userid: targetUserId,
        event_joinlist_status: status,
      });
      console.log(data);
      // TODO: 修改状态后的回调
    },
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname === '/activity') {
          dispatch({
            type: 'getAllActivities',
            payload: {
              pagesize: 10,
              page: 1,
            },
          });
        }

        const match = pathToRegexp('/activity/:id').exec(pathname);
        if (match && match[1] !== 'create') {
          dispatch({
            type: 'getActivityDetails',
            payload: {
              id: match[1],
            },
          });
          dispatch({
            type: 'getEventJoinList',
            payload: {
              id: match[1],
            },
          });
          dispatch({
            type: 'getEventReList',
            payload: {
              id: match[1],
            },
          });
        }
        const getActivityDetailsDispatch = (id) => {
          dispatch({
            type: 'getActivityDetails',
            payload: {
              id,
            },
          });
        };
        const applyMatch = pathToRegexp('/activity/apply/:id').exec(pathname);
        if (applyMatch) {
          getActivityDetailsDispatch(applyMatch[1]);
        }

        const editMatch = pathToRegexp('/activity/edit/:id').exec(pathname);
        if (editMatch) {
          getActivityDetailsDispatch(editMatch[1]);
        }

        const applyEditMatch = pathToRegexp('/activity/apply/edit/:id').exec(pathname);
        if (applyEditMatch) {
          getActivityDetailsDispatch(applyEditMatch[1]);
        }
      });
    },
  },
};
