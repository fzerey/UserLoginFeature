import { userConstants } from '../_constants';

export function retrieval(state = {}, action) {
  switch (action.type) {
    case userConstants.RETRIEVAL_REQUEST:
      return { retrieving: true };
    case userConstants.RETRIEVAL_SUCCESS:
      return {};
    case userConstants.RETRIEVAL_FAILURE:
      return {};
    default:
      return state
  }
}