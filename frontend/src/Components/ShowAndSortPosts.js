import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import _ from 'lodash'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

import { getSortCriteria, setSortParameter, setSortOrder } from '../Actions/sorting'
import { votePost } from '../Actions/posts'
import ListSinglePost from './ListSinglePost'

class ShowAndSortPosts extends Component {

  componentDidMount() {
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
    var currentPosts = this.props.currentPosts
    const sortCriteria = this.props.sortCriteria

    currentPosts = _.orderBy(currentPosts, [sortCriteria.sortParameter], [sortCriteria.sortOrder])
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
        Click to create a new post:
        <Link to='/newPost'>
          <button>
            Create New Post
          </button>
        </Link>
        {Object.keys(currentPosts).length > 0
          ?
          _.map(currentPosts, post => (
            <li key={post.id} >
              <div>
                <p> Current post is {post.id} </p>
                {post ?
                  <ListSinglePost postId={post.id}/>
                  : ""
                }
              </div>
            </li>
          ))
          : <p> No posts </p>
        }
      </div>  
    )
  }
}

ShowAndSortPosts.propTypes = {
  currentPosts : PropTypes.objectOf(
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
  sortCriteria : PropTypes.shape({
    sortParameter: PropTypes.string,
    sortOrder: PropTypes.oneOf(['desc', 'asc']),
  }).isRequired
}

function mapStateToProps(state) {
  const { sortCriteria } = state
  return {
    sortCriteria
  }
}

export default withRouter(connect(mapStateToProps, {getSortCriteria, setSortParameter, setSortOrder, votePost})(ShowAndSortPosts))
