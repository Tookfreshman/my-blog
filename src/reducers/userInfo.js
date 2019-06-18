import storage from '@/utils/storage'
const actionTypes = {
  ADD_USERINFO: 'ADD_USERINFO',
  REMOVE_USER_INFO: 'REMOVE_USER_INFO',
  GET_USER_INFO: 'GET_USER_INFO'
}

const initialState = {}

export function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.ADD_USERINFO:
      let data = {
        ...state,
        ...action.data
      }
      storage.ls.set('userInfo', data)
      return {
        ...state,
        ...action.data
      }
    case actionTypes.REMOVE_USER_INFO:
      storage.ls.set('userInfo', null)
      return {}
    case actionTypes.GET_USER_INFO:
      return state
    default:
      return state
  }
}
