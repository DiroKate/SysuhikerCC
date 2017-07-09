import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Tooltip, Icon, Radio, Select, Row, Col, Checkbox, Button, AutoComplete } from 'antd';
import { LocalIcon } from '..';

const FormItem = Form.Item;
const Option = Select.Option;

function RegisterForm(props) {
  const { form, dispatch } = props;
  const { getFieldDecorator, validateFieldsAndScroll, getFieldValue, validateFields } = form;

  const roleOptions = [
    '领队', '协作', '头驴', '尾驴', '财务', '后勤', '环保', '作业', '摄影', '医护', '厨师', '无线', '通讯', '骑行', '游泳', '跑步', '定向', '攀岩', '奢靡腐败',
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        dispatch({ type: 'app/register', payload: values });
      }
    });
  };

  const handleConfirmBlur = (e) => {
    const value = e.target.value;
    console.log(value);
    // this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  const checkPassword = (rule, value, callback) => {
    if (value && value !== getFieldValue('password')) {
      callback('两次输入的密码不一致');
    } else {
      callback();
    }
  };

  const checkConfirm = (rule, value, callback) => {
    if (value) {
      validateFields(['confirm'], { force: true });
    }
    callback();
  };

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 14 },
    },
  };
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 14,
        offset: 6,
      },
    },
  };
  const prefixSelector = getFieldDecorator('prefix', {
    initialValue: '86',
  })(
    <Select className="icp-selector">
      <Option value="86">+86</Option>
    </Select>,
    );

  return (
    <Form onSubmit={handleSubmit}>
      <FormItem
        {...formItemLayout}
        label="E-mail"
        hasFeedback
      >
        {getFieldDecorator('email', {
          rules: [{
            type: 'email', message: '这不是一个邮箱地址',
          }, {
            required: true, message: '请填写常用email，email将用来接收报名确认信息等各种活动通知',
          }],
        })(
          <Input />,
          )}
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="Password"
        hasFeedback
      >
        {getFieldDecorator('password', {
          rules: [{ required: true, message: '密码至少6位', min: 6 }, {
            required: true, message: '请设置用户密码',
          }, {
            validator: checkConfirm,
          }],
        })(
          <Input type="password" />,
          )}
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="Confirm Password"
        hasFeedback
      >
        {getFieldDecorator('confirm', {
          rules: [{
            required: true, message: '请设置用户密码',
          }, {
            validator: checkPassword,
          }],
        })(
          <Input type="password" onBlur={handleConfirmBlur} />,
          )}
      </FormItem>
      <FormItem
        {...formItemLayout}
        label={(
          <span>
              真实姓名&nbsp;
              <Tooltip title="户外属于高风险活动，需记录真实姓名。">
                <Icon type="question-circle-o" />
              </Tooltip>
          </span>
          )}
        hasFeedback
      >
        {getFieldDecorator('realName', {
          rules: [{ required: true, message: '请输入真实姓名', whitespace: true }],
        })(
          <Input />,
          )}
      </FormItem>
      <FormItem
        {...formItemLayout}
        label={(
          <span>
              昵称&nbsp;
              <Tooltip title="个性户外小昵称，方便队友间互认">
                <Icon type="question-circle-o" />
              </Tooltip>
          </span>
          )}
        hasFeedback
      >
        {getFieldDecorator('nickname', {
          rules: [{ required: true, message: '请输入昵称', whitespace: true }],
        })(
          <Input />,
          )}
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="性别"
        id="gender"
      >
        {getFieldDecorator('gender', {
          rules: [{ required: true }],
        })(
          <Radio.Group>
            <Radio value="gg">
              <LocalIcon type="male" colorful />GG
            </Radio>
            <Radio value="mm">
              <LocalIcon type="female" colorful />MM
          </Radio>
          </Radio.Group>,
      )}
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="电话号码"
      >
        {getFieldDecorator('phone', {
          rules: [{ type: 'string', pattern: /^[0-9]+$/, message: '请输入正确的电话号码' }, { required: true, message: '输入手机号' }],
        })(
          <Input addonBefore={prefixSelector} />,
          )}
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="住址"
      >
        {getFieldDecorator('address', {
          rules: [{ required: true, message: '输入住址' }],
        })(
          <Input />,
          )}
      </FormItem>
      <FormItem
        {...formItemLayout}
        label={(
          <span>
              紧急联系人&nbsp;
              <Tooltip title="户外属于高风险活动，需记录紧急联系人。紧急联系人不能互为同一个活动的成员。">
                <Icon type="question-circle-o" />
              </Tooltip>
          </span>
          )}
        hasFeedback
      >
        {getFieldDecorator('emergency', {
          rules: [{ required: true, message: '请输入真实姓名', whitespace: true }],
        })(
          <Input />,
          )}
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="电话号码"
      >
        {getFieldDecorator('emergencyPhone', {
          rules: [{ type: 'string', pattern: /^[0-9]+$/, message: '请输入正确的电话号码' }, { required: true, message: '输入紧急联系人手机号' }],
        })(
          <Input addonBefore={prefixSelector} />,
          )}
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="QQ"
      >
        {getFieldDecorator('QQ')(
          <Input />,
          )}
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="微博"
      >
        {getFieldDecorator('weibo')(
          <Input />,
          )}
      </FormItem>
      <FormItem
        {...formItemLayout}
        label={(
          <span>
              兴趣领域&nbsp;
              <Tooltip title="感兴趣的方面">
                <Icon type="question-circle-o" />
              </Tooltip>
          </span>
        )}
        id="role"
      >
        {getFieldDecorator('role')(
          <Checkbox.Group
            options={roleOptions}
          />,
      )}
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="个性签名"
        id="role"
      >
        {getFieldDecorator('notes')(
          <Input type="textarea" />,
      )}
      </FormItem>


      <FormItem {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit" size="large">注册</Button>
      </FormItem>
    </Form>
  );
}
export default Form.create()(RegisterForm);
