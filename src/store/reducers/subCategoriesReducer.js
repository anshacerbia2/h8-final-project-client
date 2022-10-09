const initialstate = {
  subCategories: []
}

function subCategoriesReducer(state = initialstate, action) {
  switch (action.type) {
    case 'subCategories/fetchSuccess':
      return {
        ...state,
        subCategories: action.payload
      }
    default:
      return state
  }
}

export default subCategoriesReducer;