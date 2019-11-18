import "reflect-metadata";
import axios from "axios";
import React, { Component } from "react";
import * as Immutable from "immutable";
import { Provider } from "react-redux";
import configStore from "./common/configStore";
import { message } from "antd";
import UiAuthenticationChecker from './features/auth/UiAuthenticationChecker';

const token = localStorage.getItem("token");
const role = localStorage.getItem("role");
let initialState = Immutable.fromJS({});
if (token !== null && role !== null) {
  const key = "Authorization";
  axios.defaults.headers.common[key] = `Bearer ${token}`;
  initialState = Immutable.fromJS({ auth: { token: token, role: role } });
}

const store = configStore(initialState);


message.config({
  top: 24,
  duration: 1.5,
  maxCount: 3
});

interface IAppState {
  loading: boolean;
}
class App extends Component<{}, IAppState> {
  public render() {
    // const UiAuthenticationChecker: any = require("./features/auth/UiAuthenticationChecker");
    return (
      
      <Provider store={store}>
          <UiAuthenticationChecker />
      </Provider>
    );
  }

}

export default App;
