import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;

function RegisterForm(props) {
  const { form } = props;
  const { getFieldDecorator, validateFieldsAndScroll, getFieldValue, validateFields } = form;

  const handleSubmit = (e) => {
    e.preventDefault();
    validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
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
      callback('Two passwords that you enter is inconsistent!');
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
            type: 'email', message: 'The input is not valid E-mail!',
          }, {
            required: true, message: 'Please input your E-mail!',
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
          rules: [{
            required: true, message: 'Please input your password!',
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
            required: true, message: 'Please confirm your password!',
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
              Nickname&nbsp;
              <Tooltip title="What do you want other to call you?">
                <Icon type="question-circle-o" />
              </Tooltip>
          </span>
          )}
        hasFeedback
      >
        {getFieldDecorator('nickname', {
          rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }],
        })(
          <Input />,
          )}
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="Phone Number"
      >
        {getFieldDecorator('phone', {
          rules: [{ required: true, message: 'Please input your phone number!' }],
        })(
          <Input addonBefore={prefixSelector} />,
          )}
      </FormItem>

      <FormItem
        {...formItemLayout}
        label="Captcha"
        extra="We must make sure that your are a human."
      >
        <Row gutter={8}>
          <Col span={12}>
            {getFieldDecorator('captcha', {
              rules: [{ required: true, message: 'Please input the captcha you got!' }],
            })(
              <Input size="large" />,
              )}
          </Col>
          <Col span={12}>
            <Button size="large">Get captcha</Button>
          </Col>
        </Row>
      </FormItem>
      <FormItem {...tailFormItemLayout} style={{ marginBottom: 8 }}>
        {getFieldDecorator('agreement', {
          valuePropName: 'checked',
        })(
          <Checkbox>I have read the <a href="">agreement</a></Checkbox>,
          )}
      </FormItem>
      <FormItem {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit" size="large">Register</Button>
      </FormItem>
    </Form>
  );
}
export default Form.create()(RegisterForm);
