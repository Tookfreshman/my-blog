const actionTypes = {
  ADD_USERINFO: 'ADD_USERINFO',
  REMOVE_USER_INFO: 'REMOVE_USER_INFO'
}

const initialState = {}

export function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.ADD_USERINFO:
      return {
        ...state,
        ...action.data
      }
    case actionTypes.REMOVE_USER_INFO:
      return {}
    default:
      return state
  }
}
