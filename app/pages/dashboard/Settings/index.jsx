import React, {PropTypes} from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import formsy from 'formsy-react';

import {SkyInput} from '../../../components';
import ChangeEmail from './ChangeEmail';
import ChangePassword from './ChangePassword';
import ChangeUsername from './ChangeUsername';


export default React.createClass({
  dispayName: 'Settings',

  getFullName: function() {
    return this.props.user && [this.props.user.firstName || '', ' ', this.props.user.lastName || ''].join('').trim();
  },

  getUserName: function() {
    return this.props.user && this.props.user.username;
  },
  getName: function() {
    return this.getFullName() || this.getUserName;
  },
  getEmail: function() {
    return this.props.user && this.props.user.email || '';
  },

  render: function() {
    const settings = this.props.settings;
    return (
      <Grid fluid={true}>
        <Row>
          <Col xs={12}>
            <h1><span>Settings</span><span className='accent'> for </span><span className='nowrap'>{this.getName()}</span></h1>
          </Col>
          <Col xs={12}>
            <button className='btn btn-lg btn-default' onClick={this.handleChangeEmail}>Change Email</button>
          </Col>
          <Col xs={12}>
            <button className='btn btn-lg btn-default' onClick={this.handleChangePassword}>Change Password</button>
          </Col>
          <Col xs={12}>
            <button className='btn btn-lg btn-default' onClick={this.handleChangeUsername}>Change Username</button>
          </Col>
        </Row>
        <ChangeEmail
          isVisible={settings.settings.showChangeEmail}
          isUpdating={settings.email.isUpdating}
          hasUpdated={settings.email.hasUpdated}
          data={settings.email.data}
          errors={settings.email.error}
          onSubmit={this.props.updateEmail}
          onClose={this.props.hideChangeEmail}
         />
        <ChangePassword
          isVisible={settings.settings.showChangePassword}
          isUpdating={settings.password.isUpdating}
          hasUpdated={settings.password.hasUpdated}
          data={settings.password.data}
          errors={settings.password.error}
          onSubmit={this.props.updatePassword}
          onClose={this.props.hideChangePassword}
         />
       <ChangeUsername
         isVisible={settings.settings.showChangeUsername}
         isUpdating={settings.username.isUpdating}
         hasUpdated={settings.username.hasUpdated}
         data={settings.username.data}
         errors={settings.username.error}
         onSubmit={this.props.updateUsername}
         onClose={this.props.hideChangeUsername}
        />
      </Grid>
    );
  },


  handleChangeEmail: function() {
    this.props.resetChangeEmail();
    this.props.showChangeEmail();
  },
  handleChangePassword: function() {
    this.props.resetChangePassword();
    this.props.showChangePassword();
  },
  handleChangeUsername: function() {
    this.props.resetChangeUsername();
    this.props.showChangeUsername();
  },

});