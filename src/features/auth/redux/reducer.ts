import initialState from "./initialState";
import { reducer as signInReducer } from "./signIn";
import { reducer as signUpReducer } from "./signUp";
import { reducer as signOutReducer } from "./signOut";

const reducers = [signInReducer, signOutReducer,signUpReducer];

export default function reducer(state = initialState, action: any) {
  let newState;
  switch (action.type) {
    default:
      newState = state;
      break;
  }
  return reducers.reduce((s, r) => r(s, action), newState);
}
