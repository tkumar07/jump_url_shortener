const urlReducer = (state, action) => {
    switch (action.type) {
      case 'GET_URLS':
        return {
          ...state,
          urls: action.payload,
          loading: false
        };
      case 'ADD_URL':
        return {
          ...state,
          urls: [action.payload, ...state.urls],
          loading: false
        };
      case 'URL_ERROR':
        return {
          ...state,
          error: action.payload,
          loading: false
        };
      default:
        return state;
    }
  };
  
  export default urlReducer;