import { combineReducers } from "redux-immutable";
import { reducer as formReducer } from "redux-form/immutable";
// import drawerReducer from "../components/drawer/redux/reducer";
import authReducer from "./../features/auth/redux/reducer";
import bookReducer from "./../features/book/redux/reducer";
import userReducer from "./../features/user/redux/reducer";
import orderReducer from "./../features/order/redux/reducer";
import cartReducer from "./../features/cart/redux/reducer";

const reducerMap = {
  form: formReducer,
  auth: authReducer,
  // drawer: drawerReducer,
  // auth: authReducer,
  book: bookReducer,
  user: userReducer,
  order: orderReducer,
  cart: cartReducer
};

export default combineReducers(reducerMap);
