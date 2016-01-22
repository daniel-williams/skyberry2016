import {getJson} from '../services/FetchService';

import constants from '../constants';
import {getSlugFromUrl} from '../utils/BloggerUtils';
import {
  BLOG_FETCHING,
  BLOG_FETCH_SUCCESS,
  BLOG_FETCH_FAILED,
  BLOG_PAGE_NEXT,
  BLOG_PAGE_PREV,

  POSTS_FETCHING,
  POSTS_FETCH_SUCCESS,
  POSTS_FETCH_FAILED,

  POST_FETCHING,
  POST_FETCH_SUCCESS,
  POST_FETCH_FAILED,
} from '.';



const {host, id, apiKey, itemsPerPage} = constants.blog;
const blogUrl = host + id + '?key=' + apiKey;
const postsUrl = host + id + '/posts?key=' + apiKey;
function getPostUrl(itemId) {
  return host + id + '/posts/' + itemId + '?key=' + apiKey;
}

function fetchBlog(dispatch) {
  dispatch(fetchingBlog());

  getJson(blogUrl)
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

    getJson(postsUrl + count + pageToken)
      .then(json => dispatch(fetchPostsSuccess(json)))
      .catch(error => dispatch(fetchPostsFailed(error)));
  }
}

function fetchPostBySlug(slug) {
  return function(dispatch, getState) {
    dispatch(fetchingPost());

    getJson(postsUrl + '&maxResults=500&fields=items(id,url)')
      .then(json => {
        const postSlugs = json.items.map(p => {
          return {
            id: p.id,
            slug: getSlugFromUrl(p.url),
          }
        });
        const tgtPost = postSlugs.find(p => p.slug === slug);
        if(tgtPost) {
          return getJson(getPostUrl(tgtPost.id))
            .then(json => dispatch(fetchPostSuccess(json)))
        } else {
          throw new Error('Post not found.');
        }
      })
      .catch(error => dispatch(fetchPostFailed(error)));
  }
}


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



export function fetchingBlog() {
  return {
    type: BLOG_FETCHING,
  };
}
export function fetchBlogSuccess(json) {
  return {
    type: BLOG_FETCH_SUCCESS,
    payload: {
      blog: json
    },
  };
}
export function fetchBlogFailed(error) {
  return {
    type: BLOG_FETCH_FAILED,
    payload: {
      date: new Date(),
      error: error
    },
  };
}

export function fetchingPosts() {
  return {
    type: POSTS_FETCHING
  };
}
// TODO:  losing some data by plucking from json... review to persist or optimize request
export function fetchPostsSuccess(json) {
  return {
    type: POSTS_FETCH_SUCCESS,
    payload: {
      date: new Date(),
      posts: json.items,
      pageToken: json.nextPageToken
    }
  };
}
export function fetchPostsFailed(error) {
  return {
    type: POSTS_FETCH_FAILED,
    payload: {
      date: new Date(),
      error: error
    }
  };
}


export function fetchingPost() {
  return {
    type: POST_FETCHING,
  };
}
export function fetchPostSuccess(json) {
  return {
    type: POST_FETCH_SUCCESS,
    payload: {
      date: new Date(),
      post: json
    },
  };
}
export function fetchPostFailed(error) {
  return {
    type: POST_FETCH_FAILED,
    payload: {
      date: new Date(),
      error: error
    },
  };
}

export function blogPageNext() {
  return {
    type: BLOG_PAGE_NEXT
  };
}
export function blogPagePrev() {
  return {
    type: BLOG_PAGE_PREV
  };
}
