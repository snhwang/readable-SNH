import C from '../constants'

export function setSortParameter(param) {
  return {
    type: C.SET_SORT_PARAMETER,
    payload: param
  }
}

export function setSortOrder(order) {
  return {
    type: C.SET_SORT_ORDER,
    payload: order
  }
}

export function getSortCriteria() {
  return {
    type: C.GET_SORT_CRITERIA    
  }
}
