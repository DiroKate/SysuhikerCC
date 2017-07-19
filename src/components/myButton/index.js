import React from 'react';
import { Alert, Button, Affix } from 'antd';
import styles from './CreateButton.less';

function CreateButton(props) {
  const { createHandler, alertLabel, btnLabel } = props;
  return (
    <div>
      <Affix offsetTop={120}>
        <Button className={styles.button} size="large" type="primary" onClick={createHandler}>
          {btnLabel}
        </Button>

        <Alert className={styles.alert} message={alertLabel.message} description={alertLabel.description} type={alertLabel.type} />
      </Affix>
    </div>
  );
}

export default CreateButton;
