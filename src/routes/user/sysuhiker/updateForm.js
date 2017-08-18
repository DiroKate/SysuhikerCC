import React from 'react';
import { connect } from 'dva';
import {
  Form,
  Input,
  Radio,
  Tooltip,
  Icon,
  Checkbox,
  Button,
  Upload,
} from 'antd';
import { LocalIcon } from '../../../components';
import { config, notificaionUtils } from '../../../utils';
import styles from './sysuhiker.less';

function updateForm({ form, loginUser, dispatch }) {
  const { getFieldDecorator, validateFieldsAndScroll } = form;
  const {
    user_nick,
    user_name,
    user_gender,
    user_phone,
    user_address,
    user_qq,
    user_comments,
    user_interest,
    user_urgentName,
    user_urgentPhone,
    user_avatar_url,
  } = loginUser;

  let imageUrl = user_avatar_url;
  const { roleOptions } = config;
  const formItems = [];
  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 6,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 10,
      },
    },
  };
  const formItemLayoutWide = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 6,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 18,
      },
    },
  };

  const updateHandler = (params) => {
    validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch({
          type: 'app/updateUser',
          payload: {
            ...params,
            ...values,
          },
        });
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateHandler();
  };

  formItems.push(<Form.Item>
    <h2>头像修改</h2>
  </Form.Item>);

  const uploadProps = {
    showUploadList: false,
    action: '/api/?service=Upload.Upload',
    accept: 'image/*',
    beforeUpload(file) {
      const isLt16M = file.size < 16777216;
      if (!isLt16M) {
        notificaionUtils('error', 'Image must smaller than 16MB!');
      }
      return isLt16M;
    },
    onSuccess(ret) {
      console.log('onSuccess', ret);
      const { url } = ret.data;
      imageUrl = url;
      console.log(imageUrl);
      updateHandler({
        user_avatar_url:url,
      });
    },
    onError(err) {
      console.log('onError', err);
      notificaionUtils('error', err);
    },
  };

  formItems.push(<Upload
    className={styles['upload-avatar-uploader']}
    {...uploadProps}
  >
    {imageUrl ?
      <img src={imageUrl} alt="" className={styles['upload-avatar']} /> :
      <Icon type="plus" className={styles['upload-avatar-uploader-trigger']} />}
  </Upload>);


  formItems.push(<Form.Item>
    <h2>个人信息修改</h2>
  </Form.Item>);

  formItems.push(<Form.Item {...formItemLayout} label="昵称" hasFeedback>
    {getFieldDecorator('user_nick', {
      rules: [
        {
          required: true,
          message: '请输入昵称',
          whitespace: true,
        },
      ],
      initialValue: user_nick,
    })(
      <Input />)}
  </Form.Item>);

  formItems.push(<Form.Item {...formItemLayout} label="真实姓名" hasFeedback>
    {getFieldDecorator('user_name', {
      rules: [
        {
          required: true,
          message: '请输入真实姓名',
          whitespace: true,
        },
      ],
      initialValue: user_name,
    })(
      <Input />)}
  </Form.Item>);

  formItems.push(<Form.Item {...formItemLayout} label="性别">
    {getFieldDecorator('user_gender', {
      rules: [
        {
          required: true,
          message: '请选择性别',
        },
      ],
      initialValue: user_gender === 'gg'
          ? 'gg'
          : 'mm',
    })(
      <Radio.Group>
        <Radio value="gg">
          <LocalIcon type="male" colorful />GG
        </Radio>
        <Radio value="mm">
          <LocalIcon type="female" colorful />MM
        </Radio>
      </Radio.Group>)}
  </Form.Item>);

  formItems.push(<Form.Item {...formItemLayout} label="电话" hasFeedback>
    {getFieldDecorator('user_phone', {
      rules: [
        {
          type: 'string',
          pattern: /^[0-9]+$/,
          message: '请输入正确的电话号码',
        }, {
          required: true,
          message: 'Please input your phone number!',
        },
      ],
      initialValue: user_phone,
    })(
      <Input />)}
  </Form.Item>);

  formItems.push(<Form.Item {...formItemLayout} label="住址" hasFeedback>
    {getFieldDecorator('user_address', { initialValue: user_address })(<Input />)}
  </Form.Item>);

  formItems.push(<Form.Item {...formItemLayout} label="QQ" hasFeedback>
    {getFieldDecorator('user_qq', { initialValue: user_qq })(<Input />)}
  </Form.Item>);
  formItems.push(<Form.Item {...formItemLayoutWide} label="兴趣领域">
    {getFieldDecorator('user_interest', {
      initialValue: (user_interest
          ? user_interest.split('+')
          : []),
    })(
      <Checkbox.Group options={roleOptions} />)}

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
    {getFieldDecorator('user_comments', { initialValue: user_comments })(
      <Input type="textarea" />)}
  </Form.Item>);

  formItems.push(<Form.Item>
    <h2>紧急联系人</h2>
  </Form.Item>);

  formItems.push(<Form.Item {...formItemLayout} label="紧急联系人" hasFeedback>
    {getFieldDecorator('user_urgentName', {
      rules: [
        {
          required: true,
          message: '请输入紧急联系人',
          whitespace: true,
        },
      ],
      initialValue: user_urgentName,
    })(
      <Input />)}
  </Form.Item>);

  formItems.push(<Form.Item {...formItemLayout} label="紧急联系人电话" hasFeedback>
    {getFieldDecorator('user_urgentPhone', {
      rules: [
        {
          type: 'string',
          pattern: /^[0-9]+$/,
          message: '请输入正确的电话号码',
        }, {
          required: true,
          message: '请输入紧急联系人电话号码',
        },
      ],
      initialValue: user_urgentPhone,
    })(
      <Input />)}
  </Form.Item>);

  formItems.push(<Form.Item>
    <Button className={styles.updateFormSubmitBtn} type="primary" size="large" onClick={handleSubmit}>
        提交修改
      </Button>
  </Form.Item>);

  return (
    <Form>
      {formItems}
    </Form>
  );
}

const UpdateForm = Form.create()(updateForm);

function mapStateToProps(state) {
  const { loginUser } = state.app;
  return { loginUser };
}

export default connect(mapStateToProps)(UpdateForm);
