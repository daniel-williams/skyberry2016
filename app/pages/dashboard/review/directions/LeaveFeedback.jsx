import React, {PropTypes} from 'react';
import {Row, Col} from 'react-bootstrap';

import {SkyButton, TitleDrawer} from '../../../../components';
import StatusBox from './StatusBox';
import StepStatus from './StepStatus';


export default React.createClass({
  displayName: 'LeaveFeedback',

  mixins: [],

  propTypes: {
    status: PropTypes.string,
    isEditable: PropTypes.bool,
    hasMultipleOptions: PropTypes.bool,
    selectedOption: PropTypes.any,
    refinementOption: PropTypes.any,
    clearOption: PropTypes.func,
  },
  getDefaultProps: function() {
    return {
      status: StepStatus.TODO,
      isEditable: true,
      hasMultipleOptions: true,
      selectedOption: null,
      refinementOption: null,
      clearOption: function() {},
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
          {this.props.hasMultipleOptions
            ? this.renderSelectedInfo()
            : this.renderRefinementInfo()
          }
        </TitleDrawer>
      </div>
    );
  },
  renderTitleBlock: function() {
    return (
      <h3 className='stack'><StatusBox status={this.props.status} />Feedback</h3>
    );
  },
  renderStepVerbiage: function() {
    let optionsVerviage = this.props.hasMultipleOptions
      ? 'Indicate which design option you would like to proceed with by using the controls below. '
      : '';

    return <div>{optionsVerviage}Leave feedback, special directions, or anything else you'd like to communicate, using comments.</div>
  },

  renderSelectedInfo: function() {
    return (
      <div className='sel-opt mt-half' ref='selectedOption'>
        <span className='lbl'>Selected Option:</span>
        <span className='val'>{this.renderSelectedTitle()}</span>
        {this.renderClearAction()}
      </div>
    );
  },
  renderSelectedTitle: function() {
    const option = this.props.selectedOption;
    return !!option
    ? option.title || option.filenameOriginal
    : <i className='glyphicon glyphicon-alert invalid' />;
  },
  renderClearAction: function() {
    if(this.props.selectedOption === null || !this.props.isEditable) { return; }

    return (
      <span className='mb-half' style={{marginLeft:'15px'}}>
      <SkyButton
        onClick={this.props.clearOption}>Clear</SkyButton>
      </span>
    );
  },

  renderRefinementInfo: function() {
    return (
      <div className='sel-opt mt-half' ref='selectedOption'>
        <span className='lbl'>Refining Option:</span>
        <span className='val'>{this.renderRefinementTitle()}</span>
      </div>
    );
  },
  renderRefinementTitle: function() {
    const option = this.props.refinementOption;
    return !!option
      ? option.title || option.filenameOriginal
      : <i className='glyphicon glyphicon-alert invalid' />;
  },


  toggleOpen: function() {
    this.setState({
      open: !this.state.open,
    });
  },

});
