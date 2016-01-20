import fetch from 'isomorphic-fetch';
import {checkStatus, parseJSON} from './fetch-helpers';

import store from '../store';
import {
  BLOG_FETCHING,
  BLOG_FETCH_SUCCESS,
  BLOG_FETCH_FAILED,
  BLOG_PAGE_NEXT,
  BLOG_PAGE_PREV,
  POSTS_FETCHING,
  POSTS_FETCH_SUCCESS,
  POSTS_FETCH_FAILED,
  POST_REQUESTED,
  POST_SUCCESS,
  POST_FAILED,
} from '.';

import constants from '../constants';


const {host, id, apiKey, itemsPerPage} = constants.blog;
const blogUrl = host + id + '?key=' + apiKey;
const postsUrl = host + id + '/posts?key=' + apiKey;
function getPostUrl(itemId) {
  return host + id + '/posts/' + itemId + '?key=' + apiKey;
}

function fetchBlog(dispatch) {
  dispatch({
    type: BLOG_FETCHING,
  });

  fetch(blogUrl)
    .then(checkStatus)
    .then(parseJSON)
    .then(json => dispatch({
      type: BLOG_FETCH_SUCCESS,
      payload: {
        blog: json
      },
    }))
    .catch(error => dispatch({
      type: BLOG_FETCH_FAILED,
      payload: {
        date: new Date(),
        error: error
      },
    }));
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
    dispatch({
      type: POSTS_FETCHING
    });

    fetch(postsUrl + count + pageToken)
      .then(checkStatus)
      .then(parseJSON)
      .then(json => {
        dispatch({
          type: POSTS_FETCH_SUCCESS,
          payload: {
            date: new Date(),
            posts: json.items,
            pageToken: json.nextPageToken
          }
        })
      })
      .catch(error => dispatch({
        type: POSTS_FETCH_FAILED,
        payload: {
          date: new Date(),
          error: error
        }
      }));
  }
}

function fetchPostBySlug(slug) {
  return function(dispatch, getState) {
    dispatch({
      type: POST_REQUESTED,
    });
    fetch(postsUrl + '&maxResults=500&fields=items(id,url)')
      .then(checkStatus)
      .then(parseJSON)
      .then(json => {
        const postSlugs = json.items.map(p => {
          return {
            id: p.id,
            slug: getSlugFromUrl(p.url),
          }
        });
        const tgtPost = postSlugs.find(p => p.slug === slug);
        if(tgtPost) {
          fetch(getPostUrl(tgtPost.id))
            .then(checkStatus)
            .then(parseJSON)
            .then(json => {
              dispatch({
                type: POST_SUCCESS,
                payload: {
                  date: new Date(),
                  post: json
                },
              });
            })
            .catch(error => dispatch({
              type: POST_FAILED,
              payload: {
                date: new Date(),
                error: error
              },
            }))
        } else {
          dispatch({
            type: POST_FAILED,
            payload: {
              date: new Date(),
              error: 'Post not found.'
            },
          });
        }
      })
      .catch(error => dispatch({
        type: POST_FAILED,
        payload: {
          date: new Date(),
          error: error
        },
      }));

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
