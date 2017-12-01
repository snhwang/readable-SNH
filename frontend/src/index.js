import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import registerServiceWorker from './registerServiceWorker';
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { Route, BrowserRouter, Switch } from 'react-router-dom'

import reducer from './Reducers'
import PostForm from './Components/PostForm'
import EditPost from './Components/EditPost'
import CommentForm from './Components/CommentForm'
import EditComment from './Components/EditComment'
import ShowCategoriesAndPostsSort from './Components/ShowCategoriesAndPostsSort'
import ShowCategoryPosts from './Components/ShowCategoryPosts'
import ShowPostAndComments from './Components/ShowPostAndComments'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const logger = store => next => action => {
  console.log(action)
  console.group(action.type)
  console.info('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  console.groupEnd(action.type)
  return result
}

const store = createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(thunk, logger)
  )
)

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Switch>
          <Route path = '/newPost' component={PostForm} />
          <Route path = '/editPost/:postId' component={EditPost} />
          <Route path = '/post/:postId/newComment' component={CommentForm} />
          <Route path = '/editComment/:commentId' component={EditComment} />
          <Route path ='/:category/:postId' component={ShowPostAndComments} />
          <Route path='/:category' component={ShowCategoryPosts} />
          <Route exact path='/' component={ShowCategoriesAndPostsSort} />  
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)

registerServiceWorker();