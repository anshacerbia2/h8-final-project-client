const initialstate = {
  users: [],
  user: null,
  provinces: [],
  histories: [],
  cities: [],
  carts: [],
  auctionCarts: [],
  auctions: [],
  isLoading: false,
  isLoadingSubmit: false,
  isLogin: false,
}

export default function userReducer(state = initialstate, action) {
  switch (action.type) {
    case 'histories/fetchSuccess':
      return {
        ...state,
        histories: action.payload
      }
    case 'auctions/fetchSuccess':
      return {
        ...state,
        auctions: action.payload
      }
    case 'user/userSuccess':
      return {
        ...state,
        user: action.payload
      }
    case 'provinces/fetchSuccess':
      return {
        ...state,
        provinces: action.payload
      }
    case 'cities/fetchSuccess':
      return {
        ...state,
        cities: action.payload
      }
    case 'carts/fetchSuccess':
      return {
        ...state,
        carts: action.payload
      }
    case 'auctionCarts/fetchSuccess':
      return {
        ...state,
        auctionCarts: action.payload
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
    case 'login':
      return {
        ...state,
        isLogin: true
      }
    default:
      return state
  }
}

