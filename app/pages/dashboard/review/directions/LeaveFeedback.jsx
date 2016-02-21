import React, {PropTypes} from 'react';
import {Row, Col} from 'react-bootstrap';

import {TitleDrawer} from '../../../../components';
import StatusBox from './StatusBox';
import StepStatus from './StepStatus';


export default React.createClass({
  displayName: 'LeaveFeedback',

  mixins: [],

  propTypes: {
    status: PropTypes.string,

    hasMultipleOptions: PropTypes.bool,
    selectedOption: PropTypes.any,
    isEditable: PropTypes.bool,
  },
  getDefaultProps: function() {
    return {
      status: StepStatus.TODO,

      hasMultipleOptions: true,
      selectedOption: null,
      isEditable: true,
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
          {this.renderStepVerbiage()}
          {this.props.hasMultipleOptions && this.renderOptionInfo()}
        </TitleDrawer>
      </div>
    );
  },
  renderTitleBlock: function() {
    return (
      <h3 className='stack'><StatusBox status={this.props.status} />Feeback</h3>
    );
  },
  renderOptionInfo: function() {
    return (
      <div className='sel-opt mt-half' ref='selectedOption'>
        <span className='lbl'>Selected Option:</span>
        <span className='val'>{this.renderOptionTitle()}</span>
        {this.props.hasMultipleOptions && this.renderOptionAction()}
      </div>
    );
  },
  renderOptionTitle: function() {
    return !!this.props.selectedOption
      ? this.props.selectedOption.title || 'Option Title'
      : <i className='glyphicon glyphicon-alert invalid' />;
  },
  renderOptionAction: function() {
    return !!this.props.selectedOption && this.props.isEditable && (
      <span className='mb-half' style={{marginLeft:'15px'}}>
        <button
          className='btn btn-default'
          onClick={this.props.clearOption}>Clear</button>
      </span>
    );
  },
  renderStepVerbiage: function() {
    let optionsVerviage = this.props.hasMultipleOptions
      ? 'Indicate which design option you would like to proceed with by using the controls below. '
      : '';

    return <div>{optionsVerviage}Leave feedback, special directions, or anything else you'd like to communicate, using comments.</div>
  },

  toggleOpen: function() {
    this.setState({
      open: !this.state.open,
    });
  },

});
