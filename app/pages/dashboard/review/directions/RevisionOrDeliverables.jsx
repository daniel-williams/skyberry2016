import React, {PropTypes} from 'react';
import {Row, Col} from 'react-bootstrap';

import {Icon, SkyButton, TitleDrawer} from '../../../../components';
import StatusBox from './StatusBox';
import StepStatus from './StepStatus';


export default React.createClass({
  displayName: 'RevisionOrDeliverables',

  mixins: [],

  propTypes: {
    status: PropTypes.string,

    hasRequest: PropTypes.bool,
    requestType: PropTypes.oneOf([0,1,2]),
    isDisabled: PropTypes.bool,
    isCancelable: PropTypes.bool,

    requestRevision: PropTypes.func,
    requestDeliverables: PropTypes.func,
    clearRequest: PropTypes.func,
  },
  getDefaultProps: function() {
    return {
      status: StepStatus.TODO,

      hasRequest: false,
      requestType: 0,
      isDisabled: false,
      isCancelable: false,

      requestRevision: function() {},
      requestDeliverables: function() {},
      clearRequest: function() {},
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
          <div>
            <p>Let us know if you need a Revision or final Deliverables. Request a Revision when you need additional changes. Request Deliverables when no changes are needed and you are ready to take ownership of production files.</p>
          </div>
          {this.props.hasRequest
            ? this.renderSummary()
            : this.renderActions()}
        </TitleDrawer>
      </div>
    );
  },
  renderTitleBlock: function() {
    return (
      <h3 className='stack'><StatusBox status={this.props.status} /><span>Next Step</span></h3>
    );
  },
  renderActions: function() {
    const isDisabled = this.props.isDisabled;
    return (
      <div>
        <Row className='request-buttons mt'>
          <div className='col'>
            <SkyButton
              isPrimary={!isDisabled}
              isDisabled={isDisabled}
              size='lg'
              onClick={this.props.requestRevision}>Revision<br /><Icon className='glyphicon glyphicon-repeat' /></SkyButton>
          </div>
          <div className='col'>
            <SkyButton
              isPrimary={!isDisabled}
              isDisabled={isDisabled}
              size='lg'
              onClick={this.props.requestDeliverables}>Deliverables<br /><Icon className='glyphicon glyphicon-export' /></SkyButton>
          </div>
        </Row>
      </div>
    );
  },
  renderSummary: function() {
    const title = this.props.requestType === 0
      ? this.renderIcon('alert invalid')
      : this.props.requestType === 1
        ? 'Revision'
        : 'Deliverables';

    return (
      <div className='sel-opt mv' ref='selectedOption'>
        <span className='lbl mb-half'>Requested Next Step:</span>
        <span className='val mb-half'>{title}</span>
        {this.props.isCancelable && this.renderCancel()}
      </div>
    );
  },
  renderCancel: function() {
    return (
      <span className='mb-half' style={{marginLeft:'15px'}}>
        <SkyButton
          onClick={this.props.clearRequest}>Cancel Request</SkyButton>
      </span>
    );
  },

  toggleOpen: function() {
    this.setState({
      open: !this.state.open,
    });
  },

});
