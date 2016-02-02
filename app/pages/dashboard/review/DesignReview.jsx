import React, {PropTypes} from 'react';
import {Modal, Row, Col} from 'react-bootstrap';
import classnames from 'classnames';

import ReviewCommon from './ReviewCommon';


export default React.createClass({
  displayName: 'DesignReview',

  mixins: [ReviewCommon],



  componentWillMount: function() {
    // this.buildState(this.props);
  },
  componentWillReceiveProps: function(nextProps) {
    // this.buildState(nextProps);
  },
  getProjectName: function() {
    return this.props.project ? this.props.project.name : ''
  },
  render: function() {
    return (
      <Modal id='review-modal' ref='modal' show={this.show()} backdrop='static'>
        <Modal.Header>
          <Col>
            <h1>Design Review<span className='accent'> for </span><span className='nowrap'>{this.getProjectName()}</span></h1>
            {this.renderStatusText()}
          </Col>
          <Col className='pull-right'>
            <button className='btn btn-default' onClick={this.handleClose}>Close</button>
          </Col>
        </Modal.Header>
        <Modal.Body>

        </Modal.Body>
        <Modal.Footer>
          <Col className='pull-right'>
            <button className='btn btn-default' onClick={this.handleClose}>Close</button>
          </Col>
        </Modal.Footer>
      </Modal>
    );
  },

  // {this.renderDirections()}
  // {this.renderNotes()}
  // {this.renderProofs()}
  // {this.renderOptions()}
  // {this.renderOptionTitle()}
  // {this.renderActionButtons()}
  // {this.renderCommentForm()}

  renderStatusText: function(status) {
    return 'TODO: project status';
    // var text = null;
    // switch(status) {
    //   case Status.FEEDBACK: {
    //     text = 'Awaiting feedback.';
    //     break;
    //   }
    //   case Status.REQUEST: {
    //     text = 'Awaiting next step.';
    //     break;
    //   }
    //   case Status.APPROVAL: {
    //     text = 'Awaiting project approval.';
    //     break;
    //   }
    //   case Status.PENDING: {
    //     text = 'Review complete. Awaiting Skyberry Studio.';
    //     break;
    //   }
    //   case Status.COMPLETED: {
    //     text = 'Review complete.';
    //     break;
    //   }
    //   default:
    // }
    //
    // var status = null;
    // if(text) {
    //   status = (
    //     <div>STATUS: {text}</div>
    //   );
    // }
    //
    // return status;
  },

  // renderDirections: function() {
  //   var renderStepBlock = this.renderStepBlock;
  //   var stepData = this.getStepData();
  //   // if(reset) {
  //   stepData = stepData.map(this.resetStatus);
  //   // reset = false;
  //   // }
  //
  //   var stepUi = stepData.map(renderStepBlock);
  //
  //   return (
  //     <Row id='directions'>
  //       <Col xs={12}>
  //         <h2>Directions</h2>
  //       </Col>
  //       <Col xs={12} className='mt-half'>
  //         {stepUi}
  //       </Col>
  //     </Row>
  //   );
  // },
  //
  // renderStepBlock: function(step, i) {
  //   if(step.hidden) { return null; }
  //
  //   var statusNames = classnames('stack', {
  //     'no-prompt': !step.showStatus,
  //   });
  //
  //   var stepTitle = (
  //     <h3 className={statusNames}>
  //       {this.renderStatusBox(step.status)}
  //       {step.title}
  //     </h3>
  //   );
  //
  //   return (
  //     <div className='step' key={i}>
  //       <div className='details'>
  //         <TitleDrawer title={stepTitle} open={step.open} toggle={true}>
  //         {step.renderBody()}
  //         </TitleDrawer>
  //       </div>
  //     </div>
  //   );
  // },
  //
  //
  //
  //
  // stepReview: function() {
  //   return 'Review the designers\' notes ' + (this.state.hasProofs ? ', proofs' : '') + ' and design options, located below.';
  // },
  //
  // stepFeedback: function() {
  //   var txt = '';
  //   if(this.state.hasOptions) {
  //     txt = 'Indicate which design option you would like to proceed with by using the controls below. ';
  //   }
  //   txt = txt + 'Leave feedback, special directions, or anything else you\'d like to communicate, using comments.';
  //
  //   return (
  //     <div>
  //       <div>{txt}</div>
  //       <div>{this.stepFeedbackSummary()}</div>
  //     </div>
  //   );
  // },
  // renderFeedbackTitle: function() {
  //   var title = this.state.hasSelected ? this.getSelectedOptTitle()
  //                                      : <i className='glyphicon glyphicon-alert invalid' />;
  //   var cancel = null;
  //   if(this.state.hasSelected && (!this.state.isAccepted || !this.state.hasApproval)) {
  //     cancel = (
  //       <span className='mb-half' style={{marginLeft:'15px'}}>
  //       <button className='btn btn-default' onClick={this.handleClearSelected}>Clear</button>
  //       </span>
  //     );
  //   }
  //
  //   return (
  //     <div className='sel-opt mt-half' ref='selectedOption'>
  //       <span className='lbl'>Selected Option:</span>
  //       <span className='val'>{title}</span>
  //       {cancel}
  //     </div>
  //   );
  // },
  // stepFeedbackSummary: function() {
  //   var title = this.state.hasSelected ? this.getSelectedOptTitle()
  //                                      : <i className='glyphicon glyphicon-alert invalid' />;
  //   var cancel = null;
  //   if(this.state.hasSelected && !this.state.isAccepted && !this.state.hasApproval) {
  //     cancel = (
  //       <span className='mb-half' style={{marginLeft:'15px'}}>
  //         <button className='btn btn-default' onClick={this.handleClearSelected}>Clear</button>
  //       </span>
  //     );
  //   }
  //
  //   return (
  //     <div className='sel-opt mt-half' ref='selectedOption'>
  //       <span className='lbl'>Selected Option:</span>
  //       <span className='val'>{title}</span>
  //       {cancel}
  //     </div>
  //   );
  // },
  //
  // stepNext: function() {
  //   var text = (
  //     <div>
  //       <p>Let us know if you need a Revision or final Deliverables. Request a Revision when you need additional changes. Request Deliverables when no changes are needed and you are ready to take ownership of production files.</p>
  //     </div>
  //   );
  //   var ui = this.state.hasRequest ? null : this.nextButtons();
  //   var summary = this.state.hasRequest ? this.nextSummary() : null;
  //
  //   return (
  //     <div>
  //       {text}
  //       {ui}
  //       {summary}
  //     </div>
  //   );
  // },
  // nextSummary: function() {
  //   var title = this.state.hasRequest ? this.state.rev.requestType === 1 ? 'Revision'
  //                                                                        : 'Deliverables'
  //                                     : this.renderIcon('alert invalid');
  //   var cancel = null;
  //   if(this.state.rev.requestDate && !this.state.rev.acceptedDate && (this.state.rev.requestType === 1 || (this.state.rev.requestType === 2 && !this.state.rev.approvedDate))) {
  //     cancel = (
  //       <span className='mb-half' style={{marginLeft:'15px'}}>
  //         <button className='btn btn-default' onClick={this.handleClearRequest}>Cancel Request</button>
  //       </span>
  //     );
  //   };
  //
  //   return (
  //     <div className='sel-opt mv' ref='selectedOption'>
  //       <span className='lbl mb-half'>Requested Next Step:</span>
  //       <span className='val mb-half'>{title}</span>
  //       {cancel}
  //     </div>
  //   );
  // },
  // nextButtons: function() {
  //   var isDisabled = this.state.hasOptions && !this.state.selectedId;
  //   var btnType = 'btn btn-lg mb-half ' + (isDisabled ? 'btn-default' : 'btn-sky');
  //
  //   return (
  //     <div>
  //       <Row className='request-buttons mt'>
  //         <Col>
  //           <button type='button' className={btnType} onClick={this.handleRequestRevision} disabled={isDisabled}>Revision<br /><i className='glyphicon glyphicon-repeat' /></button>
  //         </Col>
  //         <Col>
  //           <button type='button' className={btnType} onClick={this.handleRequestDeliverables} disabled={isDisabled}>Deliverables<br /><i className='glyphicon glyphicon-export' /></button>
  //         </Col>
  //       </Row>
  //     </div>
  //   );
  // },
  //
  // stepApproval: function() {
  //   var isDisabled = !this.state.hasRequest || this.state.requestType !== 2;
  //   var btnType = 'btn btn-lg mb-half ' + (isDisabled ? 'btn-default' : 'btn-sky');
  //
  //   var text = (
  //     <div className='mt'>
  //       <p>Before final deliverables are produced, the project requires final approval. Project Approval indicates no further edits are necessary or expected. Changes requested after final deliverables are produced may result in additional charges.</p>
  //     </div>
  //   );
  //   var ui = this.state.hasApproval ? null : (
  //     <div className='mt'>
  //       <button className={btnType} onClick={this.handleShowApproval} disabled={isDisabled}>Approve Project<br /><i className='glyphicon glyphicon-thumbs-up' /></button>
  //     </div>
  //   );
  //   var summary = !this.state.hasApproval ? null : (
  //     <div className='mt'>
  //       {this.approvalSummary()}
  //     </div>
  //   );
  //
  //   return (
  //     <div>
  //       {text}
  //       {ui}
  //       {summary}
  //     </div>
  //   );
  // },
  // approvalSummary: function() {
  //   var digiSig = this.renderSignature();
  //   if(!digiSig) {
  //     digiSig = this.renderIcon('alert invalid');
  //   }
  //
  //   return (
  //     <div className='sel-opt mt-half' ref='selectedOption'>
  //       <span className='lbl'>Approved By:</span>
  //       <span className='val'>{digiSig}</span>
  //       <button className='btn btn-default' onClick={this.handleShowApproval} style={{marginLeft:'15px'}}>View</button>
  //     </div>
  //   );
  // },
  //
  // renderAwaitingSkyberry: function() {
  //   return (
  //     <div>Skyberry Studio has been notified that you have completed this design review and are ready to proceed.</div>
  //   );
  // },
  //
  // renderNotes: function() {
  //   if(!this.state.rev.description || !this.state.rev.description.length) {
  //     return null;
  //   }
  //
  //   return (
  //     <Row className='mt-dbl'>
  //       <Col xs={12}><h2>Notes from the designer</h2></Col>
  //       <Col xs={12}><div dangerouslySetInnerHTML={{__html: this.state.rev.description}}></div></Col>
  //     </Row>
  //   );
  // },
  // renderProofs: function() {
  //   var proofs = null;
  //   if(this.state.hasProofs) {
  //     var links = this.state.proofs.map(function(item, x) {
  //       return (
  //         <Col xs={12}>
  //           <a href='#'>{item.filenameOriginal}</a>
  //         </Col>
  //       );
  //     });
  //     proofs = (
  //       <Row className='mt-dbl'>
  //         <Col xs={12}><h2>Proofs</h2></Col>
  //         {links}
  //       </Row>
  //     );
  //   }
  //
  //   return proofs;
  // },
  // renderOptions: function() {
  //   if(this.state.options.length <= 1) {
  //     return null;
  //   }
  //   var items = this.state.options.map(item => {
  //     var id = item.id;
  //     var cssnames = classnames({
  //       item: true,
  //       selected: this.isSelectedOptId(id),
  //       viewing: this.isCurrentOptId(id),
  //     });
  //     return (
  //       <div key={id} data-key={id} className={cssnames} onClick={this.handleViewOption}>
  //         <div>
  //           {item.title}
  //         </div>
  //       </div>
  //     );
  //   });
  //
  //   return (
  //     <div className='mt-dbl mb'>
  //       <h2>Design Options</h2>
  //       <div className='options clearfix'>
  //         {items}
  //       </div>
  //     </div>
  //   );
  // },
  // renderOptionTitle: function() {
  //   return (
  //     <Row className='mv-half'>
  //       <Col xs={12}>
  //         <div><h3>{this.state.option.title}</h3></div>
  //         <div dangerouslySetInnerHTML={{__html: this.state.option.description}} />
  //       </Col>
  //     </Row>
  //   );
  // },
  // renderActionButtons: function() {
  //   var btn;
  //   var commentLabel = this.props.showComments ? 'Hide Comments' : 'Show Comments';
  //   var isDisabled = this.state.hasRequest;
  //   var tip = this.state.isAccepted ? 'This Design Review is locked.' : this.state.hasRequest ? 'Request pending! Edits are not allowed.' : '';
  //
  //   if(this.state.rev.selectedId === this.state.oId) {
  //     btn = (
  //       <button className='btn btn-default' type='button' onClick={this.handleClearSelected} disabled={isDisabled} title={tip}>Unselect Option</button>
  //     );
  //   } else if(this.state.options.length > 1) {
  //     btn = (
  //       <button className='btn btn-sky' type='button' onClick={this.handleSelectOption} data-key={this.state.oId} disabled={isDisabled} title={tip}>Select Option</button>
  //     );
  //   }
  //   return (
  //     <Row className='action-buttons'>
  //       <Col xs={12}>
  //         {btn}
  //         <button className='btn btn-default' type='button' onClick={this.props.toggleReviewComments}>{commentLabel}</button>
  //       </Col>
  //     </Row>
  //   );
  // },
  // renderCommentForm: function() {
  //   var isDisabled = this.state.hasRequest;
  //   var tip = this.state.isAccepted ? 'This Design Review is locked.' : this.state.hasRequest ? 'Request pending! Edits are not allowed.' : '';
  //
  //   var cssnames = classnames({
  //     'option-controls': true,
  //     open: this.props.showComments,
  //     selected: this.state.rev.selectedId === this.state.oId,
  //   });
  //   return (
  //     <div className={cssnames}>
  //       <div className='opt-img mb center'>
  //         <ImageLoader src={AppConstants.routes.files + this.state.option.filename} className='img-responsive' />
  //       </div>
  //       <div className='comment-wrap mb'>
  //         <Row style={{paddingLeft:'15px'}}>
  //           <Col xs={12}>
  //             <textarea ref='commentText' placeholder='whatdaya think?' className='form-control' disabled={isDisabled} title={tip} />
  //           </Col>
  //           <Col xs={12} className='mv-half right'>
  //             <button className='btn btn-sm btn-default' onClick={this.handleAddComment} disabled={isDisabled} title={tip}>Add Comment</button>
  //           </Col>
  //           <Col xs={12}>
  //             <label>Comments</label>
  //           </Col>
  //           <Col xs={12}>
  //             {this.renderComments()}
  //           </Col>
  //         </Row>
  //       </div>
  //     </div>
  //   );
  // },
  // renderComments: function() {
  //   var items = this.state.comments.filter((item, i) => {
  //     return item.oId === this.state.oId;
  //   });
  //   items = items.map(function(item, i) {
  //     return (
  //       <Col key={i} xs={12}>
  //         <div className='item'>
  //           <span style={{fontStyle:'italic', marginRight:'10px'}}>{item.uName}:</span>
  //           {item.comment}
  //         </div>
  //       </Col>
  //     );
  //   });
  //   if(!items || !items.length) {
  //     items = (
  //       <Col xs={12}>
  //         <div className='item'>none yet...</div>
  //       </Col>
  //     );
  //   }
  //
  //   return (
  //     <Row id='comments'>
  //       {items}
  //     </Row>
  //   );
  // },




  // handlers
  show: function() {
    return true;
  },
  handleClose: function() {
    this.props.history.pushState(null, '/dashboard/projects/' + this.props.accountSlug + '/' + this.props.project.slug);
  },


  // handleViewOption: function(e) {
  //   var target = e.currentTarget;
  //   var oId = target.getAttribute('data-key');
  //   var option = this.getOption(oId);
  //   this.setState({
  //     option: option,
  //     oId: oId,
  //   });
  // },
  // handleSelectOption: function(e) {
  //   var target = e.currentTarget;
  //   ReviewActions.selectOption(this.state.rev.id, target.getAttribute('data-key'));
  // },
  // handleClearSelected: function(e) {
  //   ReviewActions.clearSelected(this.state.rev.id);
  // },
  // handleAddComment: function(e) {
  //   var tgt = ReactDom.findDOMNode(this.refs.commentText);
  //   var tgtValue = tgt.value;
  //   if(!tgtValue) {
  //     return;
  //   }
  //
  //   var rId = this.state.rev.id;
  //   var oId = this.state.option.id;
  //   var user = this.props.user;
  //   var comment = {
  //     rId: rId,
  //     oId: oId,
  //     comment: tgtValue,
  //   };
  //   ReviewActions.addComment(rId, comment);
  //
  //   //c.uId = user.id;
  //   //c.uName = user.login;
  //   //this.getComments().unshift(c);
  //   tgt.value = '';
  // },
  //
  // handleRequestRevision: function(e) {
  //   ReviewActions.requestRevision(this.state.rev.id);
  // },
  // handleRequestDeliverables: function(e) {
  //   ReviewActions.requestDeliverables(this.state.rev.id);
  // },
  // handleClearRequest: function(e) {
  //   ReviewActions.clearRequest(this.state.rev.id);
  // },
  // handleShowApproval: function() {
  //   ReviewActions.showApprovalForm(this.state.rev.id);
  // },


});
