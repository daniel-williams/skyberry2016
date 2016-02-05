import React, {PropTypes} from 'react';
import PureRender from 'react-addons-pure-render-mixin';
import {Row, Col} from 'react-bootstrap';

import {StatusBox, TitleDrawer} from '../../../../components';
import StepStatus from './StepStatus';


export default React.createClass({
  displayName: 'LeaveFeedback',

  mixins: [PureRender, StepStatus],

  propTypes: {
    status: PropTypes.string,
    open: PropTypes.bool,
    onClick: PropTypes.func,

    hasMultipleOptions: PropTypes.bool,
    selectedOption: PropTypes.any,
    isEditable: PropTypes.bool,
  },
  getDefaultProps: function() {
    return {
      status: StepStatus.TODO,
      open: true,
      onClick: this.onClick,

      hasMultipleOptions: true,
      selectedOption: null,
      isEditable: true,
    };
  },
  isCompleted: function() {
    return this.props.status === StepStatus.COMPLETED;
  },

  render: function() {

    return (
      <div className='step'>
        <TitleDrawer title={this.renderTitleBlock()} open={this.props.open} onClick={this.props.onClick}>
          {this.renderStepVerbiage()}
          {this.renderOptionInfo()}
        </TitleDrawer>
      </div>
    );
  },
  renderTitleBlock: function() {
    return (
      <h3 className='stack'><StatusBox isCompleted={this.isCompleted()} />Feeback</h3>
    );
  },
  renderOptionInfo: function() {
    return (
      <div className='sel-opt mt-half' ref='selectedOption'>
        <span className='lbl'>Selected Option:</span>
        <span className='val'>{this.renderOptionTitle()}</span>
        {this.renderOptionAction()}
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
        <button className='btn btn-default' onClick={this.props.clearSelectedOption}>Clear</button>
      </span>
    );
  },
  renderStepVerbiage: function() {
    let optionsVerviage = this.props.hasMultipleOptions
      ? 'Indicate which design option you would like to proceed with by using the controls below. '
      : '';

    return <div>{optionsVerviage}Leave feedback, special directions, or anything else you'd like to communicate, using comments.</div>
  },

  onClick: function(e) {
    e.preventDefault();
    console.log('onClick: not implemented');
  },

});
