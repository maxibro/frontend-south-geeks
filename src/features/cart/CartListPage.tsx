import React, { Component } from "react";
import { Row, Col, Card } from "antd";
import { RouteComponentProps } from "react-router";

import CartList from "./CartList";

export interface IOwnProps {}

export interface IMatchParams {}

export type CartListPageProps = IOwnProps & RouteComponentProps<IMatchParams>;

class CartListPage extends Component<CartListPageProps, {}> {
  public render() {
    return (
      <div>
        <Card title={"My Cart"}>
          <Row type="flex" justify="start" align="middle">
            <Col xs={{ span: 12 }} sm={{ span: 12 }} md={{ span: 12 }}>
              <CartList />
            </Col>
          </Row>
        </Card>
      </div>
    );
  }
}

export { CartListPage };
