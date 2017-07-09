/* 报名页面 */
import React from 'react';
import { Breadcrumb, Alert, Form, Icon, Checkbox, Button, Radio, Input, Tooltip, Modal } from 'antd';
import { browserHistory } from 'dva/router';

import { LocalIcon } from '..';
import { config } from '../../utils';
import styles from './ApplyPage.less';

const BreadcrumbItem = Breadcrumb.Item;
const FormItem = Form.Item;

function applyForm(props) {
  const { form, userdata, joinBtnHandle } = props;
  const { getFieldDecorator, validateFieldsAndScroll } = form;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userdata.user_id) {
      validateFieldsAndScroll((err, values) => {
        if (!err) {
          const retValues = values;
          joinBtnHandle(retValues);
        }
      });
    } else {
      Modal.confirm({
        title: '尚未登录',
        content: '还没登录哦，请先登录再报名～',
        iconType: 'meh-o',
        onOk() {
          browserHistory.push('/login');
        },
      });
    }
  };


  const userRoles = userdata.user_interest ? userdata.user_interest.split('+') : [];

  const roleOptions = ['领队', '协作', '头驴', '尾驴', '财务', '后勤', '环保', '作业', '摄影', '医护', '厨师'];
  const campOptions = ['暂无', '单人帐篷', '双人帐篷', '三人帐篷', '其他请在备注说明'];
  const fangchaodianOptions = ['暂无', '单人防潮垫', '双人防潮垫', '三人防潮垫', '其他请在备注说明'];
  const duijiangjiOptions = ['暂无', 'V频段136-174MHz', 'U频段400-470MHz', 'U频段400-430MHz', 'U频段450-470MHz', '其他情况请在备注说明'];
  const lutouOptions = ['暂无', '扁气罐接口炉头', '长气罐接口炉头', '酒精炉头', '其他请在备注说明'];
  const taoguoOptions = ['暂无', '3人及以下小锅', '4-6人中锅', '7人以上大锅', '其他请在备注说明'];

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 10 },
    },
  };
  const formItemLayoutWide = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 14 },
    },
  };
  /**
   * 活动免责声明
   */
  const activityStatement = (
    <div>
      <h3>
        请认真阅读活动声明：
      </h3>
      <div className={styles.activityStatement}>
        <ol>
          {config.statement.map(value => (
            <li type="1">{value}</li>
          ))}
        </ol>
      </div>
    </div>
  );
  const formData1 = [
    {
      label: '昵称',
      id: 'nickName',
      required: true,
      message: '请输入你的昵称!',
      whitespace: true,
      initialValue: userdata.user_nick,
    }, {
      label: '真实姓名',
      id: 'realName',
      required: true,
      message: '请输入你的真实姓名!',
      whitespace: true,
      initialValue: userdata.user_name,
    },
  ];
  const formData2 = [
    {
      label: '帐篷',
      id: 'camp',
      datasource: campOptions,
    }, {
      label: '防潮垫',
      id: 'fangchaodian',
      datasource: fangchaodianOptions,
    }, {
      label: '对讲机',
      id: 'duijiangji',
      datasource: duijiangjiOptions,
    }, {
      label: '炉头',
      id: 'lutou',
      datasource: lutouOptions,
    }, {
      label: '套锅',
      id: 'taoguo',
      datasource: taoguoOptions,
    },
  ];

  return (
    <Form onSubmit={handleSubmit}>
      {/* ------------ 基本信息 --------------- */}
      <FormItem>
        <h3>基本信息</h3>
      </FormItem>

      {
        formData1.map(item => (
          <FormItem
            {...formItemLayout}
            label={item.label}
            id={item.id}
            hasFeedback
          >
            {getFieldDecorator(item.id, {
              rules: [
                { required: item.required, message: item.message, whitespace: item.whitespace },
              ],
              initialValue: item.initialValue,
            })(
              <Input />,
            )}
          </FormItem>
        ))
      }

      <FormItem
        {...formItemLayout}
        label="性别"
        id="gender"
      >
        {getFieldDecorator('gender', {
          rules: [{
            required: true, message: '请输入邮箱',
          }],
          initialValue: userdata.user_gender === 'gg' ? 'male' : 'fefemale',
        })(
          <Radio.Group>
            <Radio value="male">
              <LocalIcon type="male" colorful />GG
          </Radio>
            <Radio value="female">
              <LocalIcon type="female" colorful />MM
          </Radio>
          </Radio.Group>,
      )}
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="Email"
        id="email"
        hasFeedback
      >
        {getFieldDecorator('email', {
          rules: [{
            type: 'email', message: '非法邮箱地址',
          }, {
            required: true, message: '请输入邮箱',
          }],
          initialValue: userdata.user_email,
        })(
          <Input />,
      )}
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="电话"
        id="phoneNum"
        hasFeedback
      >
        {getFieldDecorator('phoneNum', {
          rules: [
            { type: 'string', pattern: /^[0-9]+$/, message: '请输入正确的电话号码' },
            { required: true, message: 'Please input your phone number!' }],
          initialValue: userdata.user_phone,
        })(
          <Input />,
        )}
      </FormItem>

      <FormItem
        {...formItemLayout}
        label="住址"
        id="address"
        hasFeedback
      >
        {getFieldDecorator('address')(<Input value={userdata.user_address} />)}
      </FormItem>
      <FormItem
        {...formItemLayoutWide}
        label="团队角色"
        id="role"
      >
        {getFieldDecorator('role', {
          initialValue: userRoles,
        })(
          <Checkbox.Group
            options={roleOptions}
          />,
        )}

      </FormItem>
      <FormItem
        {...formItemLayout}
        label="QQ"
        id="qq"
        hasFeedback
      >
        {getFieldDecorator('qq')(
          <Input value={userdata.user_qq} />,
        )}

      </FormItem>
      <FormItem
        {...formItemLayout}
        label="微博"
        id="weibo"
        hasFeedback
      >
        {getFieldDecorator('weibo')(
          <Input value={userdata.user_weiboLink} />,
        )}
      </FormItem>

      {/* ========== 基本信息 ========== */}

      {/* ---------- 保险信息 ---------- */}
      <FormItem>
        <h3>保险信息</h3>
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="紧急联系人"
        id="emergencyMan"
        hasFeedback
      >
        {getFieldDecorator('emergencyMan', {
          rules: [{ required: true, message: '请输入紧急联系人', whitespace: true }],
          initialValue: userdata.user_urgentName,
        })(
          <Input />,
        )}
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="紧急联系人电话"
        id="emergencyNum"
        hasFeedback
      >
        {getFieldDecorator('emergencyNum', {
          rules: [
            { type: 'string', pattern: /^[0-9]+$/, message: '请输入正确的电话号码' },
            { required: true, message: '请输入紧急联系人电话号码' }],
          initialValue: userdata.user_urgentPhone,
        })(
          <Input />,
        )}
      </FormItem>
      <FormItem
        {...formItemLayout}
        label={(
          <span>
              保险信息&nbsp;
              <Tooltip title="可活动出发前补上。没有意外保险信息，长线活动不予参与">
                <Icon type="question-circle-o" />
              </Tooltip>
          </span>
          )}
        id="insurance"
        hasFeedback
      >
        {getFieldDecorator('insurance')(
          <Input type="textarea" />,
      )}
      </FormItem>
      {/* ========== 保险信息 ========== */}

      {/* ---------- 装备信息 ---------- */}
      <FormItem>
        <h3>装备信息</h3>
      </FormItem>
      <FormItem
        labelCol={{
          xs: { span: 24 },
          sm: { span: 6 },
        }}
        wrapperCol={{
          xs: { span: 12 },
          sm: { span: 4 },
        }}
        label="登山包容量"
        id="backpack"
        hasFeedback
      >
        {getFieldDecorator('backpack')(
          <Input addonAfter="L" />,
        )}
      </FormItem>
      <FormItem
        labelCol={{
          xs: { span: 24 },
          sm: { span: 6 },
        }}
        wrapperCol={{
          xs: { span: 12 },
          sm: { span: 4 },
        }}
        label="睡袋温标"
        id="sleepBag"
        hasFeedback
      >
        {getFieldDecorator('sleepBag')(
          <Input addonAfter="℃" />,
        )}
      </FormItem>

      {
        formData2.map(item => (
          <FormItem
            {...formItemLayoutWide}
            label={item.label}
            id={item.id}
          >
            {getFieldDecorator(item.id)(
              <Checkbox.Group
                options={item.datasource}
              />,
          )}
          </FormItem>
        ))
      }

      {/* ========== 装备信息 ========== */}

      {/* ---------- 备注信息 ---------- */}
      <FormItem>
        <h3>备注信息</h3>
      </FormItem>
      <FormItem
        {...formItemLayout}
        label={(
          <span>
              备注信息&nbsp;
              <Tooltip title="特殊说明的情况，或者想对大家说的话">
                <Icon type="question-circle-o" />
              </Tooltip>
          </span>
          )}
        id="notes"
        hasFeedback
      >
        {getFieldDecorator('notes')(
          <Input type="textarea" />,
      )}
      </FormItem>
      {/* ========== 备注信息 ========== */}

      <FormItem>
        {activityStatement}
      </FormItem>
      <FormItem>
        {getFieldDecorator('agreement', {
          valuePropName: 'checked',
          rules: [{
            required: true,
            transform: value => (value ? 'true' : null),
            message: '请先同意声明条款',
          }],
        })(
          <Checkbox>本人已经仔细阅读以上声明内容，认为完全符合本人意愿并同意签署.</Checkbox>,
      )}
      </FormItem>
      <FormItem>
        <Button
          className={styles.submitBtn}
          type="primary"
          htmlType="submit"
          size="large"
        >
            确定报名
          </Button>
      </FormItem>
    </Form>
  );
}

const ApplyForm = Form.create()(applyForm);


function ApplyPage(props) {
  const { data, dispatch } = props;
  const { loginUser } = data;

  const activity = {
    name: data.event_name,
    id: data.event_id,
  };
  const activityLeader = {
    name: data.nick,
    id: data.id,
  };

  const joinBtnHandle = (payload) => {
    dispatch({
      type: 'activity/joinActivity',
      payload: {
        ...payload,
        eventId: data.event_id,
      },
    });
  };

  /* 面包屑模块 */
  const breadcrumbDiv = (
    <Breadcrumb style={{ margin: '12px 0', fontSize: '1.2em' }}>
      <BreadcrumbItem>
        <a href="/activity">活动列表</a>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <a href={`/activity/details/${activity.id}`}>{activity.name}</a>
      </BreadcrumbItem>
      <BreadcrumbItem>
        报名活动
      </BreadcrumbItem>
    </Breadcrumb>
  );

  /**
   * 报名标题
   */
  const activityTitle = (
    <div className={styles.activityTitle}>
      <p>你正在报名的是 <a href={activityLeader.id}>{activityLeader.name}</a> 发起的活动：</p>
      <h1>{activity.name}</h1>
    </div>
  );


  return (
    <div className={styles.wrapper}>
      {breadcrumbDiv}
      {activityTitle}
      <div className={styles.infoWrapper}>
        <Alert
          className={styles.warnMessage}
          message="请认真填写个人信息及装备情况，除了备注，任何一项都不可留空。"
          type="warning"
        />
        <ApplyForm
          userdata={loginUser}
          joinBtnHandle={joinBtnHandle}
        />

      </div>
    </div>

  );
}

export default ApplyPage;
