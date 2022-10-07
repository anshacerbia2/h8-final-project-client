import { legacy_createStore as createStore, applyMiddleware, combineReducers } from 'redux'
import authentication from './middlewares/authentication'
import thunk from 'redux-thunk'
import productReducer from './reducers/productReducer'
import globalReducer from './reducers/globalReducer'

const reducers = combineReducers({
  globalReducer,
  productReducer,
})

let store = createStore(reducers, applyMiddleware(authentication, thunk));

export default store;