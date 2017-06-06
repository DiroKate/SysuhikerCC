import React from 'react';
import { Form, Icon, Input, Button, Checkbox, Row, Col } from 'antd';

const FormItem = Form.Item;

class LoginForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { onOk } = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        onOk(values);
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const right = {
      float: right,
    };
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
          {getFieldDecorator('user_email', {
            rules: [{ required: true, message: '请输入用户邮箱登陆' }],
          })(
            <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="用户邮箱" />,
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('user_psw', {
            rules: [{ required: true, message: '请输入密码!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" />,
          )}
        </FormItem>
        <FormItem>
          <Row type="flex">
            <Col xs={{ span: 24 }} lg={{ span: 12 }}>
              {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true,
              })(
                <Checkbox>Remember me</Checkbox>,
              )}
            </Col>
            <Col lg={{ span: 6, offset: 6 }} xs={{ offset: 0, span: 24 }}>
              <a href="">Forgot password</a>
            </Col>
          </Row>
          <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
            登录
          </Button>
          或 <a href="">现在去注册!</a>
        </FormItem>
      </Form>
    );
  }
}

export default Form.create()(LoginForm);
