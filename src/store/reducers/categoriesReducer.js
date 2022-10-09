const initialstate = {
  categories: []
}

function categoriesReducer(state = initialstate, action) {
  switch (action.type) {
    case 'categories/fetchSuccess':
      return {
        ...state,
        categories: action.payload
      }
    default:
      return state
  }
}

export default categoriesReducer;