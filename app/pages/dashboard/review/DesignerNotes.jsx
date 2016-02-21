import React, {PropTypes} from 'react';
import PureRender from 'react-addons-pure-render-mixin';
import {Row, Col} from 'react-bootstrap';


export default React.createClass({
  displayName: 'DesignerNotes',

  mixins: [PureRender],

  propTypes: {
    description: PropTypes.string,
  },
  getDefaultProps: function() {
    return {
      description: '',
    };
  },

  render: function() {
    if(!this.props.description.length) {
      return null;
    }
    return (
      <Row className='mb'>
        <Col xs={12}><h2>Notes from the designer</h2></Col>
        <Col xs={12}><div dangerouslySetInnerHTML={{__html: this.props.description}}></div></Col>
      </Row>
    );
  },

});
