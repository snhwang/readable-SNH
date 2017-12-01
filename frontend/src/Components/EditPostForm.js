import React, { Component } from "react"
import { Field, reduxForm } from 'redux-form'
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom'
import { updatePost, getSinglePost } from '../Actions/posts'
import HomeButton from './HomeButton'


class EditPostForm extends Component {
  componentDidMount() {
    this.props.getSinglePost(this.props.postId)
  }

  submitPost(post) {
    this.props.updatePost(post)
  }

  render() {
    const { handleSubmit, initialValues, pristine, reset, submitting } = this.props

    return (
      <div className={'form-group'}>
        <form onSubmit={handleSubmit(this.submitPost.bind(this))}>
		  <h1> Edit a Post </h1>
		  Edit the fields then click the submit button.
		  <p/>
          <div>
            <label>Title</label>
            <div>
              <Field
				style={{width: 256, height: 64}}
                name="title"
                component="textarea"
                type="text"
				placeholder="Title"
              />
            </div>
          </div>
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
                placeholder="author"
              />
            </div>
          </div>
		  <p/>
          <div>
            <label>Category</label>
            <div>
              <Field name="category" component="select">
                <option />
                <option value="udacity">Udacity</option>
                <option value="react">React</option>
                <option value="redux">Redux</option>
              </Field>
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

function mapStateToProps(state, ownProps) {
  const posts = state.posts
  const singlePost = posts[ownProps.postId]
  return {
    initialValues : singlePost
    
  }
  
}

EditPostForm = reduxForm({
  form: 'editPost',
  enableReinitialize: true
})(EditPostForm)

export default withRouter(connect(mapStateToProps, { updatePost, getSinglePost })(EditPostForm))

