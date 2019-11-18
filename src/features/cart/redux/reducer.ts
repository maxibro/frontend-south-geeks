import initialState from "./initialState";
import { reducer as addToCartReducer } from "./addToCart";
import { reducer as removeCartReducer } from "./removeCart";
import { reducer as retrieveCartReducer } from "./retrieveCart";

const reducers = [removeCartReducer, retrieveCartReducer, addToCartReducer];

export default function reducer(state = initialState, action: any) {
  let newState;
  switch (action.type) {
    // Handle cross-topic actions here
    default:
      newState = state;
      break;
  }
  return reducers.reduce((s, r) => r(s, action), newState);
}
