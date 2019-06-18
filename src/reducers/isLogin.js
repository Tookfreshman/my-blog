const actionTypes = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT'
}

const initialState = false

export function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.LOGIN:
      return true
    case actionTypes.LOGOUT:
      return false
    default:
      return state
  }
}
