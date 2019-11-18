import React,  {FunctionComponent} from "react";
import { Switch, Route, BrowserRouter, Redirect } from "react-router-dom";
import { SignUpPage } from "./auth/SignUpPage";
import { SignInPage } from "./auth/SignInPage";

import { MainLayout } from "./layout/MainLayout";

const AuthStack: FunctionComponent = () => (
  <BrowserRouter>
    <main>
      <MainLayout>
        <Switch>
          <Route exact={true} path="/" component={SignInPage} />
          <Route exact={true} path="/signUp" component={SignUpPage} />
          <Redirect to="/" />
        </Switch>
      </MainLayout>
    </main>
  </BrowserRouter>
);

export { AuthStack };
