import {
  LOAD_POST_FAILURE,
  LOAD_POST_REQUEST,
  LOAD_POST_SUCCESS,
} from '../types';

const initialState = {
  isAuthenticated: null,
  posts: [],
  postDetail: '',
  postCount: '',
  loading: false,
  error: '',
  creatorId: '',
  categoryFindResult: '',
  title: '',
  searchBy: '',
  searchResult: '',
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_POST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LOAD_POST_SUCCESS:
      return {
        ...state,
        posts: [...state.posts, ...action.payload],
        loading: false,
      };
    case LOAD_POST_FAILURE:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export default postReducer;
