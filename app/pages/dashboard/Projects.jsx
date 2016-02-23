import React, {PropTypes} from 'react';
import {Grid, Row, Col} from 'react-bootstrap';

import {formatDate} from '../../utils/DateUtils';
import {Brick, Fetching} from '../../components';
import AccountSelector from './AccountSelector';
import ProjectSelector from './ProjectSelector';
import Deliverables from './Deliverables';
import Contracts from './Contracts';
import Documents from './Documents';
import Reviews from './Reviews';


export default React.createClass({
  displayName: 'Projects',

  componentWillMount: function() {
    this.fetchAsNeeded();
  },
  componentWillReceiveProps(nextProps) {
    if(!nextProps.isFetching) {
      this.fetchAsNeeded(nextProps);
    }
  },
  fetchAsNeeded: function(specificProps) {
    const props = specificProps || this.props;
    if(!props.isFetching && !props.hasFetchedProject && !!props.compositeSlug) {
      props.fetchProjectAsNeeded(props.compositeSlug);
    }
  },
  isFetching: function() {
    return this.props.isFetching;
  },
  getSelectedAccountName: function() {
    return this.props.account
      ? this.props.account.name
      : '';
  },
  getRootUrl: function() {
    return '/' + this.props.params.aSlug + '/' + this.props.params.pSlug + '/';
  },
  hasAccountOptions: function() {
    return this.props.accountOptions.length > 1;
  },

  getProjectDocs: function() {
    return this.props.project.docs.reduce((accum, d) => {
      if(d.docType !== 'Final Deliverables') {
        accum.push(d);
      }
      return accum;
    }, []);
  },
  getFinalDeliverables: function() {
    return this.props.project.docs.reduce((accum, d) => {
      if(d.docType === 'Final Deliverables') {
        accum.push(d);
      }
      return accum;
    }, []);
  },
  getContractDocs: function() {
    let docs = [];
    this.props.project.contracts.forEach(c => {
      c.docs.forEach(d => docs.push(d));
    });
    return docs;
  },

  render: function() {
    return (
      <div id='project' className='mt'>
        <Grid fluid={true}>
          <Row>
            <Col xs={12}>
              <h1><span>Projects</span><span className="accent"> for </span><span className="nowrap">{this.getSelectedAccountName()}</span></h1>
            </Col>
          </Row>
          {this.hasAccountOptions() && this.renderAccountSelector()}
          {this.renderProjectSelector()}
          <Row>
            <Col xs={12} className='mt'>
              {this.isFetching() ? <Fetching /> : this.props.hasFetchedProject && this.renderProjectInfo()}
            </Col>
          </Row>
        </Grid>
        {this.props.children}
      </div>
    );
  },
  renderAccountSelector: function() {
    return (
      <AccountSelector
        hasFetched={this.props.hasFetchedAccounts}
        accountOptions={this.props.accountOptions}
        accountSlug={this.props.accountSlug}
        changeAccount={this.props.changeAccount} />
    );
  },
  renderProjectSelector: function() {
    return (
      <ProjectSelector
        hasFetched={this.props.hasFetchedAccounts}
        options={this.props.options}
        projectSlug={this.props.compositeSlug}
        changeProject={this.props.changeProject} />
    );
  },
  renderProjectInfo: function() {
    let p = this.props.project;
    let now = Date.now();
    let start = new Date(p.startDate);
    let est = new Date(p.estimatedCompletionDate);
    let completed = new Date(p.completionDate);
    let begin;
    let done;

    if(now < start) {
      begin = (<Brick>starting: {formatDate(start)}</Brick>);
    } else {
      begin = (<Brick>started: {formatDate(start)}</Brick>);
    }
    if(completed) {
      done = (<Brick>Completed: {formatDate(completed)}</Brick>);
    } else {
      done = (<Brick>Completion: {formatDate(completed)} (estimated)</Brick>);
    }

    return (
      <Row id='project-details'>
        <Col xs={12}><h2>{p.name}</h2></Col>
        <Col xs={12} className='mb'>
            <Row className='dates'>
                {begin}
                {done}
            </Row>
        </Col>
        <Col sm={6} xs={12}>
          <Row>
            <Col md={6} xs={12} className='mb'>
              <Reviews items={p.reviews} rootUrl={this.getRootUrl()} />
            </Col>
            <Col md={6} xs={12} className='mb'>
              <Deliverables items={this.getFinalDeliverables()} />
            </Col>
          </Row>
        </Col>
        <Col sm={6} xs={12} className='mb'>
          <Row>
            <Col md={6} xs={12} className='mb'>
              <Documents items={this.getProjectDocs()} />
            </Col>
            <Col md={6} xs={12} className='mb'>
              <Contracts items={this.getContractDocs()} />
            </Col>
          </Row>
        </Col>
      </Row>
    );
  },

});
