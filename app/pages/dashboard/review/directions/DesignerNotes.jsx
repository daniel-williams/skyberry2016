import React, {PropTypes} from 'react';
import PureRender from 'react-addons-pure-render-mixin';
import {Row, Col} from 'react-bootstrap';


export default React.createClass({
  displayName: 'DesignerNotes',

  mixins: [PureRender],

  propTypes: {
    notes: PropTypes.string,
  },
  getDefaultProps: function() {
    return {
      notes: '',
    };
  },

  render: function() {
    if(!this.props.notes.length) {
      return null;
    }
    return (
      <Row className='mt'>
        <Col xs={12}>
          <label>Designers' note</label>
        </Col>
        <Col xs={12}><div dangerouslySetInnerHTML={{__html: this.props.notes}}></div></Col>
      </Row>
    );
  },

});
