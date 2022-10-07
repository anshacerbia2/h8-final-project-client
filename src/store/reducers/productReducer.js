const initialstate = {
  products: [],
}

export default function productReducer(state = initialstate, action) {
  switch (action.type) {
    case 'products/fetchSuccess':
      return {
        ...state,
        products: action.payload
      }
    default:
      return state
  }
}