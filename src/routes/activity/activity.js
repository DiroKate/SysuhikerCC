import React from 'react';
import { connect } from 'dva';
import ItemFigure from '../../components/activity/ItemFigure.js';

function Activity() {
  return (
    <div>
      <ItemFigure />
      <ItemFigure />

      <ItemFigure />
    </div>
  );
}
export default connect()(Activity);
