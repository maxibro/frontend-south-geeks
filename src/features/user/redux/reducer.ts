import initialState from "./initialState";
import { reducer as getReducer } from "./get";
import { reducer as getAllReducer } from "./getAll";
import { reducer as inactiveReducer } from "./inactive";

const reducers = [getReducer, getAllReducer, inactiveReducer];

export default function reducer(state = initialState, action: any) {
  let newState;
  switch (action.type) {
    default:
      newState = state;
      break;
  }
  return reducers.reduce((s, r) => r(s, action), newState);
}
