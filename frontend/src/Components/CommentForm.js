import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from "react-redux";
import { createNewComment } from '../Actions/comments'
import HomeButton from './HomeButton'
const uuidv1 = require('uuid/v1')

class CommentForm extends Component {

  onSubmit(comment) {
    comment.id = uuidv1()
    comment.timestamp = Date.now()
    comment.parentId = this.props.match.params.postId
    comment.voteScore = 1
    comment.delete = false
    comment.parentDelete = false
    this.props.createNewComment(comment)
  }

  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props

    return (
      <div>
        <h1> Create New Comment </h1>
        Enter data into the fields and click submit.
      	<p/>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <div>
            <label>Body</label>
            <div>
              <Field
				style={{width: 256, height: 256}}
                name="body"
                component="textarea"
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
                placeholder="author"
              />
            </div>
          </div>
          <p/>
          <div>
            <button type="submit" disabled={pristine || submitting}>
              Submit
            </button>
            <button type="button" disabled={pristine || submitting} onClick={reset}>
              Clear Values
            </button>
            <div>
              Navigation:
              <HomeButton/> 
              <button type="button" onClick={this.props.history.goBack}>
                Back
              </button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

export default reduxForm({
  form: 'newComment' // a unique identifier for this form
})(connect(null, { createNewComment })(CommentForm))
