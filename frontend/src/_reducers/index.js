import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { verification } from './verification.reducer';
import { retrieval } from './retrieval.reducer';
import { users } from './users.reducer';
import { alert } from './alert.reducer';

const rootReducer = combineReducers({
  authentication,
  registration,
  verification,
  retrieval,
  users,
  alert
});

export default rootReducer;