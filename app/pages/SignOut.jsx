import React, {PropTypes} from 'react';

import constants from '../constants';
import {CoverBillboard, ModalBox, SkyButton} from '../components';


export default React.createClass({
  displayName: 'SignOut',

  isAuthenticated: function() {
    return this.props.isAuthenticated === true;
  },
  render: function() {
    return (
      <div id='sign-out'>
        <CoverBillboard imgSrc={constants.routes.images + 'jumbo4.jpg'}>
          {this.isAuthenticated() ? this.renderConfirm() : this.renderGoodbye()}
        </CoverBillboard>
      </div>
    );
  },

  renderConfirm: function() {
    return (
      <ModalBox headline='Client Sign Out'>
        <SkyButton
          isPrimary
          onClick={this.props.logOff}>Sign Out</SkyButton>
      </ModalBox>
    );
  },
  renderGoodbye: function() {
    return (
      <ModalBox headline='Goodbye'>
        <p>Thank you for using the Skyberry Dashboard.</p>
      </ModalBox>
    );
  },

});
