import React, {PropTypes} from 'react';
import {Modal, Row, Col} from 'react-bootstrap';
import classnames from 'classnames';


export const Status = {
  FEEDBACK: 'FEEDBACK',
  REQUEST: 'REQUEST',
  APPROVAL: 'APPROVAL',
  PENDING: 'PENDING',
  COMPLETED: 'COMPLETED',
};
export const StepStatus = {
  TODO: 'TODO',
  ACTIVE: 'ACTIVE',
  COMPLETED: 'COMPLETED',
};


export default {
  getStepData: function() {
    var self = this;
    var rev = self.state.rev;
    var steps = [{
        title: 'Review',
        open: true,
        toggle: true,
        hidden: false,
        showStatus: true,
        renderBody: self.stepReview,
        setStatus: function() {
            this.status = StepStatus.COMPLETED;
            this.open = false; // default toggle state
        },
    },
    {
        title: 'Feedback',
        open: true,
        toggle: true,
        hidden: false,
        showStatus: true,
        renderTitle: self.renderFeedbackTitle,
        renderBody: self.stepFeedback,
        setStatus: function() {
            this.status = (!self.state.hasOptions || self.state.hasSelected) ? StepStatus.COMPLETED : StepStatus.ACTIVE;
            this.open = this.status === StepStatus.ACTIVE;
        },
    },
    {
        title: 'Next Step',
        open: true,
        toggle: true,
        hidden: false,
        showStatus: true,
        renderBody: this.stepNext,
        setStatus: function() {
            this.status = self.state.hasRequest ? StepStatus.COMPLETED : (!self.state.hasOptions || self.state.hasSelected) ? StepStatus.ACTIVE : StepStatus.TODO;
            this.open = this.status === StepStatus.ACTIVE;
        },
    },
    {
        title: 'Project Approval',
        open: true,
        toggle: true,
        hidden: false,
        showStatus: true,
        renderBody: self.stepApproval,
        setStatus: function() {
            this.status = self.state.hasApproval ? StepStatus.COMPLETED : (self.state.hasRequest && self.state.requestType === 2) ? StepStatus.ACTIVE : StepStatus.TODO;
            this.open = this.status === StepStatus.ACTIVE;
            this.hidden = self.state.requestType !== 2;
        },
    },
    {
        title: 'Awaiting Skyberry',
        open: true,
        toggle: true,
        hidden: false,
        showStatus: false,
        renderTitle: self.renderAwaitingTitle,
        renderBody: self.renderAwaitingSkyberry,
        setStatus: function() {
            var showStep = self.state.rev.requestType === 1 || (self.state.rev.requestType === 2 && self.state.hasApproval);
            this.status = !!self.state.hasRequest ?
                !!self.state.isAccepted ?
                    StepStatus.COMPLETED :
                    StepStatus.ACTIVE :
                StepStatus.TODO;
            this.open = this.status === StepStatus.ACTIVE;
            this.hidden = self.state.isAccepted || !showStep;
        },
    }];

    return steps;
},
resetStatus: function(item) {
    item.setStatus();
    return item;
},

  renderStatusBox: function(status) {
    var completed = (status === StepStatus.COMPLETED);
    var active = status === StepStatus.ACTIVE;
    var icon = completed ? 'ok' : '';
    var cssNames = classnames('cbx', {
      completed: completed,
      active: active,
    });

    return (
      <div className='status'>
        <div className={cssNames}>
          {this.renderIcon(icon)}
        </div>
      </div>
    );
  },
  renderNoStatus: function() {
    var cssNames = classnames('cbx', 'no-status');

    return (
      <div className='status'>
        <div className={cssNames}>
          <i className={'glyphicon'} />
        </div>
      </div>
    );
  },
  renderIcon: function(name) {
    return (
      <i className={'glyphicon glyphicon-' + name} />
    );
  },
  renderObjAsRows: function(obj) {
    var prop;
    var items = [];
    for(prop in obj) {
      if(obj.hasOwnProperty(prop)) {
        items.push(this.renderLabelValue(prop, obj[prop]));
      }
    }
    return items;
  },
  renderLabelValue: function(lbl, val) {
    return (
      <Row key={lbl}>
        <Col xs={12} className='lbl-val'>
          <div className='hr'></div>
          <div className='clearfix'>
            <div className='lbl'>{lbl}</div>
            <div className='val'>{val}</div>
          </div>
        </Col>
      </Row>
    );
  },
  renderSignature: function() {
    if(!this.state.hasApproval) {
      return null;
    }

    var name = this.props.user.firstName + ' ' + this.props.user.lastName;
    var dt = new Date(this.state.rev.approvedDate);
    var digiSig = name + ', ' + (dt.getMonth() + 1) + '/' + dt.getDate() + '/' + dt.getFullYear() + ', ' + dt.getHours() + ':' + dt.getMinutes() + ':' + dt.getSeconds();

    return (
      <span className='signature'>{digiSig}</span>
    );
  },
  noOp: function(e) {
    e.preventDefault();
    e.stopPropagation();
  },



  getOptions: function() {
    var ret = [];
    if(this.props.review) {
      var docs = this.props.review.docs;
      if(docs && docs.length) {
        ret = docs.filter(function(item) {
          return item.docType !== 'Proof';
        });
        ret = ret.sort(function(a, b) {
          if (a.createdDate === b.createdDate) {
            return (a.title < b.title) ? -1 : (a.title > b.title) ? 1 : 0;
          } else {
            return (a.createdDate < b.createdDate) ? -1 : 1;
          }
        });
      }
    }
    return ret;
  },
  getOption: function(id) {
    return this.props.review.docs.find(function(item) {
      return item.id === id;
    });
  },
  getCurrentOpt: function() {
    return this.getOption(this.state.oId || this.props.review.selectedId || this.getDefaultOptId());
  },
  getCurrentOptId: function() {
    var opt = this.getCurrentOpt();
    return !!opt ? opt.id : null;
  },
  isCurrentOptId: function(id) {
    return this.getCurrentOptId() === id;
  },
  getDefaultOpt: function() {
    var ret = null;
    if(this.props.review) {
      var docs = this.props.review.docs;
      if(docs && docs.length > 0) {
        ret = docs[0];
      }
    }
    return ret;
  },
  getDefaultOptId: function() {
    var opt = this.getDefaultOpt();
    return !!opt ? opt.id : null;
  },
  getSelectedOpt: function() {
    var ret = null;
    var id = this.getSelectedOptId();
    if(id) {
      ret = this.props.review.docs.find(function(item) {
        return item.id === id;
      });
    }
    return ret;
  },
  getSelectedOptId: function() {
    return this.props.review.selectedId;
  },
  getSelectedOptTitle: function() {
    var opt = this.getSelectedOpt();
    return (opt && opt.title) ? opt.title : 'Option Title';
  },
  isSelectedOptId: function(id) {
    return this.getSelectedOptId() === id;
  },
  getProofs: function() {
    var ret = [];
    var proofs =  this.props.review.docs.filter(function(item) {
      return item.docType === 'Proof';
    });
    if(proofs && proofs.length) {
      ret = proofs;
    }
    return ret;
  },
  getComments: function() {
    var r = this.props.review;
    var comments = r.comments || [];
    comments = comments.sort(function(a, b) {
      return a.created < b.created ? -1 : a.created > b.created ? 1 : 0;
    });
    return comments.reverse();
  },

  buildState: function(props) {
    var prj = props.project;
    var rev = props.review;

    var options = this.getOptions();
    var hasOptions = options.length > 1;

    var selected = this.getSelectedOpt(); // selected
    var selectedId = this.getSelectedOptId(); // selected

    var option = this.getCurrentOpt(); // viewing
    var oId = this.getCurrentOptId(); // viewing

    var proofs = this.getProofs();
    var hasProofs = proofs.length > 0;

    var comments = this.getComments();
    var hasComments = comments.length > 0;

    var status = Status.FEEDBACK;
    if(rev.acceptedDate) {
      status = Status.COMPLETED;
    } else if(rev.requestDate) {
      switch (rev.requestType) {
        case 1: {
          status = Status.PENDING
          break;
        }
        case 2: {
          status = !rev.approvedDate ? Status.APPROVAL
                                     : Status.PENDING;
          break;
        }
        default:
      }
    } else if(!!selectedId) {
      status = Status.REQUEST;
    }

    this.setState({
      prj: prj,
      rev: rev,

      options: options,
      hasOptions: hasOptions,

      selected: selected,
      selectedId: selectedId,

      option: option,
      oId: oId,

      proofs: proofs,
      hasProofs: hasProofs,

      comments: comments,
      hasComments: hasComments,

      status: status,
      hasSelected: !!selectedId,
      hasRequest: !!rev.acceptedDate || !!rev.requestDate,
      requestType: rev.requestType,
      hasApproval: !!rev.approvedDate,
      notAccepted: !rev.approvedDate,
      isAccepted: !!rev.acceptedDate,
    });
  },

}
