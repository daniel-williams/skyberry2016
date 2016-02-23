import React from 'react';
import {Row, Col} from 'react-bootstrap';

export default {

  getProjectName: function() {
    return this.props.project ? this.props.project.name : '';
  },

  renderClose: function() {
    return (
      <div className='col pull-right'>
        <button className='btn btn-default' onClick={this.close}>Close</button>
      </div>
    );
  },

  renderObjAsRows: function(obj) {
    let prop, items = [];
    for(prop in obj) {
      if(obj.hasOwnProperty(prop)) {
        items.push(this.renderLabelValue(prop, obj[prop]));
      }
    }
    return items;
  },
  renderLabelValue: function(lbl, val) {
    return (
      <Row key={lbl}>
        <Col xs={12} className='lbl-val'>
          <div className='hr'></div>
          <div className='clearfix'>
            <div className='lbl'>{lbl}</div>
            <div className='val'>{val}</div>
          </div>
        </Col>
      </Row>
    );
  },

}
