import { legacy_createStore as createStore, applyMiddleware, combineReducers } from 'redux'
import authentication from './middlewares/authentication'
import thunk from 'redux-thunk'
import productReducer from './reducers/productReducer'
import globalReducer from './reducers/globalReducer'
import subCategoriesReducer from './reducers/subCategoriesReducer'

const reducers = combineReducers({
  globalReducer,
  productReducer,
  subCategoriesReducer
})

let store = createStore(reducers, applyMiddleware(authentication, thunk));

export default store;