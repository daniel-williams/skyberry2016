import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {Location} from 'react-router';
import {toJS} from 'immutable';
import {Grid, Row, Col, Pager, PageItem, Pagination} from 'react-bootstrap';

// import * as actions from '../actions/blogActionCreators';
import {Article, ArticleList, Fetching} from '../components';
require('./Blog.less');


export default React.createClass({
  mixins: [PureRenderMixin],

  componentWillMount: function() {
    this.props.fetchAsNeeded(this.getSlug());
  },
  componentWillReceiveProps(nextProps) {
    if(!nextProps.blog.get('isFetching')) {
      this.props.fetchAsNeeded(this.getSlug());
    }
  },

  isFetching: function(props) {
    props = props || this.props;
    return props.blog.get('isFetching');
  },
  getSlug: function() {
    return this.props.params.articleSlug;
  },
  hasSlug: function() {
    return !!this.getSlug();
  },

  getPosts: function() {
    const itemsPerPage = this.props.blog.get('itemsPerPage');
    const start = (this.props.blog.get('activePage') - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    return this.props.blog.get('posts').slice(start, end).toJS();
  },
  getPost: function() {
    const slug = this.getSlug();
    return this.props.blog.get('posts').find(p => p.slug === slug) || this.props.blog.get('post');
  },
  getPageCount: function() {
    return this.props.blog.get('totalPages');
  },
  getActivePage: function() {
    return this.props.blog.get('activePage');
  },

  render: function() {
    return (
      <div id='blog'>
        <Grid>
          <Row>
            <Col xs={12}>
              {this.renderPostContent()}
            </Col>
          </Row>
        </Grid>
      </div>
    );
  },
  renderPostContent: function() {
    return this.hasSlug() ? <Article item={this.getPost()} renderBreadcrumb />
                          : this.renderArticles()
  },
  renderArticles: function() {
    return (
      <div>
        {this.renderPager()}
        {this.isFetching() ? <Fetching />
                           : <ArticleList items={this.getPosts()} />}
      </div>
    );
  },

  renderPager: function() {
    const activePage = this.getActivePage();
    const pageCount = this.getPageCount();

    return (
      <Pager>
        <PageItem previous onClick={this.handlePagePrev} disabled={activePage === 1}>newer</PageItem>
        <span className='mh' style={{lineHeight:'32px'}}>page {activePage} of {pageCount}</span>
        <PageItem next onClick={this.handlePageNext} disabled={activePage === pageCount}>older</PageItem>
      </Pager>
    );
  },
  handlePagePrev: function() {
    this.props.blogPagePrev();
  },
  handlePageNext: function() {
    this.props.blogPageNext();
  },

});
