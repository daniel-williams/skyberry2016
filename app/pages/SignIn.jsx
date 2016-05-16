import React, {PropTypes} from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import formsy from 'formsy-react';
import Helmet from 'react-helmet';

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
        this.props.history.pushState(null, props.identity.next || '/dashboard/projects');
        this.props.clearNext();
    }
  },
  render: function() {
    const {isUpdating, formData, error} = this.props.identity;

    return (
      <CoverBillboard imgSrc={constants.routes.images + 'jumbo4.jpg'} overlayOpacity={30}>
        <Helmet
          title='Skyberry Studio Client Sign In'
          meta={[{
            'name': 'description',
            'content': 'Skyberry is an award winning print, graphic and web design studio located in Bothell Washington.'
          }]}
        />
        <ModalBox headline='Client Sign In' overlay={true}>
          <SignInForm
            isUpdating={isUpdating}
            formData={formData}
            formErrors={error && error.formErrors}
            onSubmit={this.props.logOn} />
        </ModalBox>
      </CoverBillboard>
    );
  },

});
