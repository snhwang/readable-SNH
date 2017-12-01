import React from 'react'
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { votePost, deletePost } from '../Actions/posts'
import FormatTimestamp from '../Utils/FormatTimestamp'
import ShowNumberOfComments from './ShowNumberOfComments'

export const ListSinglePost = ( props ) =>
  <div>
    <ul className='single-post-list'>
      {(<Link to={`/${props.post.category}/${props.post.id}`} >
        <h3> ID: {props.post.id} </h3>
      </Link>)}
      <h3> Timestamp: {FormatTimestamp(props.post.timestamp)} </h3>
      <h3> Title: {props.post.title} </h3>
      <h3> Body: {props.post.body} </h3>
      <h3> Author: {props.post.author} </h3>
      {(<Link to={`/${props.post.category}`} >
        <h3> Category: {props.post.category} </h3>
      </Link>)}
      <ShowNumberOfComments postId={props.post.id}/>
      <h3> Votes: {props.post.voteScore} </h3>
      <button onClick={() => props.votePost(props.post.id, 'upVote')}>
        Up Vote
      </button>
      <button onClick={() => props.votePost(props.post.id, 'downVote')}>
        Down Vote
      </button>
      <Link to={`/editPost/${props.post.id}`}>
        <button>
          Edit Post
        </button>
      </Link>
      <button onClick={() => props.deletePost(props.post.id)}>
        Delete Post
      </button>
      <h3> _________________________________ </h3>
    </ul>
  </div>


ListSinglePost.propTypes = {
  postId : PropTypes.string.isRequired,
  post: PropTypes.shape({
    id: PropTypes.string,
    timestamp: PropTypes.integer,
    title: PropTypes.string,
    body: PropTypes.string,
    author: PropTypes.string,
    category: PropTypes.string,
    voteScore: PropTypes.integer,
  }).isRequired,
}

function mapStateToProps(state, ownProps) {
  const post = state.posts[ownProps.postId]
  return {
    post
  }
}

export default withRouter(connect(mapStateToProps, {votePost, deletePost})(ListSinglePost))
