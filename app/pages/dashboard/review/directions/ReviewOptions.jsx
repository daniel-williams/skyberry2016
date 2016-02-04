import React, {PropTypes} from 'react';
import PureRender from 'react-addons-pure-render-mixin';
import {Row, Col} from 'react-bootstrap';

import {StatusBox, TitleDrawer} from '../../../../components';
import StepStatus from './StepStatus';


export default React.createClass({
  displayName: 'ReviewOptions',

  mixins: [PureRender, StepStatus],

  propTypes: {
    open: PropTypes.bool,
    toggle: PropTypes.bool,
    hasProofs: PropTypes.bool,
    status: PropTypes.string,
  },
  getDefaultProps: function() {
    return {
      open: true,
      toggle: true,
      hasProofs: false,
      status: StepStatus.TODO,
    };
  },

  render: function() {
    return (
      <div className='step'>
        <TitleDrawer title={this.getTitle()} open={this.props.open} toggle={this.props.toggle} onClick={this.onClick}>
          <div>Review the designers' notes {this.renderProofVerbiage()} and design options, located below.</div>
        </TitleDrawer>
      </div>
    );
  },
  renderProofVerbiage: function() {
    return this.props.hasProofs ? ', proofs' : '';
  },
  getTitle: function() {
    const isCompleted = this.props.status === StepStatus.COMPLETED;
    return (
      <h3 className='stack'><StatusBox isCompleted={isCompleted} /><span>Review</span></h3>
    );
  },

  onClick: function(e) {
    e.preventDefault();
    console.log('CLICK: review options');
  },

});
