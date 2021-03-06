import {Map, List, fromJS} from 'immutable';

import {mapPosts} from '../utils/BloggerUtils';
import constants from '../constants';
import * as blogActions from '../actions/blogActions';


// TODO djw: break this into two sub reducers, blog/paging, posts
// TODO djw: not a fan of 'post', lets get all titles and id's first and retrieve post body as needed
const initialState = fromJS({
    isFetching: false,
    lastFetchDate: null,
    lastFetchError: null,

    id: null,
    meta: null,
    totalPostCount: 0,
    totalPages: 0,
    itemsPerPage: constants.blog && constants.blog.itemsPerPage || 5,
    activePage: 1,
    posts: [],
    post: null, // holds single post requested outside paging
    pageToken: null,
});

export default function(state = initialState, action) {
  switch(action.type) {
    case blogActions.FETCHING_BLOG: {
      return state.set('isFetching', true);
    }
    case blogActions.FETCH_BLOG_SUCCESS: {
      const blog = action.payload.blog;
      const totalPostCount = blog.posts.totalItems;
      const totalPages = Math.floor(totalPostCount / state.get('itemsPerPage')) + 1;

      return state.withMutations((state) => {
        state.set('isFetching', false);
        state.set('lastFetchDate', action.payload.date);
        state.set('lastFetchError', null);
        state.set('id', blog.id);
        state.set('totalPostCount', totalPostCount);
        state.set('totalPages', totalPages);
        state.set('meta', fromJS(blog));
        return state;
      });
    }
    case blogActions.FETCH_BLOG_FAILED: {
      return state.withMutations((state) => {
        state.set('isFetching', false);
        state.set('lastFetchDate', action.payload.date);
        state.set('lastFetchError', action.payload.error);
        return state;
      });
    }
    case blogActions.BLOG_PAGE_NEXT: {
      const totalPages = state.get('totalPages');
      const activePage = state.get('activePage') ;
      return state.set('activePage', activePage < totalPages ? activePage + 1
                                                             : activePage);
    }
    case blogActions.BLOG_PAGE_PREV: {
      const activePage = state.get('activePage') ;
      return state.set('activePage', activePage > 1 ? activePage - 1
                                                    : activePage);
    }
    case blogActions.FETCHING_POSTS: {
      return state.set('isFetching', true);
    }
    case blogActions.FETCH_POSTS_SUCCESS: {
      return state.withMutations((state) => {
        state.set('isFetching', false);
        state.set('lastFetchDate', action.payload.date);
        state.set('lastFetchError', null);

        state.set('posts', state.get('posts').push(...mapPosts(action.payload.posts)));
        state.set('pageToken', action.payload.pageToken)
        return state;
      });
    }
    case blogActions.FETCH_POSTS_FAILED: {
      return state.withMutations((state) => {
        state.set('isFetching', false);
        state.set('lastFetchDate', action.payload.date);
        state.set('lastFetchError', action.payload.error);
        return state;
      });
    }
    case blogActions.FETCHING_POST: {
      return state.set('isFetching', true);
    }
    case blogActions.FETCH_POST_SUCCESS: {
      return state.withMutations((state) => {
        state.set('isFetching', false);
        state.set('lastFetchDate', action.payload.date);
        state.set('lastFetchError', null);
        state.set('post', mapPosts([action.payload.post])[0]);
        return state;
      });
    }
    case blogActions.FETCH_POST_FAILED: {
      return state.withMutations((state) => {
        state.set('isFetching', false);
        state.set('lastFetchDate', action.payload.date);
        state.set('lastFetchError', action.payload.error);
        return state;
      });
    }
    default:
      return state
  }
}
