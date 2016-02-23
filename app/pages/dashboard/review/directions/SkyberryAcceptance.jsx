import React, {PropTypes} from 'react';
import {Row, Col} from 'react-bootstrap';

import {TitleDrawer} from '../../../../components';
import StatusBox from './StatusBox';
import StepStatus from './StepStatus';


export default React.createClass({
  displayName: 'SkyberryAcceptance',

  mixins: [],

  propTypes: {
    status: PropTypes.string,

    requestType: PropTypes.number,
  },
  getDefaultProps: function() {
    return {
      status: StepStatus.TODO,

      requestType: 1,
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
  showEditMessage: function() {
    return this.props.requestType === 1;
  },

  render: function() {

    return (
      <div className='step'>
        <TitleDrawer title={this.renderTitleBlock()} open={this.state.open} onClick={this.toggleOpen}>
          <p>Skyberry Studio has been notified that you have completed this design review and are ready to proceed.</p>
          {this.showEditMessage() && this.renderEditMessage()}
        </TitleDrawer>
      </div>
    );
  },
  renderTitleBlock: function() {
    return (
      <h3 className='stack'><StatusBox /><span>Awaiting Skyberry</span></h3>
    );
  },
  renderEditMessage: function() {
    return (
      <p className='mt'>You are free to make edits to this design review&mdash;including leaving additional directions and comments&mdash;up until the time when Skyberry accepts the design review. You may also cancel your requested "Next Step" anytime before Skyberry accepts the design review.</p>
    );
  },


  toggleOpen: function() {
    this.setState({
      open: !this.state.open,
    });
  },

});
