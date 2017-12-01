import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import ListSinglePost from './ListSinglePost'
import { getSinglePost } from '../Actions/posts'
import { getPostComments } from '../Actions/comments'
import ShowCommentsInDetail from './ShowCommentsInDetail'
import HomeButton from './HomeButton'


class ShowPostAndComments extends Component {

  componentDidMount() {
    this.props.getSinglePost(this.props.match.params.postId)
    this.props.getPostComments(this.props.match.params.postId)
  }

  render() {
    const postId = this.props.match.params.postId
    const singlePost = this.props.posts[postId]

    return (
      <div>
        <h1>Single Post with Comments</h1>
        <div>
          Navigation:
          <HomeButton/> 
          <button type="button" onClick={this.props.history.goBack}>
            Back
          </button>
        </div>
        <h3> _________________________________ </h3>
        {singlePost
          ?
            <div>
              <h1>Post</h1>
              <ListSinglePost postId={postId}/>
              <h1>Comments</h1>
              Click to create a new comment: 
              <Link to={`/post/${postId}/newComment`}>
                <button>
                  New Comment
                </button>
              </Link>
              <ShowCommentsInDetail postId={postId}/>
            </div>
          : ""
        }
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

ShowPostAndComments.propTypes = {
  posts : PropTypes.objectOf(
    PropTypes.shape({
      id: PropTypes.string,
      timestamp: PropTypes.integer,
      title: PropTypes.string,
      body: PropTypes.string,
      author: PropTypes.string,
      category: PropTypes.string,
      voteScore: PropTypes.integer,
    })
  ).isRequired,
  comments : PropTypes.objectOf(
    PropTypes.shape({
      id: PropTypes.string,
      parentId: PropTypes.string,
      timestamp: PropTypes.integer,
      body: PropTypes.string,
      author: PropTypes.string,
      voteScore: PropTypes.integer,
    })
  ).isRequired
}

function mapStateToProps(state) {
  const { posts, comments } = state
  return {
    posts,
    comments
  }
}

export default withRouter(connect(mapStateToProps, {getSinglePost, getPostComments})(ShowPostAndComments))
