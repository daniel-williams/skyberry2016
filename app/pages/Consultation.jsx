import React, {PropTypes} from 'react';
import {Row, Col} from 'react-bootstrap';

import {SkyButton, SkyModal} from '../components';
import ConsultationForm from './ConsultationForm';


export default React.createClass({
  displayName: 'Consultation',

  propTypes: {
    isVisible: PropTypes.bool,
  },
  getDefaultProps: function() {
    return {
      isVisible: false,
    };
  },

  render: function() {
    return (
      <SkyModal
        isVisible={true}
        header={this.renderHeader()}
        body={this.renderBody()}
        footer={this.renderFooter()} />
    );
  },

  renderHeader: function() {
    return (
      <div>Header</div>
    );
  },
  renderBody: function() {
    return (
      <ConsultationForm onSubmit={() => console.log('Submitting Consultation Form.')} />
    );
  },
  renderFooter: function() {
    return (
      <div>Footer</div>
    );
  },

});
