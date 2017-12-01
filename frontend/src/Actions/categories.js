import {api_server, headers} from './api-server-params'
import C from '../constants'

// Get the categories from the server
// Convert result to an array of strings
const getAllCategoriesServer = () =>
  fetch(`${api_server}/categories`, { headers })
    .then(response => response.json())
    .then(response => response.categories)
    .then(categories => categories.map(obj => obj.name))

// Server call with bound action creator.
// Get the posts for a specified category
export const getAllCategories = () => {
  return (dispatch) => {
    getAllCategoriesServer().then(
      categories => dispatch({
        type: C.GET_ALL_CATEGORIES,
        categories          
      })
    )
  }
}