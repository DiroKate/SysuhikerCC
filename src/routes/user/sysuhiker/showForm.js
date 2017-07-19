import React from 'react';
import { Row,Col } from 'antd';
import { LocalIcon } from '../../../components';
import styles from './sysuhiker.less';


// const FormItem = Form.Item;

function ShowForm ({
	name,nick,email,gender,address,phone,
	qq,weibo,weiboLink,interest,
	urgentName,urgentPhone
}) {



  // const formItemLayout = {
	 //  labelCol: {
	 //    xs: { span: 4 },
	 //  },
	 //  wrapperCol: {
	 //    xs: { span: 16 },
	 //  },
  // };
/*
  	<Form>
      <FormItem>
      	<h1>关于我</h1>
      </FormItem>
      <FormItem
		{...formItemLayout}
		label="昵称"
	  >{nick}<LocalIcon type={gender === 'gg' ? 'male' : 'female'} colorful /></FormItem>
      <FormItem
		{...formItemLayout}
		label="Email"
	  >{email}</FormItem>
	  <FormItem
		{...formItemLayout}
		label="姓名"
	  >{name}</FormItem>
	  <FormItem
		{...formItemLayout}
		label="电话"
	  >{phone}</FormItem>
	  <FormItem
		{...formItemLayout}
		label="地址"
	  >{address}</FormItem>

  	</Form>
  */
  const colProps = {
  	xs:{span:24},
  	sm:{span:12}
  }
  const rowItem = (key, value,colSpan=4)=>(
	<Row className={styles.showFormItem}>
		<Col span={colSpan}><p style={{position:'absolute',right:'0px'}}>{key}:</p></Col>
		<Col span={16} offset={1} >{value}</Col>
	</Row>
  );
  return(
	<Row>
		<Col {...colProps} >
	  	<h2>关于我</h2>
	  	{rowItem('昵称', nick)}
	  	{rowItem('Email', email)}
	  	{rowItem('姓名', (<p>{`${name}    `}<LocalIcon type={gender === 'gg' ? 'male' : 'female'} colorful /></p>))}
	  	{rowItem('电话', phone)}
	  	{rowItem('地址', address)}
	  	{rowItem('QQ', qq)}
	  	{rowItem('新浪微博', (<a href={weiboLink}>@{weibo}</a>) )}
		</Col>
		<Col {...colProps} >
	  	<h2>紧急联系人</h2>
	  	{rowItem('紧急联系人', urgentName,6)}
	  	{rowItem('紧急联系电话', urgentPhone,6)}
		</Col>

	</Row>

  );

}
export default ShowForm;