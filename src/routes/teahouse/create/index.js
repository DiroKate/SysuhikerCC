import React from 'react';
import { Tabs, Row, Col,Table } from 'antd';
const { TabPane } = Tabs;

class createForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorContent: null,
    }
  }
  onEditorStateChange = (editorContent) => {
    this.setState({
      editorContent,
    });
  }

  render() {
    const formItems = [];
    

    <Form>
      {formItems}
    </Form>
  }
}

const CreateForm = Form.create()(createForm);

function CreatePage ({teahouseList, isLogin}) {
	
	return (
    <div className="sysuhiker-top-wrapper">
      <Row>
        <Col>
          <p>afadfasdfasdfas</p>
          <CreateForm />
          </Col>
      </Row>
    </div>
  );
}


export default CreatePage;