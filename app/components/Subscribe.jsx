import React, {PropTypes} from 'react';
import {Row, Col} from 'react-bootstrap';

import {SkyButton, SkyModal, SubscribeForm} from '../components';

export default React.createClass({
  displayName: 'Subscribe',

  propTypes: {
    show: PropTypes.bool,
    subscribe: PropTypes.any,
    onSubmit: PropTypes.func,
    onClose: PropTypes.func,
  },
  getDefaultProps: function() {
    return {
      show: false,
      subscribe: {},
      onSubmit: function() {},
      onClose: function() {},
    };
  },

  render: function() {
    return (
      <SkyModal
        show={this.props.show}
        header={this.renderHeader()}
        body={
          this.props.subscribe.hasUpdated
            ? this.renderSuccess()
            : this.renderForm()
        }
        footer={this.renderFooter()}
        onClose={this.props.onClose} />
    );
  },
  renderHeader: function() {
    return (
      <h1>Get the latest, directly to your inbox</h1>
    );
  },
  renderFooter: function() {
    const style = {
      fontStyle: 'italic',
      textAlign: 'left'
    };
    return (
      <p style={style}>Skyberry considers your information private and will never share it will other parties. You may unsubscribe at any time.</p>
    );
  },

  renderForm: function() {
    const {isUpdating, formData, error} = this.props.subscribe;

    return (
      <Row>
        <Col xs={12}>
          <p>Receive free marketing tips, design tidbits to bolster your business, freebies and the latest news from Skyberry.</p>
        </Col>
        <Col xs={12} className='mt'>
          <SubscribeForm
            isUpdating={isUpdating}
            formData={formData}
            formErrors={error && error.formErrors}
            onSubmit={this.props.onSubmit}
            onClose={this.props.onClose} />
        </Col>
      </Row>
    );
  },
  renderSuccess: function() {
    return (
      <Row>
        <Col xs={12} className='mb'>
          <h2>Okeydoke!</h2>
          <p>You will occasionally receive news and announcements at <span className='b'>{this.props.subscribe.email}</span>. Thank you for your interest in Skyberry Studio. We love what we do and wouldn't be here without you!</p>
        </Col>
        <Col xs={12}>
          <SkyButton
            size='lg'
            onClick={this.handleClose}
            className='mb-half'>Close</SkyButton>
        </Col>
      </Row>
    );
  },

});





// isActive: function() {
//   return this.props.subscribe.isActive;
// },
// showSubscribe: function() {
//   return this.props.subscribe.showSubscribe;
// },
// getButtonState: function() {
//   return this.props.subscribe.isPosting ? 'disabled' : '';
// },
// render: function() {
//   return (
//     <Modal id='subscribe-modal' ref='modal' show={this.showSubscribe()} backdrop='static'>
//       <Modal.Header>
//         <Row>
//           <Col xs={12}>
//             <h3 className='modal-ttl'>Get the latest, directly to your inbox</h3>
//             <a onClick={this.handleClose} className='modal-close-icon icon'><Icon name='sky-close' /></a>
//           </Col>
//           <Col xs={12}>
//             <p>Receive news and stuff.</p>
//           </Col>
//         </Row>
//       </Modal.Header>
//       <Modal.Body>
//         {this.isActive() ? this.renderForm()
//                          : this.renderSuccess()}
//       </Modal.Body>
//       <Modal.Footer>
//         <Row>
//           <Col xs={12}>
//             <p style={{fontStyle:'italic',textAlign:'left'}}>Skyberry considers your information private and will never share it will other parties.</p>
//           </Col>
//         </Row>
//       </Modal.Footer>
//     </Modal>
//   );
// },
// renderForm: function() {
//   let btnState = this.getButtonState();
//   return (
//     <Formsy.Form onValidSubmit={this.props.postSubscribe}>
//           <SkyInput name="email"
//             value={this.props.email}
//             required
//             validations="isEmail"
//             validationError="A valid email address is required."
//             placeholder='Email Address' />
//       <Row>
//         <div className='col mb-half'>
//           <SkyButton
//             isPrimary
//             size='lg'
//             type='submit'>Subscribe Now</SkyButton>
//         </div>
//         <div className='col mb-half'>
//           <SkyButton
//             size='lg'
//             onClick={this.handleClose}>Maybe Later</SkyButton>
//         </div>
//       </Row>
//     </Formsy.Form>
//   );
// },

// handleClose: function(e) {
//   e.preventDefault();
//   this.props.hideSubscribe();
// },
