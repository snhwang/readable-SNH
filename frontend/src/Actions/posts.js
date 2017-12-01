import {api_server, headers} from './api-server-params'
import C from '../constants'

const uuidv1 = require('uuid/v1');


// Fetch single post from server
export const getSinglePostServer = (postId) =>
  fetch(`${api_server}/posts/${postId}`,
    {
      method: 'GET',
      headers	
    })
    .then(res => res.json())

// Bound action creator
export function getSinglePost(postId) {
  return (dispatch => {
    getSinglePostServer(postId).then(post => {
      dispatch(
        {
          type: C.GET_SINGLE_POST,
          post
        }
      )
    })
  })
}

// Get posts from server
export const getAllPostsServer = () =>
  fetch(`${api_server}/posts`,
    {
      method: 'GET',
      headers
    })
    .then(res => res.json())

// Bound action creator
export function getAllPosts() {
  return dispatch => {
    getAllPostsServer().then(posts => {
      dispatch({
        type : C.GET_ALL_POSTS,
        posts
      })
    })
  }
}

// Get posts for a specified category from server
export const getCategoryPostsServer = (category) =>
  fetch(`${api_server}/${category}/posts`,
    {
      method: 'GET',
      headers
    }).then(response => response.json())

//Bound action creator
export function getCategoryPosts(category) {
  return dispatch => (
    getCategoryPostsServer(category).then(categoryPosts => {
      dispatch(
        {
          type: C.GET_CATEGORY_POSTS,
          categoryPosts
        }
      )
    })
  )
}

// voteDirection is 'upVote' or 'downVote'
export function votePost (postId, voteDirection) {
  return dispatch => {
    fetch(`${api_server}/posts/${postId}`,
      {
        method: 'POST',
        headers,
        body: JSON.stringify({option: voteDirection})
      }
    )
    .then(res => res.json())
    .then(post => 
      dispatch({
        type : C.VOTE_POST,
        post
      })
    )   
  }
}

// Add a post to the server
export const createNewPostServer = (post) =>
  fetch(`${api_server}/posts`,
    {
      method: 'POST',
      headers,
      body: JSON.stringify(post)
    }
  ).then(res => res.json())

// Create action for adding a post
export function createNewPost(post) {
  post.id = uuidv1();
  post.timestamp = Date.now();
  post.voteScore = 1
  post.delete = false
  createNewPostServer(post)
  return {
    type: C.ADD_POST,
    post
  }
}

// Update a post on the server
export const updatePostServer = (post) => {
  return fetch(`${api_server}/posts/${post.id}`,
    {
      method: 'PUT',
      headers,
      body: JSON.stringify(post)
    }
  ).then(res => res.json())
}

// Bound action creator for updating
export function updatePost(post) {
  return dispatch => {
    updatePostServer(post).then(p => {
      dispatch(
        {
          type: C.UPDATE_POST,
          post
        }
      )
    })
  }
}

// Set delete flag of post to true on server.
// Child comments are also flagged
export const deletePostServer = (postId) => {
  return fetch(`${api_server}/posts/${postId}`,
    {
      method: 'DELETE',
      headers
    })
  }

// Bound action creator for deleting
export function deletePost(postId) {
  return dispatch => {
    deletePostServer(postId)
    dispatch({
      type : C.DELETE_POST,
      postId
    })
  }
}