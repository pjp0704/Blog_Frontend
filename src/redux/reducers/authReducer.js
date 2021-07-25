import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  CLEAR_ERROR_REQUEST,
  CLEAR_ERROR_SUCCESS,
  CLEAR_ERROR_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
} from '../types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  isLoading: false,
  user: '',
  userId: '',
  userName: '',
  userRole: '',
  errorMsg: '',
  successMsg: '',
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case LOGOUT_REQUEST:
    case REGISTER_REQUEST:
      return {
        ...state,
        errorMsg: '',
        isLoading: true,
      };

    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false,
        userId: action.payload.user.id,
        userRole: action.payload.user.role,
        errorMsg: '',
      };

    case LOGIN_FAILURE:
    case LOGOUT_FAILURE:
    case REGISTER_FAILURE:
      localStorage.removeItem('token');
      return {
        ...state,
        ...action.payload,
        token: null,
        user: null,
        userId: null,
        isAuthenticated: false,
        isLoading: false,
        userRole: null,
        errorMsg: action.payload.data.msg,
      };

    case LOGOUT_SUCCESS:
      localStorage.removeItem('token');
      return {
        ...state,
        ...action.payload,
        token: null,
        user: null,
        userId: null,
        isAuthenticated: false,
        isLoading: false,
        userRole: null,
        errorMsg: '',
      };

    case LOAD_USER_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case LOAD_USER_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload,
        userId: action.payload._id,
        userName: action.payload.name,
        userRole: action.payload.role,
      };

    case LOAD_USER_FAILURE:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        userRole: '',
      };

    case CLEAR_ERROR_REQUEST:
      return {
        ...state,
      };

    case CLEAR_ERROR_SUCCESS:
      return {
        ...state,
        errorMsg: '',
        previousMatchMsg: '',
      };

    case CLEAR_ERROR_FAILURE:
      return {
        ...state,
        errorMsg: 'Clear Error Fail',
        previousMatchMsg: 'Clear Error Fail',
      };

    default:
      return state;
  }
};

export default authReducer;
