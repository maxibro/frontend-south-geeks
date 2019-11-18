import React, { Component } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import { BookListPage } from "./book/BookListPage";

import { OrderListPage } from "./order/OrderListPage";

import SignOut from "./auth/SignOut";

import PageLayout from "./layout/PageLayout";
import { CartListPage } from "./cart/CartListPage";

interface IRoute {
  name: string;
  path: string;
  routeParams?: string;
  component: any;
  displayOnMenu: boolean;
}

class CustomerStack extends Component {
  public render() {
    const routes: IRoute[] = [
      {
        path: "/books",
        routeParams: "/:page?/:search?",
        component: BookListPage,
        name: "Book Index",
        displayOnMenu: true
      },
      {
        path: "/orders",
        routeParams: "/:page?",
        component: OrderListPage,
        name: "My Orders",
        displayOnMenu: true
      },
      {
        path: "/cart",
        component: CartListPage,
        name: "My Cart",
        displayOnMenu: true
      },
      {
        path: "/sign-out",
        component: SignOut,
        name: "Customer Log Out",
        displayOnMenu: true
      }
    ];

    return (
      <BrowserRouter>
        <main>
          <PageLayout routes={routes}>
            <Switch>
              {routes.map((route, index) => (
                <Route
                  key={index.toString()}
                  exact={true}
                  path={route.path.concat(
                    route.routeParams ? route.routeParams : ""
                  )}
                  component={route.component}
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

export { CustomerStack };
