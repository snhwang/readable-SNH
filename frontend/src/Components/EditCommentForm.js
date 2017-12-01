import React, { Component } from "react";
import { Field, reduxForm } from 'redux-form'

import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { updateComment } from '../Actions/comments'
import { getSingleComment } from '../Actions/comments'

class EditCommentForm extends Component {
  componentDidMount() {
    this.props.getSingleComment(this.props.commentId)
  }

  submitComment(comment) {
    this.props.updateComment(comment)
  }

  render() {
    const { handleSubmit, initialValues, pristine, reset, submitting } = this.props
    
    return (
      <div>
        <form onSubmit={handleSubmit(this.submitComment.bind(this))}>
          <h1> Edit a Comment </h1>
          Edit the fields and click submit.
          <p/>
          <div>
            <label>Body</label>
            <div>
              <Field
				style={{width: 256, height: 256}}
                name="body"
                component="textarea"
				placeholder="Body"
              />
            </div>
          </div>
          <p/>
          <div>
            <label>Author</label>
            <div>
              <Field
				style={{width: 256}}
                name="author"
                component="input"
                type="text"
                placeholder="Author"
              />
            </div>
          </div>
          <p/>
          <button type="submit" disabled={pristine || submitting}>
            Submit
          </button>
          <button type="button" disabled={pristine || submitting} onClick={reset}>
            Clear Values
          </button>
          <button type="button" onClick={this.props.history.goBack}>
            Back
          </button>
        </form>
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  const comments = state.comments
  const singleComment = comments[ownProps.commentId]
  return {
    comments,
    initialValues : singleComment
  }
}

EditCommentForm = reduxForm({
  form: 'editComment',
  enableReinitialize: true
})(EditCommentForm)

export default withRouter(connect(mapStateToProps, { updateComment, getSingleComment })(EditCommentForm))
