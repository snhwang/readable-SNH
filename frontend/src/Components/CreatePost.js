import React, { Component } from 'react';
import { getAllPosts, createNewPost } from '../Actions/posts'
import PostForm from "./PostForm"
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';


class CreatePost extends Component {

  componentDidMount() {
    this.props.dispatch(getAllPosts())
  }

  render() {

    return (
      <div>
        <PostForm onSubmit={() => this.props.dispatch.createNewPost}/>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const {posts} = state
  return {
    posts
  }
}

export default withRouter(connect(mapStateToProps)(CreatePost))
