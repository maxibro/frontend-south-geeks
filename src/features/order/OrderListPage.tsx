import React, { Component } from "react";
import { Row, Col, Card } from "antd";

import OrderList from "./OrderList";
import { UserType } from "../../models";

export interface IOwnProps {
  role?: UserType;
}
export type OrderListPageProps = IOwnProps;

class OrderListPage extends Component<OrderListPageProps, {}> {
  public render() {
    const { role } = this.props;
    return (
      <div>
        <Card title={"Order List Page"}>
          <Row type="flex" justify="start" align="middle">
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }}>
              <OrderList role={role} />
            </Col>
          </Row>
        </Card>
      </div>
    );
  }
}

export { OrderListPage };
