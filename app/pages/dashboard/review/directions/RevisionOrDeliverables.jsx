import React, {PropTypes} from 'react';
import PureRender from 'react-addons-pure-render-mixin';
import {Row, Col} from 'react-bootstrap';

import {TitleDrawer} from '../../../../components';
import StatusBox from './StatusBox';
import StepStatus from './StepStatus';


export default React.createClass({
  displayName: 'RevisionOrDeliverables',

  mixins: [PureRender],

  propTypes: {
    status: PropTypes.string,
    open: PropTypes.bool,
    stepClick: PropTypes.func,

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
      open: true,
      stepClick: this.onClick,

      hasRequest: false,
      requestType: 0,
      isDisabled: false,
      isCancelable: false,

      requestRevision: function() {},
      requestDeliverables: function() {},
      clearRequest: function() {},
    };
  },

  render: function() {
    return (
      <div className='step'>
        <TitleDrawer title={this.renderTitleBlock()} open={this.props.open} onClick={this.props.stepClick}>
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
    var isDisabled = this.props.isDisabled; // this.state.hasOptions && !this.state.selectedId;
    var btnType = 'btn btn-lg mb-half ' + (isDisabled ? 'btn-default' : 'btn-sky');

    return (
      <div>
        <Row className='request-buttons mt'>
          <div className='col'>
            <button
              type='button'
              className={btnType}
              onClick={this.props.requestRevision}
              disabled={isDisabled}>Revision<br /><i className='glyphicon glyphicon-repeat' /></button>
          </div>
          <div className='col'>
            <button
              type='button'
              className={btnType}
              onClick={this.props.requestDeliverables}
              disabled={isDisabled}>Deliverables<br /><i className='glyphicon glyphicon-export' /></button>
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
        <button
          className='btn btn-default'
          onClick={this.props.clearRequest}>Cancel Request</button>
      </span>
    );
  },

});
