import { createStore, combineReducers } from 'redux'
import { reducer as requestFlag } from './loadingFlag'
import { reducer as userInfo } from './userInfo'

const reducers = combineReducers({ loadingFlag: requestFlag, userInfo })
const store = createStore(reducers)
export default store
