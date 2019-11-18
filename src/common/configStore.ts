import { createStore, Middleware, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./rootReducer";
import { createLogger } from "redux-logger";

const middlewareArr: Middleware[] = [thunk];
let devToolsExtension = (f: any) => f;

// tslint:disable
interface Window {
  devToolsExtension: any;
}

/* istanbul ignore if  */
if (process.env.NODE_ENV === "development") {
  const logger = createLogger({
    collapsed: true,
    stateTransformer: state => {
      return state.toJS();
    }
    // stateTransformer: state => {
    //   if (Iterable.isIterable(state)) return state.toJS();
    //   else return state;
    // }
  });
  middlewareArr.push(logger);
  if (window.__REDUX_DEVTOOLS_EXTENSION__) {
    devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__();
  }
}

export default function configStore(initialState: object) {
  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(...middlewareArr),
      devToolsExtension
    )
  );

  return store;
}
