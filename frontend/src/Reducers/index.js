import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { routerReducer } from 'react-router-redux'
import _ from "lodash";
import C from '../constants'

//Reducers for sorting criteria
export function sortCriteria(state={sortParameter: 'voteScore', sortOrder: 'desc'}, action) {
  switch (action.type) {
    case C.SET_SORT_PARAMETER:
      return Object.assign({}, state, {sortParameter: action.payload})
    case C.SET_SORT_ORDER:
      return Object.assign({}, state, {sortOrder: action.payload})
    case C.GET_SORT_CRITERIA:
      return state
    default:
      return state
  }
}

//Reducers for posts
export const posts = (state={}, action) => {
  var newState
  switch (action.type) {
    case C.GET_ALL_POSTS: {
      newState = (action.posts ? Object.assign({}, ...action.posts.map(post => ({[post.id]: post}))) : {})
      newState = _.omitBy(newState, post => post.deleted === true)
      return newState
    }
    case C.GET_SINGLE_POST: {
      const singlePost = (action.post ? {[action.post.id]: action.post} : {})
      const newState = (action.post ? Object.assign({}, state, singlePost) : state)
      return newState
    }
    case C.GET_CATEGORY_POSTS: {
      newState =
        (action.categoryPosts ? Object.assign({}, state, ...action.categoryPosts.map(post => ({[post.id]: post}))) : state)
      newState = _.omitBy(newState, post => post.deleted === true)
      return newState
    }
    case C.ADD_POST: {
      const newPost = (action.post ? {[action.post.id]: action.post} : {})
      const newState = (action.post ? Object.assign({}, state, newPost) : state)
      return newState
    }
    case C.UPDATE_POST: {
      const updatedPost = (action.post ? {[action.post.id]: action.post} : {})
      const newState = (action.post ? Object.assign({}, state, updatedPost) : state)
      return newState
    }
    case C.VOTE_POST: {
      const votedPost = (action.post ? {[action.post.id]: action.post} : {})
      const newState = (action.post ? Object.assign({}, state, votedPost) : state)
      return newState
    }
    case C.DELETE_POST: {
      newState = _.omitBy(state, post => post.id === action.postId)
      return newState
    }
    default: {
      return state
    }
  }
}

// Reducers for categories 
export function categories(state = [], action){
  switch (action.type) {
    case C.GET_ALL_CATEGORIES: {
      return action.categories
    }
    default:
      return state
  }
}

// Reducers for comments
export function comments (state={}, action) {
  var newState
  switch (action.type) {
    case C.GET_POST_COMMENTS: {
      const comments = (action.comments
        ? Object.assign({}, ...action.comments.map(comment => ({[comment.id]: comment})))
        : {})
      newState = Object.assign({}, state, comments)
      newState = _.omitBy(newState,
        comment => comment.deleted === true || comment.parentDelete === true)
      return newState
    }
    case C.GET_SINGLE_COMMENT: {
      const singleComment = (action.comment ? {[action.comment.id]: action.comment} : {})
      const newState = (action.comment
        ? Object.assign({}, state, singleComment)
        : state)
      return newState
    }
    case C.ADD_COMMENT: {
      const newComment = (action.comment ? {[action.comment.id]: action.comment} : {})
      const newState = (action.comment
        ? Object.assign({}, ...state, newComment)
        : state)
      return newState
    }
    case C.UPDATE_COMMENT: {
      const updateComment = (action.comment ? {[action.comment.id]: action.comment} : {})
       
      const newState = (action.comment
        ? Object.assign({}, state, updateComment)
        : updateComment)
      return newState
    }
    case C.VOTE_COMMENT: {
      const votedComment = (action.comment ? {[action.comment.id]: action.comment} : {})
      const newState = (action.comment ? Object.assign({}, state, votedComment) : state)
      return newState
    }
    case C.DELETE_COMMENT: {
      newState = _.omitBy(state, comment => comment.id === action.commentId)
      return newState
    }
    default: {
      return state
    }
  }
}

export default combineReducers({
  categories,
  posts,
  comments,
  sortCriteria,
  form: formReducer,
  routing: routerReducer
})