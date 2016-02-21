import React, {PropTypes} from 'react';
import {Row, Col} from 'react-bootstrap';

import {TitleDrawer} from '../../../../components';
import StatusBox from './StatusBox';
import StepStatus from './StepStatus';


export default React.createClass({
  displayName: 'ReviewOptions',

  mixins: [],

  propTypes: {
    status: PropTypes.string,

    hasProofs: PropTypes.bool,
  },
  getDefaultProps: function() {
    return {
      status: StepStatus.TODO,

      hasProofs: false,
    };
  },

  getInitialState: function() {
    return {
      open: this.props.status === StepStatus.CURRENT,
    };
  },

  componentWillReceiveProps: function(nextProps) {
    if(nextProps.status !== this.props.status) {
      this.setState({
        open: nextProps.status === StepStatus.CURRENT,
      });
    }
  },

  render: function() {
    return (
      <div className='step'>
        <TitleDrawer title={this.renderTitleBlock()} open={this.state.open} onClick={this.toggleOpen}>
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

  toggleOpen: function() {
    this.setState({
      open: !this.state.open,
    });
  },

});
