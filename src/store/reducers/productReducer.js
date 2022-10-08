const initialstate = {
  products: [],
  product: {}
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
    default:
      return state
  }
}