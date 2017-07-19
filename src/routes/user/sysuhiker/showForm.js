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
  const colProps = {
  	xs:{span:24},
  	sm:{span:12}
  }
  const rowItem = (key, value,colSpan=4)=>(
	<Row className={styles.showFormItem}>
		<Col span={colSpan}><p style={{position:'absolute',right:'0px'}}>{key}:</p></Col>
		<Col span={16} offset={1} >{value || 'Empty'}</Col>
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
	  	{rowItem('兴趣领域', interest)}
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