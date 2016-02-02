import React, {PropTypes} from 'react';
import PureRender from 'react-addons-pure-render-mixin';
import {Row, Col} from 'react-bootstrap';


export default React.createClass({
  displayName: 'OptionTitle',

  mixins: [PureRender],

  propTypes: {
    title: PropTypes.string.isRequired,
    description: PropTypes.node,
  },
  hasDescription() {
    return !! this.props.description;
  },
  render: function() {
    return (
      <Row className='mv-half'>
        <Col xs={12}>
          <div><h3>{this.props.title}</h3></div>
          {this.hasDescription() && <div dangerouslySetInnerHTML={{__html: this.props.description}} />}
        </Col>
      </Row>
    );
  },
});
