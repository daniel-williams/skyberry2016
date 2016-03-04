import React, {PropTypes} from 'react';
import {Row, Col} from 'react-bootstrap';

import {SkyButton, SkyModal} from '../components';
import ConsultationForm from './ConsultationForm';


export default React.createClass({
  displayName: 'Consultation',

  propTypes: {
    consultation: PropTypes.any,
    show: PropTypes.bool,
    onClose: PropTypes.func,
    onSubmit: PropTypes.func,
    onReset: PropTypes.func,
  },
  getDefaultProps: function() {
    return {
      consultation: {},
      show: false,
      onClose: function() {},
      onSubmit: function() {},
      onReset: function() {},
    };
  },

  render: function() {
    return (
      <SkyModal
        show={this.props.show}
        header={this.renderHeader()}
        body={
          this.props.consultation.hasPosted
          ? this.renderThankYou()
          : this.renderConsultationForm()
        }
        onClose={this.props.onClose} />
    );
  },

  renderHeader: function() {
    return (
      <div>
        <h1>Free Consultation Request Form</h1>
      </div>
    );
  },
  renderConsultationForm: function() {
    return (
      <div>
        <p className='mb'>Please tell us about your project and how we should contact you.</p>
        <ConsultationForm
          {...this.props.consultation.formData}
          errors = {this.props.consultation.error}
          onSubmit={this.props.onSubmit} />
      </div>
    );
  },
  renderThankYou: function() {
    return (
      <div>
        <h2>Super Fantastic!</h2>
        <p>Skyberry has received your request and will get back to you shortly!</p>
        <div className='mt'>
          Have <a onClick={this.props.onReset}>more to say</a>?
        </div>
      </div>
    )
  }


});
