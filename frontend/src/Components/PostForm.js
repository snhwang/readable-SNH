import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from "react-redux";

import { createNewPost } from '../Actions/posts'
import HomeButton from './HomeButton'

export const PostForm = ( props ) =>
  <div>
    <form onSubmit={props.handleSubmit(props.createNewPost.bind(this))}>
      <h1> Create a New Post </h1>
      Fill in the fields then click the submit button.
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
            placeholder="Author"
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
        <button type="submit" disabled={props.pristine || props.submitting}>
          Submit  
        </button>
        <button type="button" disabled={props.pristine || props.submitting} onClick={props.reset}>
          Clear Values
        </button>
        <p/>
        <div>
          Navigation:
          <HomeButton/> 
          <button type="button" onClick={props.history.goBack}>
            Back
          </button>              
        </div>
      </div>
    </form>
  </div>

export default reduxForm({
  form: 'newPost', // a unique identifier for this form
  initialValues: {
    deleted : false
  }
})(connect(null, { createNewPost })(PostForm))
