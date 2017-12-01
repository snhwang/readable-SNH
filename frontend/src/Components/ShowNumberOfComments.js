import React, { Component } from 'react';
import _ from "lodash"
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { getPostComments } from '../Actions/comments'

class ShowNumberOfComments extends Component {

  componentDidMount() {
    this.props.getPostComments(this.props.postId)
  }

  render() {

    const { postId, comments } = this.props

    const numComments = (comments
      ? Object.keys(_.filter(comments, comment => comment.parentId === postId)).length
      : 0)

    return (
      <h3>
          Number of Comments: {numComments}
      </h3>
    )
  }
}

ShowNumberOfComments.propTypes = {
  postId: PropTypes.string.isRequired,
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


//Returned values show up as props
function mapStateToProps(state, ownProps) {
  const { comments} = state
  return {
    comments
  }
}

export default withRouter(connect(mapStateToProps, { getPostComments })(ShowNumberOfComments))
