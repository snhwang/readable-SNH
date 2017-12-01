import React, { Component } from 'react';
import { createComment } from '../Actions/comments'
import CommentForm from "./CommentForm"

class CreateComment extends Component {

  render() {

    return (
      <div>
        <h1> Create New Comment </h1>
        Enter data into the fields and click submit.
        <CommentForm parentId={this.props.match.params.postId} onSubmit={createComment}/>
        <div>
          Navigation:
          <HomeButton/> 
          <button type="button" onClick={this.props.history.goBack}>
            Back
          </button>
        </div>
      </div>
    )
  }
}

export default CreateComment
