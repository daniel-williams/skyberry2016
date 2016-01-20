import React, {PropTypes} from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import formsy from 'formsy-react';

import constants from '../constants';
import {CoverBillboard, ModalBox, SignInForm} from '../components';


export default React.createClass({
  displayName: 'SignIn',

  componentWillMount: function() {
    this.forwardOnAuth(this.props);
  },
  componentWillReceiveProps: function(nextProps) {
    this.forwardOnAuth(nextProps);
  },
  forwardOnAuth: function(props) {
    if(props.identity.isAuthenticated === true) {
        this.props.history.pushState(null, props.identity.nextUrl || '/dashboard');
        this.props.clearNextUrl();
    }
  },
  render: function() {
    return (
      <CoverBillboard imgSrc={constants.routes.images + 'jumbo4.jpg'}>
        <ModalBox headline='Client Sign In' overlay={true}>
          <SignInForm {...this.props}/>
        </ModalBox>
      </CoverBillboard>
    );
  },

});
