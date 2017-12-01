import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { CategoryList } from './CategoryList'
import { getAllCategories } from '../Actions/categories'
import { getAllPosts } from '../Actions/posts'
import ShowAndSortPosts from './ShowAndSortPosts'

class ShowCategoriesAndPostsSort extends Component {

  componentDidMount() {
    this.props.dispatch(getAllCategories())
    this.props.dispatch(getAllPosts())
  }

  render() {
    var {categories, posts} = this.props

    return (
      <div className='postlist'>

        <Route exact path='/' render={()=>(
          <div>
            <h1> Categories </h1>
            <CategoryList categories={categories} />
            <h1> Posts </h1>
            <ShowAndSortPosts currentPosts={posts}/>
          </div>  
        )}/>

      </div>
    )
  }
}

ShowCategoriesAndPostsSort.propTypes = {
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
  categories : PropTypes.arrayOf(PropTypes.string).isRequired
}

function mapStateToProps(state) {
  const {categories, posts} = state
  return {
    categories,
    posts
  }
}

export default withRouter(connect(mapStateToProps)(ShowCategoriesAndPostsSort))
