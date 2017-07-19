import React from 'react';
import { connect } from 'dva';
import { Form,Input,Radio,Tooltip,Icon,Checkbox,Button } from 'antd';
import { LocalIcon } from '../../../components';
import styles from './sysuhiker.less';

function updateForm ({form,loginUser,dispatch}) {

  const { getFieldDecorator, validateFieldsAndScroll } = form;
  const { user_nick, user_name, user_gender,user_phone,
  	user_address,user_qq,user_comments,user_interest,
  	user_urgentname,user_urgentphone } = loginUser;

  const roleOptions = [
'领队', '协作', '头驴', '尾驴', '财务', '后勤',
 '环保',  '作业', '摄影', '医护','厨师',
 '无线通讯','骑行','游泳','跑步','定向','攀岩','奢靡腐败'];
	const formItems=[];
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
      sm: { span: 18 },
    },
  };

  const handleSubmit = (e) => {
    e.preventDefault();
      validateFieldsAndScroll((err, values) => {
        if (!err) {
          const retValues = values;
          dispatch({
      type: 'app/updateUser',
      payload: {
        ...values,
      },
    });
        }
      });
  };

	formItems.push(<Form.Item><h2>头像修改</h2></Form.Item>);
	formItems.push(<Form.Item><h2>个人信息修改</h2></Form.Item>);

	formItems.push(
  	  <Form.Item
        {...formItemLayout}
        label="昵称"
        hasFeedback
      >
        {getFieldDecorator("user_nick", {
          rules: [
            { required: true, message: "请输入昵称", whitespace: true },
          ],
          initialValue: user_nick,
        })(
          <Input />,
        )}
      </Form.Item>	
	);

	formItems.push(
  	  <Form.Item
        {...formItemLayout}
        label="真实姓名"
        hasFeedback
      >
        {getFieldDecorator("user_name", {
          rules: [
            { required: true, message: "请输入真实姓名", whitespace: true },
          ],
          initialValue: user_name,
        })(
          <Input />,
        )}
      </Form.Item>	
	);

	formItems.push(
  	  <Form.Item
        {...formItemLayout}
        label="性别"
      >
        {getFieldDecorator('user_gender', {
          rules: [{
            required: true, message: '请选择性别',
          }],
          initialValue: user_gender === 'gg' ? 'male' : 'fefemale',
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
      </Form.Item>	
	);

	formItems.push(<Form.Item
        {...formItemLayout}
        label="电话"
        hasFeedback
      >
        {getFieldDecorator('user_phone', {
          rules: [
            { type: 'string', pattern: /^[0-9]+$/, message: '请输入正确的电话号码' },
            { required: true, message: 'Please input your phone number!' }],
          initialValue: user_phone,
        })(
          <Input />,
        )}
      </Form.Item>);

	formItems.push(<Form.Item
        {...formItemLayout}
        label="住址"
        hasFeedback
      >
        {getFieldDecorator('user_address', {
          initialValue: user_address,
        })(<Input />)}
      </Form.Item>);

	formItems.push(<Form.Item
        {...formItemLayout}
        label="QQ"
        hasFeedback
      >
        {getFieldDecorator('user_qq', {
          initialValue: user_qq,
        })(<Input />)}
      </Form.Item>);
	formItems.push(<Form.Item
        {...formItemLayoutWide}
        label="兴趣领域"
      >
        {getFieldDecorator('user_interest', {
          initialValue: (user_interest ? user_interest.split('+') : []),
        })(
          <Checkbox.Group
            options={roleOptions}
          />,
        )}

      </Form.Item>);

	formItems.push(<Form.Item
        {...formItemLayout}
        label={(
          <span>
              个性签名&nbsp;
              <Tooltip title="显示在首页的个性签名">
                <Icon type="question-circle-o" />
              </Tooltip>
          </span>
          )}
        hasFeedback
      >
        {getFieldDecorator('user_comments',{
          initialValue: user_comments,
        })(
          <Input type="textarea" />,
      )}
      </Form.Item>);
	
	formItems.push(<Form.Item><h2>紧急联系人</h2></Form.Item>);

	formItems.push(<Form.Item
        {...formItemLayout}
        label="紧急联系人"
        hasFeedback
      >
        {getFieldDecorator('user_urgentname', {
          rules: [{ required: true, message: '请输入紧急联系人', whitespace: true }],
          initialValue: user_urgentname,
        })(
          <Input />,
        )}
      </Form.Item>);

	formItems.push(<Form.Item
        {...formItemLayout}
        label="紧急联系人电话"
        hasFeedback
      >
        {getFieldDecorator('user_urgentphone', {
          rules: [
            { type: 'string', pattern: /^[0-9]+$/, message: '请输入正确的电话号码' },
            { required: true, message: '请输入紧急联系人电话号码' }],
          initialValue: user_urgentphone,
        })(
          <Input />,
        )}
      </Form.Item>);

	formItems.push(<Form.Item>
        <Button
          className={styles.updateFormSubmitBtn}
          type="primary"
          size="large"
          onClick={handleSubmit}
        >
            提交修改
          </Button>
      </Form.Item>);

	return (<Form>
        {formItems}
      </Form>);
}

const UpdateForm = Form.create()(updateForm);

function mapStateToProps(state) {
  const { loginUser } = state.app;
  return {
    loginUser,
  };
}

export default connect(mapStateToProps)(UpdateForm);
