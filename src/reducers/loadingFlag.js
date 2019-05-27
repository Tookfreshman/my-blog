const actionTypes = {
  SET_FLAG: 'SET_FLAG',
  REMOVE_FLAG: 'REMOVE_FLAG'
}

const initialState = false

export function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_FLAG:
      return true
    case actionTypes.REMOVE_FLAG:
      return false
    default:
      return state
  }
}
