import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

import EditCommentForm from "./EditCommentForm"
import { getSingleComment } from '../Actions/comments'

class EditComment extends Component {

  componentDidMount() {
    this.props.getSingleComment(this.props.match.params.commentId)
  }

  render() {
    const commentId = this.props.match.params.commentId
    const comment = this.props.comments[commentId]

    return (
      <div>
        {comment ?
          <EditCommentForm commentId={commentId}
          />
          : ""
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
  const comments = state.comments
  return {
    comments
  }
}

export default withRouter(connect(mapStateToProps, { getSingleComment })(EditComment))

