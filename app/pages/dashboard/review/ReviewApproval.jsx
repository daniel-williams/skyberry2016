import React, {PropTypes} from 'react';
import {Modal, Row, Col} from 'react-bootstrap';
import classnames from 'classnames';

import ReviewShared from './ReviewShared';
import './ReviewApproval.less';


export default React.createClass({
  displayName: 'ReviewApproval',

  // shared by ReviewFeedback & ReviewApproval
  mixins: [ReviewShared],

  getReviewSlug: function() {
    return this.props.account.slug + '/' + this.props.project.slug + '/' + this.props.review.slug;
  },
  getReviewTitle: function() {
    return this.props.review && this.props.review.title;
  },

  isApproved: function() {
    return this.props.review.approvedDate != null;
  },

  render: function() {
    return (
      <Modal id='review-feedback' ref='modal' show={this.props.showApproval} backdrop='static'>
        <Modal.Header>
          <Row>
            <div className='col'>
              <h1>Project Approval<span className='accent'> for </span><span className='nowrap'>{this.getProjectName()}</span></h1>
              <h3>{this.getReviewTitle()}</h3>
            </div>
            {this.renderClose()}
          </Row>
        </Modal.Header>
        <Modal.Body>
          <div id='approval-form'>
            {this.renderClientInfo()}
            {this.renderTerms()}
            {this.renderSpelling()}
            {this.renderDeliverables()}
            {this.renderSignatureLine()}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Row>
            {this.renderClose()}
          </Row>
        </Modal.Footer>
      </Modal>
    );
  },
  renderClientInfo: function() {
    let now = new Date();
    let dt = '' + (now.getMonth() + 1) + '/' + now.getDate() + '/' + now.getFullYear();
    let info = {
      project: this.props.project.name,
      date: dt,
      contact: this.props.user.firstName + ' ' + this.props.user.lastName,
      account: this.props.account.name,
    };

    return (
      <Row className='info'>
        <Col xs={12}>
          <div className='lookup'>
            {this.renderObjAsRows(info)}
          </div>
        </Col>
      </Row>
    );
  },
  renderTerms: function() {
    let info = {
      client: this.props.account.name,
      project: this.props.project.name,
      contract: 'This Project Approval form',
    };

    return (
      <Row className='sec mt-dbl terms'>
        <Col xs={12}>
          <label>1. Definition of terms</label>
          <div className='lookup'>
            {this.renderObjAsRows(info)}
          </div>
        </Col>
      </Row>
    );
  },
  renderSpelling: function() {
    return (
      <Row className='sec mt-dbl'>
        <Col xs={12}>
          <label>2. Spelling and Grammer</label>
          <div>
            <span className='term'>Client</span> agrees that all spelling and grammar is correct. Skyberry Studio is at no time responsible for spelling or grammar errors and <span className='term'>Client</span> will hold harmless Skyberry Studio for any loss of funds or claims resulting from spelling, grammar errors and/or reprints.
          </div>
        </Col>
      </Row>
    );
  },
  renderDeliverables: function() {
    return (
      <Row className='sec mt-dbl'>
        <Col xs={12}>
          <label>3. Final Deliverables</label>
          <p>By signing this <span className='term'>contract</span>, <span className='term'>client</span> agrees that they have reviewed and approved the <span className='term'>PROJECT</span> Design Review and Proofs (if applicable) and that <span className='term'>client</span> considers the <span className='term'>project</span> finished; meaning <span className='term'>client</span> requires no further edits and is requesting final deliverables.</p>
          <p className='mt'>The undersigned agrees to the terms of this <span className='term'>contract</span> on behalf of themselves and their organization or business.</p>
        </Col>
      </Row>
    );
  },

  renderSignatureLine: function() {
    let name = this.props.user.firstName + ' ' + this.props.user.lastName;
    let digiSig = this.isApproved()
      ? this.renderSignature()
      : <button className='btn btn-sky' onClick={() => this.props.reviewApproveProject(this.getReviewSlug())}>I Agree & Approve</button>;

    return (
      <div className='mt-dbl'>
        <div className='form-group'>
          <label className='control-label'>Full Name (Please Print)</label>
          <input type='text' value={name} className='form-control uc' readOnly='readOnly' />
        </div>
        <div className='form-group'>
          <div className='sel-opt mt-half' ref='selectedOption'>
            <label className='control-label'>Digital Signature:</label>
            <span className='val'>{digiSig}</span>
          </div>
        </div>
      </div>
    );
  },
  renderSignature: function() {
    if(!this.isApproved()) {
      return null;
    }

    var name = this.props.review.approvedByName;
    var dt = typeof this.props.review.approvedDate === 'string'
      ? new Date(this.props.review.approvedDate)
      : this.props.review.approvedDate;
    var digiSig = name + ', ' + (dt.getMonth() + 1) + '/' + dt.getDate() + '/' + dt.getFullYear() + ', ' + dt.getHours() + ':' + dt.getMinutes() + ':' + dt.getSeconds();

    return (
      <span className='signature'>{digiSig}</span>
    );
  },




  // handlers
  close: function() {
    this.props.reviewHideApproval();
  },

});
