import {api_server, headers} from './api-server-params'
import C from '../constants'

//Get single comment from server
export const serverGetSingleComment = (id) =>
  fetch(`${api_server}/comments/${id}`,
    {
      method: 'GET',
      headers
    })
    .then(res => res.json())

//Bound action creator
export function getSingleComment(id) {
  return (dispatch => {
    serverGetSingleComment(id).then(comment => {
      dispatch(
        {
          type: C.GET_SINGLE_COMMENT,
          comment
        }
      )
    })
  })
}

// Get Comments from server for a specified post with id postId
export const getPostCommentsServer = (postId) =>
  fetch(`${api_server}/posts/${postId}/comments`,
    {
      method: 'GET',
      headers
    }).then(response => response.json())
  
// Server call with bound action creator
// Get comments for a post specified by ID
export function getPostComments(parentId) {
  return dispatch => {
    getPostCommentsServer(parentId).then(
      comments => {
        dispatch({
          type : C.GET_POST_COMMENTS,
          comments
        })
      }
    )
  }
}

/** Add Comment to server
 * id: Any unique ID. As with posts, UUID is probably the best here.
 * timestamp: timestamp. Get this however you want.
 * body: String
 * owner: String
 * parentId: Should match a post id in the database.
**/
export const createNewCommentServer = (comment) => 
  fetch(`${api_server}/comments`,
    {
      method: 'POST',
      headers,
      body: JSON.stringify(comment)
    }).then(response => response.json())

// Create action for adding a comment
export function createNewComment(comment) {
//  comment.id = uuidv1();
//  comment.timestamp = Date.now();
  return dispatch => {
    createNewCommentServer(comment).then(comment => {
      dispatch({
        type: C.ADD_COMMENT,
        comment
      })
    })
  }
}


export const updateCommentServer = (comment) => {
  return fetch(`${api_server}/comments/${comment.id}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify(comment)
  }).then(res => res.json())
}

export function updateComment(comment) {
  return dispatch => {
    updateCommentServer(comment).then(comment => {
      dispatch({
        type: C.UPDATE_COMMENT,
        comment
      })
    })
  }
}

// voteDirection is 'upVote' or 'downVote'
export const voteComment = (commentId, voteDirection) => {
  const body = {option: voteDirection}
  return dispatch => fetch(`${api_server}/comments/${commentId}`, {
    method: 'POST',
    headers,
    body: JSON.stringify(body)
  })
  .then(res => res.json())
  .then(comment => dispatch({
    type : C.VOTE_COMMENT,
    comment
  }))    
}

// Set delete flag of comment to true on server.
// Child comments are also flagged
export const deleteCommentServer = (commentId) => {
  return fetch(`${api_server}/comments/${commentId}`,
    {
      method: 'DELETE',
      headers
    }).then(res => res.json())
  }

// Server call with bound action creator
export function deleteComment(commentId) {
  return dispatch => {
    deleteCommentServer(commentId)
    dispatch({
      type : C.DELETE_COMMENT,
      commentId
    })
  }
}
