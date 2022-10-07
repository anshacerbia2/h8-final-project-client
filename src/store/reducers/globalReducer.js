const initialstate = {
  users: [],
  isLoading: false,
  isLoadingSubmit: false,
  isLogin: false,
}

export default function userReducer(state = initialstate, action) {
  switch (action.type) {
    case 'users/registerSuccess':
      return {
        ...state,
        users: action.payload
      }
    case 'loading/true':
      return {
        ...state,
        isLoading: true
      }
    case 'loading/false':
      return {
        ...state,
        isLoading: false
      }
    case 'loadingSubmit/true':
      return {
        ...state,
        isLoadingSubmit: true
      }
    case 'loadingSubmit/false':
      return {
        ...state,
        isLoadingSubmit: false
      }
    default:
      return state
  }
}

