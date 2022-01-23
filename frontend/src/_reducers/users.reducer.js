import { userConstants } from '../_constants';

export function users(state = {}, action) {
  switch (action.type) {
    
    
    case userConstants.GETONLINECOUNT_REQUEST:
      return {
        loading: true
      };
    case userConstants.GETONLINECOUNT_SUCCESS:
      return{
        message: action.response
      };
    case userConstants.GETONLINECOUNT_FAILURE:
      return{
        error: action.error
      };
    case userConstants.GETNOTVERIFICATEDCOUNT_REQUEST:
      return {
        loading: true
      }
    case userConstants.GETNOTVERIFICATEDCOUNT_SUCCESS:
      return {
        message: action.response
      }
    case userConstants.GETNOTVERIFICATEDCOUNT_ERROR:
      return{
        error: action.error
      }
    default:
      return state
  }
}