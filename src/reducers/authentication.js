const actionTypes = {
  SETSTATUS: 'SETSTATUS'
}

const initialState = false

export function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SETSTATUS:
      return action.data
    default:
      return state
  }
}
