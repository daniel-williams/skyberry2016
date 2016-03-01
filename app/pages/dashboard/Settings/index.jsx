import React, {PropTypes} from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import formsy from 'formsy-react';

import {SkyButton, SkyInput} from '../../../components';
import ChangeEmail from './ChangeEmail';
import ChangePassword from './ChangePassword';
import ChangeUsername from './ChangeUsername';

import './Settings.less';


export default React.createClass({
  dispayName: 'Settings',

  getFullName: function() {
    return this.props.user && [this.props.user.firstName || '', ' ', this.props.user.lastName || ''].join('').trim();
  },

  getUsername: function() {
    return this.props.user && this.props.user.username;
  },
  getName: function() {
    return this.getFullName() || this.getUserName;
  },
  getEmail: function() {
    return this.props.user && this.props.user.email || 'no email address on record...';
  },

  render: function() {
    const settings = this.props.settings;
    return (
      <Grid fluid={true} id='settings'>
        <Row>
          <Col xs={12}>
            <h1><span>Settings</span><span className='accent'> for </span><span className='nowrap'>{this.getName()}</span></h1>
          </Col>
        </Row>
        <Row className='mv'>
          <Col sm={4} xs={12} className='mv'>
            <div className='updatable'>
              <div className='ttl'><h2>Email</h2></div>
              <div className='current'>{this.getEmail()}</div>
              <div className='actions'>
                <SkyButton
                  size='lg'
                  onClick={this.handleChangeEmail}>Change Email</SkyButton>
              </div>
            </div>
          </Col>
          <Col sm={4} xs={12} className='mv'>
            <div className='updatable'>
              <div className='ttl'><h2>Password</h2></div>
              <div className='current'>********</div>
              <div className='actions'>
                <SkyButton
                size='lg'
                onClick={this.handleChangePassword}>Change Password</SkyButton>
              </div>
            </div>
          </Col>
          <Col sm={4} xs={12} className='mv'>
            <div className='updatable'>
              <div className='ttl'><h2>Username</h2></div>
              <div className='current'>{this.getUsername()}</div>
              <div className='actions'>
                <SkyButton
                  size='lg'
                  onClick={this.handleChangeUsername}>Change Username</SkyButton>
              </div>
            </div>
          </Col>
        </Row>
        <ChangeEmail
          isVisible={settings.settings.showChangeEmail}
          isUpdating={settings.email.isUpdating}
          hasUpdated={settings.email.hasUpdated}
          current={this.getEmail()}
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
         current={this.getUsername()}
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
