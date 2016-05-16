import React from 'react';
import {Location} from 'react-router';
import {toJS} from 'immutable';
import {Grid, Row, Col, Pager, PageItem, Pagination} from 'react-bootstrap';
import Helmet from 'react-helmet';

import {Article, ArticleList, Fetching, SkyButton} from '../components';
require('./Blog.less');


export default React.createClass({
  displayName: 'Blog',

  componentWillMount: function() {
    this.props.fetchAsNeeded(this.getSlug());
  },
  componentWillReceiveProps(nextProps) {
    if(!nextProps.blog.isFetching) {
      nextProps.fetchAsNeeded(nextProps.params.articleSlug);
    }
  },

  isFetching: function() {
    return this.props.blog.isFetching;
  },
  getSlug: function() {
    return this.props.params.articleSlug;
  },
  hasSlug: function() {
    return !!this.props.params.articleSlug;
  },

  getPosts: function() {
    const {itemsPerPage, activePage} = this.props.blog;
    const start = (activePage - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    return this.props.blog.posts.slice(start, end);
  },
  getPost: function() {
    const slug = this.getSlug();
    let post = null;
    if(this.props.blog && this.props.blog.posts) {
      post = this.props.blog.posts.find(p => p.slug === slug) || this.props.blog.post;
    }
    return post;
  },

  render: function() {
    return (
      <div id='blog'>
        <Helmet
          title='Skyberry Studio Blog'
          meta={[{
            'name': 'description',
            'content': 'Skyberry is an award winning print, graphic and web design studio located in Bothell Washington.'
          }]}
        />
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
    return this.hasSlug()
      ? <Article item={this.getPost()} renderBreadcrumb />
      : this.renderArticles();
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
    const {totalPages, activePage} = this.props.blog;
    return (
      <div className='pager'>
        <SkyButton
          className='previous'
          isPrimary={activePage !== 1}
          isDisabled={activePage === 1}
          onClick={this.handlePagePrev}>newer</SkyButton>
        <span className='mh' style={{lineHeight:'32px'}}>page {activePage} of {totalPages}</span>
        <SkyButton
          className='next'
          isPrimary={activePage !== totalPages}
          isDisabled={activePage === totalPages}
          onClick={this.handlePageNext}>older</SkyButton>
      </div>

    );
  },
  handlePagePrev: function() {
    this.props.blogPagePrev();
  },
  handlePageNext: function() {
    this.props.blogPageNext();
  },

});
