import React, {PropTypes} from 'react';
import {Row, Col} from 'react-bootstrap';

import {TitleDrawer} from '../../../../components';
import StatusBox from './StatusBox';
import StepStatus from './StepStatus';
import DesignerNotes from './DesignerNotes';


export default React.createClass({
  displayName: 'ReviewOptions',

  mixins: [],

  propTypes: {
    status: PropTypes.string,
    notes: PropTypes.any,
    hasMultipleOptions: PropTypes.bool,
    hasProofs: PropTypes.bool,
  },
  getDefaultProps: function() {
    return {
      status: StepStatus.TODO,
      notes: null,
      hasMultipleOptions: false,
      hasProofs: false,
    };
  },

  getInitialState: function() {
    return {
      // open: this.props.status === StepStatus.CURRENT,
      open: true,
    };
  },

  componentWillReceiveProps: function(nextProps) {
    if(nextProps.status !== this.props.status) {
      this.setState({
        open: nextProps.status === StepStatus.CURRENT,
      });
    }
  },

  hasNotes: function() {
    return this.props.notes && this.props.notes.length > 0;
  },
  getNotes: function() {
    return this.props.notes;
  },

  render: function() {
    return (
      <div className='step'>
        <TitleDrawer title={this.renderTitleBlock()} open={this.state.open} onClick={this.toggleOpen}>
          <div>Please review the following;</div>
          <div>
            <ul>
              {this.hasNotes() && <li>Designers' note</li>}
              {this.props.hasProofs && <li>Proofs <span className='paren'>(see below)</span></li>}
              {this.props.hasMultipleOptions
                ? <li>Design options <span className='paren'>(see below)</span></li>
                : <li>Design refinements <span className='paren'>(see below)</span></li>}
            </ul>
          </div>

          {this.hasNotes() && <DesignerNotes notes={this.getNotes()} />}
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
