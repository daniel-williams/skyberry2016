import React, {PropTypes} from 'react';
import PureRender from 'react-addons-pure-render-mixin';
import {Row, Col} from 'react-bootstrap';
import classnames from 'classnames';


export default React.createClass({
  displayName: 'OptionSelector',

  mixins: [PureRender],

  propTypes: {
    isSelected: PropTypes.bool,
    onClick: PropTypes.func,
  },
  getDefaultProps: function() {
    return {
      isSelected: false,
      onClick: function() {},
    };
  },

  render: function() {
    return (
      <Row className='mb'>
        <Col xs={12}>
          <button className='btn btn-primary' onClick={this.props.onClick}>{this.renderButtonText()}</button>
        </Col>
      </Row>
    );
  },
  renderButtonText: function() {
    return this.props.isSelected
      ? 'Unselect'
      : 'Select';
  }

});
