import React, {PropTypes} from 'react';
import {Modal, Grid, Row, Col} from 'react-bootstrap';

import {SkyButton, Icon} from '../';
import './SkyModal.less';

export default React.createClass({
  displayName: 'SkyModal',

  propTypes: {
    show: PropTypes.bool,
    header: PropTypes.element,
    body: PropTypes.element,
    footer: PropTypes.element,
    onClose: PropTypes.func,
  },
  getDefaultProps: function() {
    return {
      show: false,
      header: null,
      body: null,
      footer: null,
      onClose: function() {},
    };
  },

  render: function() {
    return (
      <Modal ref='modal' show={this.props.show} backdrop='static'>
        <Modal.Header>
          <div className='sky-modal-header'>
            {this.props.header}
            <div className='sky-modal-close'>
              {this.renderClose()}
            </div>
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className='sky-modal-body'>
            {this.props.body}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className='sky-modal-footer'>
            {this.props.footer}
            <div className='sky-modal-close'>
              {this.renderClose()}
            </div>
          </div>
        </Modal.Footer>
      </Modal>
    );
  },

  renderClose: function() {
    return (
      <SkyButton
        onClick={this.props.onClose}>Close</SkyButton>
    );
  },

  // handleClose: function(e) {
  //   e.preventDefault();
  //   this.props.onClose();
  // },

});
