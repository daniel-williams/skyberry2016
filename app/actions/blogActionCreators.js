import Fetch from '../services/FetchService';

import constants from '../constants';
import {getSlugFromUrl} from '../utils/BloggerUtils';
import * as actions from './blogActions';


const {host, id, apiKey, itemsPerPage} = constants.blog;
const blogUrl = host + id + '?key=' + apiKey;
const postsUrl = host + id + '/posts?key=' + apiKey;

export function fetchAsNeeded(slug) {
  return function(dispatch, getState) {
    const blogId = getState().getIn(['blog', 'id']);

    if(!blogId) {
      fetchBlog(dispatch, getState);
    } else {
      fetchPostsAsNeeded(dispatch, getState, slug);
    }
  }
}

export function blogPageNext() {
  return {
    type: actions.BLOG_PAGE_NEXT
  };
}
export function blogPagePrev() {
  return {
    type: actions.BLOG_PAGE_PREV
  };
}


export default {
  fetchAsNeeded,
  blogPageNext,
  blogPagePrev,
}




// private creators
function fetchBlog(dispatch) {
  dispatch(fetchingBlog());

  Fetch.getJson(blogUrl)
    .then(json => dispatch(fetchBlogSuccess(json)))
    .catch(error => dispatch(fetchBlogFailed(error)));
}

function fetchPostsAsNeeded(dispatch, getState, slug) {
  const blog = getState().get('blog').toJS();
  if(slug) {
    if(!blog.posts.find(p => p.slug === slug)) {
      if(!blog.isFetching && !blog.post && !blog.lastFetchError) {
        fetchPostBySlug(slug)(dispatch, getState);
      }
    }
  }
    const {activePage, itemsPerPage, totalPostCount} = blog;
    const loadedItemCount = blog.posts.length;

    // do we have enough posts for the current page?
    if((activePage * itemsPerPage) > loadedItemCount && loadedItemCount < totalPostCount) {
      // no! how many do we need?
      const count = activePage * itemsPerPage - loadedItemCount;
      const pageToken = blog.pageToken;
      fetchPost(count, pageToken)(dispatch, getState);
    }
}

function fetchPost(count = 0, pageToken) {
  if(typeof count !== 'number' || count < 1) return;
  count = '&maxResults=' + count;
  pageToken = !!pageToken ? '&pageToken=' + pageToken
                          : '';

  return function(dispatch) {
    dispatch(fetchingPosts());

    Fetch.getJson(postsUrl + count + pageToken)
      .then(json => dispatch(fetchPostsSuccess(json)))
      .catch(error => dispatch(fetchPostsFailed(error)));
  }
}

function fetchPostBySlug(slug) {
  return function(dispatch, getState) {
    dispatch(fetchingPost());

    Fetch.getJson(postsUrl + '&maxResults=500&fields=items(id,url)')
      .then(json => {
        const postSlugs = json.items.map(p => {
          return {
            id: p.id,
            slug: getSlugFromUrl(p.url),
          }
        });
        const tgtPost = postSlugs.find(p => p.slug === slug);
        if(tgtPost) {
          return Fetch.getJson(getPostUrl(tgtPost.id))
            .then(json => dispatch(fetchPostSuccess(json)))
        } else {
          throw new Error('Post not found.');
        }
      })
      .catch(error => dispatch(fetchPostFailed(error)));
  }
}


// internal helpers
function getPostUrl(itemId) {
  return host + id + '/posts/' + itemId + '?key=' + apiKey;
}

function fetchingBlog() {
  return {
    type: actions.FETCHING_BLOG,
  };
}
function fetchBlogSuccess(json) {
  return {
    type: actions.FETCH_BLOG_SUCCESS,
    payload: {
      blog: json
    },
  };
}
function fetchBlogFailed(error) {
  return {
    type: actions.FETCH_BLOG_FAILED,
    payload: {
      date: new Date(),
      error: error
    },
  };
}

function fetchingPosts() {
  return {
    type: actions.FETCHING_POSTS
  };
}
// TODO:  losing some data by plucking from json... review to persist or optimize request
function fetchPostsSuccess(json) {
  return {
    type: actions.FETCH_POSTS_SUCCESS,
    payload: {
      date: new Date(),
      posts: json.items,
      pageToken: json.nextPageToken
    }
  };
}
function fetchPostsFailed(error) {
  return {
    type: actions.FETCH_POSTS_FAILED,
    payload: {
      date: new Date(),
      error: error
    }
  };
}


function fetchingPost() {
  return {
    type: actions.FETCHING_POST,
  };
}
function fetchPostSuccess(json) {
  return {
    type: actions.FETCH_POST_SUCCESS,
    payload: {
      date: new Date(),
      post: json
    },
  };
}
function fetchPostFailed(error) {
  return {
    type: actions.FETCH_POST_FAILED,
    payload: {
      date: new Date(),
      error: error
    },
  };
}
