import { createStore, combineReducers } from 'redux'
import { reducer as requestFlag } from './loadingFlag'

const reducers = combineReducers({ loadingFlag: requestFlag })
const store = createStore(reducers)
export default store
