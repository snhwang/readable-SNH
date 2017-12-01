import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

import { getSinglePost } from '../Actions/posts'
import EditPostForm from "./EditPostForm"

class EditPost extends Component {

  componentDidMount() {
    this.props.getSinglePost(this.props.match.params.postId)
  }

  render() {
    return (
      <div>
        <EditPostForm postId={this.props.match.params.postId}/>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const posts = state.posts
  return {
    posts
  }
}

export default withRouter(connect(mapStateToProps, {getSinglePost})(EditPost))

