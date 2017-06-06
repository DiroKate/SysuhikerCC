import React from 'react';
import { Alert, Button, Affix } from 'antd';
import styles from './CreateButton.less';


function CreateButton(props) {
  const { createHandler } = props;
  return (
    <div>
      <Affix offsetTop={120}>
        <Button
          className={styles.button}
          size="large"
          type="primary"
          onClick={createHandler}
        >
          创建活动
        </Button>

        <Alert
          className={styles.alert}
          message="人人都是领队"
          description="AA户外概念下，人人都是领队，如果有好玩的路线或者点子，不妨创建一个活动，找到小伙伴们一起协助组织玩耍，认识更多靠谱的朋友们。"
          type="success"
        />
      </Affix>
    </div>
  );
}

export default CreateButton;
