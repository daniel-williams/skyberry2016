import React, {PropTypes} from 'react';
import PureRender from 'react-addons-pure-render-mixin';
import {Link} from 'react-router';
import {Breadcrumb, BreadcrumbItem} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

import {Fetching} from '../';


export default React.createClass({
  displayName: 'Article',

  mixins: [PureRender],

  propTypes: {
    displayBreadcrumb: PropTypes.bool,
    isSummary: PropTypes.bool,
  },
  getDefaultProps: function() {
    return {
      displayBreadcrumb: false,
      isSummary: false,
    };
  },
  hasItem: function() {
    return !!this.props.item;
  },
  getItem: function() {
    return this.props.item;
  },
  getContent: function() {
    return this.props.isSummary
      ? this.props.item.summary || this.props.item.content
      : this.props.item.content;
  },


  render: function() {
    return this.hasItem()
      ? this.renderArticle()
      : <Fetching className='mt'/>
  },
  renderArticle: function() {
    const item = this.getItem();
    return (
      <section>
        <article>
          {this.props.renderBreadcrumb && this.renderBreadcrumb(item.title)}
          <header>
            <Link to={'/blog/' + item.slug}><h1 onClick={this.scrollTop}>{item.title}</h1></Link>
          </header>
          <div dangerouslySetInnerHTML={{__html:this.getContent()}} />
          {this.props.isSummary && <Link to={'/blog/' + item.slug}><span className='i'>read more</span></Link>}
          <footer>
            {item.tags && item.tags.length && this.renderTags(item.tags)}
          </footer>
        </article>
      </section>
    );
  },
  renderTags : function(tags) {
    return (
      <div className='tags-wrap'>
        <span className='title'>Tags:</span>
        <span className='tags'>
          {tags.map((tag, i) => <span key={i}>{tag}</span>)}
        </span>
      </div>
    );
  },
  renderBreadcrumb: function(title) {
    return (
      <Breadcrumb>
        <li><Link to='/blog'>Blog</Link></li>
        <BreadcrumbItem active>{title}</BreadcrumbItem>
      </Breadcrumb>
    );
  },

  scrollTop: function() {
    setTimeout(function() {
      window && window.scrollTo(0,0);
    }, 0);
  },

});
