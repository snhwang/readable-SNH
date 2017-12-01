import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import _ from 'lodash'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import FormatTimestamp from '../Utils/FormatTimestamp'
import { voteComment, deleteComment, getPostComments } from '../Actions/comments'
import HomeButton from './HomeButton'
import { getSortCriteria, setSortParameter, setSortOrder } from '../Actions/sorting'

class ShowCommentsInDetail extends Component {

  componentDidMount() {
    this.props.getPostComments(this.props.postId)
    this.props.getSortCriteria()
 }

// Changes the sort parameter. Called by the drop down selection
  changeSortParameter = (e) => (
    this.props.setSortParameter(e.target.value)
  )

// Changes the sort order. Called by the drop down selection
  changeSortOrder = (e) => (
    this.props.setSortOrder(e.target.value)
  )

  render() {
    var { comments, sortCriteria } = this.props
    var currentComments = _.filter(comments, comment => comment.parentId === this.props.postId )
    currentComments = _.orderBy(currentComments, [sortCriteria.sortParameter], [sortCriteria.sortOrder])
    
    return (

      <div>
        <div>
          Select sort parameter:
          <select defaultValue={sortCriteria.sortParameter} onChange={this.changeSortParameter}>
            <option value="voteScore">Vote Score</option>
            <option value="author">Author</option>
            <option value="timestamp">Time Stamp</option>
          </select>
        </div>
        <div>
          Select sort order: 
          <select defaultValue={sortCriteria.sortOrder} onChange={this.changeSortOrder}>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
        {currentComments
          ?
          currentComments.map((comment) => (
            <ul key={comment.id} >
              <h3> ID: {comment.id} </h3>
			  <h3> Parent ID: {comment.parentId} </h3>
              <h3> Timestamp: {FormatTimestamp(comment.timestamp)} </h3>
              <h3> Body: {comment.body} </h3>
              <h3> Author: {comment.author} </h3>
              <h3> Vote Score: {comment.voteScore}</h3>
              <button type="button" onClick={() => this.props.voteComment(comment.id, 'upVote')}>
                Up Vote
              </button>
              <button type="button" onClick={() => this.props.voteComment(comment.id, 'downVote')}>
                Down Vote
              </button>
              <Link
                to={`/editComment/${comment.id}`}>
                <button>
                  Edit Comment
                </button>
              </Link>
              <button type="button" onClick={() => this.props.deleteComment(comment.id)}>
                Delete Comment
              </button>
              <div>
                Navigation:
                <HomeButton/> 
                <button type="button" onClick={this.props.history.goBack}>
                  Back
                </button>
              </div>
              <h3> _________________________________ </h3>
            </ul>
          ))
          : 'None'
        }
      </div>
    )
  }
}

ShowCommentsInDetail.propTypes = {
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
  ).isRequired,
  sortCriteria : PropTypes.shape({
    sortParameter: PropTypes.string,
    sortOrder: PropTypes.oneOf(['desc', 'asc']),
  }).isRequired
}

function mapStateToProps(state) {
  const { comments, sortCriteria } = state
  return {
    comments,
    sortCriteria
  }
}

export default withRouter(connect(mapStateToProps, {getPostComments, getSortCriteria, voteComment, deleteComment, setSortParameter, setSortOrder})(ShowCommentsInDetail))