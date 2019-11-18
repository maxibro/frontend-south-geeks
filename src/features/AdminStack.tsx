import React, { Component } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import { BookListPage } from "./book/BookListPage";
import { BookAddPage } from "./book/BookAddPage";

import { UserListPage } from "./user/UserListPage";
import { OrderListPage } from "./order/OrderListPage";

import SignOut from "./auth/SignOut";

import PageLayout from "./layout/PageLayout";

interface IRoute {
  name: string;
  path: string;
  routeParams?: string;
  component: any;
  displayOnMenu: boolean;
}

class AdminStack extends Component {
  public render() {
    const routes: IRoute[] = [
      {
        path: "/books",
        routeParams: "/:page?",
        component: BookListPage,
        name: "Book Index",
        displayOnMenu: true
      },
      {
        path: "/book/add",
        component: <BookAddPage />,
        name: "Create Book",
        displayOnMenu: false
      },
      {
        path: "/users",
        routeParams: "/:page?",
        component: UserListPage,
        name: "User Index",
        displayOnMenu: true
      },
      {
        path: "/orders",
        routeParams: "/:page?",
        component: OrderListPage,
        name: "Order Index",
        displayOnMenu: true
      },
      {
        path: "/sign-out",
        component: SignOut,
        name: "Admin Log Out",
        displayOnMenu: true
      }
    ];

    return (
      <BrowserRouter>
        <main>
          <PageLayout routes={routes}>
            <Switch>
              <Route
                key={0}
                exact={true}
                path={"/books/:page?"}
                // tslint:disable-next-line: jsx-no-lambda
                render={(props: any) => (
                  <BookListPage {...props} role="admin" />
                )}
              />
              <Route
                key={1}
                exact={true}
                path={"/book/add"}
                component={BookAddPage}
              />
              <Route
                key={2}
                exact={true}
                path={"/users/:page?"}
                component={UserListPage}
              />
              <Route
                key={3}
                exact={true}
                path={"/orders/:page?"}
                // tslint:disable-next-line: jsx-no-lambda
                render={(props: any) => (
                  <OrderListPage {...props} role="admin" />
                )}
              />
              <Route
                key={4}
                exact={true}
                path={"/sign-out"}
                component={SignOut}
              />
              ))}
              <Redirect to="/books" />
            </Switch>
          </PageLayout>
        </main>
      </BrowserRouter>
    );
  }
}

export { AdminStack };
