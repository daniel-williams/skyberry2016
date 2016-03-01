import React, {PropTypes} from 'react';
import {Row, Col} from 'react-bootstrap';

import {Icon, SkyButton, TitleDrawer} from '../../../../components';
import StatusBox from './StatusBox';
import StepStatus from './StepStatus';


export default React.createClass({
  displayName: 'ProjectApproval',

  mixins: [],

  propTypes: {
    status: PropTypes.string,

    isApproved: PropTypes.bool,
    showApproval: PropTypes.func,
  },
  getDefaultProps: function() {
    return {
      status: StepStatus.TODO,

      isApproved: false,
      showApproval: function() {},
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
          {!this.props.isApproved
            ? this.renderApprovalRequiredMessage()
            : this.renderApprovalSummary()
          }
          <p className='mt'>Requesting changes after project approval has been given, is possible, and we recongnize that this is oftentimes unavoidable. Please note, however, that if Skyberry has already produced final deliverables or has started the process of creating final deliverables, additional charges may apply.</p>
          {!this.props.isApproved && this.renderActionButtons()}
        </TitleDrawer>
      </div>
    );
  },
  renderTitleBlock: function() {
    return (
      <h3 className='stack'><StatusBox status={this.props.status} /><span>Project Approval</span></h3>
    );
  },
  renderActionButtons: function() {
    const btnCssNames = 'btn mb-half ' + (this.props.isApproved ? 'btn-default' : 'btn-sky');
    return (
      <div className='mt mb-half'>
        <SkyButton
          isPrimary={!this.props.isApproved}
          size='lg'
          onClick={this.props.showApproval}>Approve Project<br /><Icon className='glyphicon glyphicon-thumbs-up' /></SkyButton>
      </div>
    );
  },
  renderApprovalRequiredMessage: function() {
    return (
      <p>Before final deliverables are produced, Skyberry requires a project approval. Project approval indicates no further edits are necessary or expected, and alerts Skyberry to start the process of producing your deliverables.</p>
    );
  },
  renderApprovalSummary: function() {
    var digiSig = this.renderSignature();
    if(!digiSig) {
      digiSig = <Icon className='glyphicon glyphicon-alert invalid' />;
    }

    return (
      <div className='sel-opt mt-half' ref='selectedOption'>
        <span className='lbl mb-half'>Approved By:</span>
        <span className='val mb-half' style={{marginRight:'15px'}}>{digiSig}</span>
        <SkyButton
          onClick={this.props.showApproval}>View</SkyButton>
      </div>
    );
  },
  renderSignature: function() {
    if(!this.props.isApproved) {
      return null;
    }

    var name = this.props.approvedByName;
    var dt = typeof this.props.approvedDate === 'string'
      ? new Date(this.props.approvedDate)
      : this.props.approvedDate;
    var digiSig = name + ', ' + (dt.getMonth() + 1) + '/' + dt.getDate() + '/' + dt.getFullYear() + ', ' + dt.getHours() + ':' + dt.getMinutes() + ':' + dt.getSeconds();

    return (
      <span className='signature'>{digiSig}</span>
    );
  },


  toggleOpen: function() {
    this.setState({
      open: !this.state.open,
    });
  },

});
