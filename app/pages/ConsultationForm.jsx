import React, {PropTypes} from 'react';
import {Row, Col} from 'react-bootstrap';
import formsy from 'formsy-react';

import {SkyButton, SkyInput, SkyTextArea} from '../components';


const phoneRegex =/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
export default React.createClass({
  displayName: 'ConsultationForm',

  propTypes: {
    errors: PropTypes.any,
  },
  getDefaultProps: function() {
    return {
      errors: {},
    };
  },

  getInitialState: function() {
    return {
      name: this.props.name || '', // intial seed only
      email: this.props.email || '',
      phone: this.props.phone || '',
      summary: this.props.summary || '',
      showEmail: true,
      showPhone: false,
      showBoth: false,
    };
  },

  componentWillReceiveProps: function(nextProps) {
    if(nextProps.errors && nextProps.errors.formErrors) {
      this.refs.form.updateInputsWithError(nextProps.errors.formErrors);
    }
  },

  render: function() {
    return (
      <formsy.Form onValidSubmit={this.props.onSubmit} ref='form'>
        <SkyTextArea
          name='summary'
          label='Project summary'
          value={this.state.summary}
          required
          validationMessage='Project summary is required.'
          placeholder='tell us about your project...'
          onChange={this.setSummary} />
        <div className='form-group'>
          <div>
            <label>How would you prefer to communicate?</label>
          </div>
          <div>
            <label forHtml='preferEmail' className='radio-inline'><input type='radio' name='preferEmail' checked={this.state.showEmail} onChange={this.showEmail} /> email</label>
            <label forHtml='preferPhone' className='radio-inline'><input type='radio' name='preferPhone' checked={this.state.showPhone} onChange={this.showPhone} /> phone</label>
            <label forHtml='noPreference' className='radio-inline'><input type='radio' name='noPreference' checked={this.state.showBoth} onChange={this.showBoth} /> no preference</label>
          </div>
        </div>
        {(this.state.showEmail || this.state.showBoth) && this.renderEmail()}
        {(this.state.showPhone || this.state.showBoth) && this.renderPhone()}

        <div className='form-group'>
          <SkyButton
            isPrimary
            type='submit'
            size='lg'>Request Free Consultation</SkyButton>
        </div>
      </formsy.Form>
    );
  },

  renderEmail: function() {
    return (
      <SkyInput
        name='email'
        label='Email address'
        required
        validations={{
          isEmail: true,
        }}
        validationErrors={{
          isEmail: 'A valid email is required.',
        }}
        placeholder='you@domain.com'
        value={this.state.email}
        onChange={this.setEmail} />
    );
  },
  renderPhone: function() {
    return (
      <Row>
        <Col sm={6}>
          <SkyInput
            name='phone'
            label='Phone number'
            required
            validations={{
              isPhone: function(values, value) {
                if(value === null && value.length === 0) return false;
                return value.match(phoneRegex);
              }
            }}
            validationErrors={{
              isPhone: 'A 10 digit phone number is required.',
            }}
            placeholder='###-###-####'
            value={this.state.phone}
            onChange={this.setPhone} />
        </Col>
        <Col sm={6}>
          <SkyInput
            name='name'
            label='Who should we talk to?'
            required
            placeholder='name'
            value={this.state.name} />
        </Col>
      </Row>
    );
  },

  showEmail: function(e) {
    this.setState({
      showEmail: true,
      showPhone: false,
      showBoth: false,
    });
  },
  showPhone: function(e) {
    this.setState({
      showEmail: false,
      showPhone: true,
      showBoth: false,
    });
  },
  showBoth: function(e) {
    this.setState({
      showEmail: false,
      showPhone: false,
      showBoth: true,
    });
  },
  setSummary: function(event) {
    this.setState({
      summary: event.target.value,
    });
  },
  setEmail: function(event) {
    this.setState({
      email: event.target.value,
    });
  },
  setPhone: function(event) {
    this.setState({
      phone: event.target.value,
    });
  },

});
