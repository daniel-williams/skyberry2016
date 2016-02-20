import React, {PropTypes} from 'react';
import PureRender from 'react-addons-pure-render-mixin';
import {Row, Col} from 'react-bootstrap';

import {TitleDrawer} from '../../../../components';
import StatusBox from './StatusBox';
import StepStatus from './StepStatus';


export default React.createClass({
  displayName: 'ReviewOptions',

  mixins: [PureRender],

  propTypes: {
    status: PropTypes.string,
    open: PropTypes.bool,
    stepClick: PropTypes.func,

    hasProofs: PropTypes.bool,
  },
  getDefaultProps: function() {
    return {
      status: StepStatus.TODO,
      open: true,
      stepClick: this.onClick,

      hasProofs: false,
    };
  },
  isCompleted: function() {
    console.log('WTF?', this.props.status, StepStatus.COMPLETED);
    return this.props.status === StepStatus.COMPLETED;
  },

  render: function() {
    return (
      <div className='step'>
        <TitleDrawer title={this.renderTitleBlock()} open={this.props.open} onClick={this.props.stepClick}>
          <div>Review the designers' notes {this.renderProofVerbiage()} and design options, located below.</div>
        </TitleDrawer>
      </div>
    );
  },
  renderTitleBlock: function() {
    return (
      <h3 className='stack'><StatusBox status={this.props.status} /><span>Review</span></h3>
    );
  },
  renderProofVerbiage: function() {
    return this.props.hasProofs ? ', proofs' : '';
  },

  onClick: function(e) {
    e.preventDefault();
    console.log('onClick: not implemented');
  },

});
