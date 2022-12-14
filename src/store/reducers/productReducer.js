const initialstate = {
  products: [],
  product: {},
  productsLatest: [],
  userProducts: [],
  productsByTitle: []
}

export default function productReducer(state = initialstate, action) {
  switch (action.type) {
    case 'products/fetchSuccess':
      return {
        ...state,
        products: action.payload
      }
    case 'product/fetchSuccess':
      return {
        ...state,
        product: action.payload
      }
    case 'userProducts/fetchSuccess':
      return {
        ...state,
        userProducts: action.payload
      }
    case 'products/searchByTitle':
      return {
        ...state,
        productsByTitle: action.payload
      }
    case 'productsLatest/fetchSuccess':
      return {
        ...state,
        productsLatest: action.payload
      }
    default:
      return state
  }
}