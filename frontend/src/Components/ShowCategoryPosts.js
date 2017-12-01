import React, { Component } from 'react'
import _ from 'lodash'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import ShowAndSortPosts from './ShowAndSortPosts'
import { getCategoryPosts } from '../Actions/posts'
import HomeButton from './HomeButton'

class ShowCategoryPosts extends Component {

  componentDidMount() {
    this.props.getCategoryPosts(this.props.match.params.category)
  }

  render() {
    const categoryPosts = Object.assign(
      {},
      _.filter(this.props.posts,
        post => post.category === this.props.match.params.category)
    )

    return (
      <div>
        <h1> Category: {this.props.match.params.category} </h1>
        <div>
          Navigation:
          <HomeButton/> 
          <button type="button" onClick={this.props.history.goBack}>
            Back
          </button>
        </div>
        <ShowAndSortPosts currentPosts = {categoryPosts}/>
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

ShowCategoryPosts.propTypes = {
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
}

function mapStateToProps(state) {
  const posts = state.posts
  return {
    posts
  }
}

export default withRouter(connect(mapStateToProps, { getCategoryPosts })(ShowCategoryPosts))
