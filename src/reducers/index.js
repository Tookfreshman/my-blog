import { createStore, combineReducers } from 'redux'
import { reducer as requestFlag } from './loadingFlag'
import { reducer as userInfo } from './userInfo'
import { reducer as isLogin } from './isLogin'
import { reducer as authentication } from './authentication'

const reducers = combineReducers({
  loadingFlag: requestFlag,
  userInfo,
  isLogin,
  authentication
})
const store = createStore(reducers)
export default store
