import React, { Component } from 'react';
import _ from "lodash"
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { getPostComments } from '../Actions/comments'
import FormatTimestamp from '../Utils/FormatTimestamp'
import { voteComment } from '../Actions/comments'

class CommentsList extends Component {

  componentDidMount() {
    this.props.getPostComments(this.props.postId)
  }

  render() {
    const comments = this.props.comments

    return (
      <ul className='comments-list'>
          {comments.map((comment) => (
            <div>
              <li key={comment.id} >
                {(<Link to={`/comment/${comment.id}`} >
                  <h3> ID: {comment.id} </h3>
                </Link>)}
                {(<Link to={`/post/${comment.parentId}`} >
                  <h3> Parent ID: {comment.parentId} </h3>
                </Link>)}
                <h3> Timestamp: {FormatTimestamp(comment.timestamp)} </h3>
                <h3> Body: {comment.body} </h3>
                <h3> Author: {comment.author} </h3>
                <h3>
                  Vote Score: {comment.voteScore}
                  <button onClick={() => this.props.voteComment(comment.id, 'upVote')}>
                    Up Vote
                  </button>
                  <button onClick={() => this.props.voteComment(comment.id, 'downVote')}>
                    Down Vote
                  </button>
                </h3>
              </li>
                <Link
                  to={`/post/${comment.parentId}/editComment/${comment.id}`}>
                  <button>
                    Edit Comment
                  </button>
                </Link>
              <h3> _________________________________ </h3>
            </div>
        ))}
      </ul>
    )
  }    
}

function mapStateToProps(state) {
  const { comments } = state
  return {
    comments
  }
}

export default withRouter(connect(mapStateToProps, {getPostComments, voteComment})(CommentsList))