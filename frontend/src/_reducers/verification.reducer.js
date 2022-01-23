import { userConstants } from '../_constants';

export function verification(state = {}, action) {
  switch (action.type) {
    case userConstants.VERIFICATION_REQUEST:
      return { verifying: true };
    case userConstants.VERIFICATION_SUCCESS:
      return {};
    case userConstants.VERIFICATION_FAILURE:
      return {};
    default:
      return state
  }
}