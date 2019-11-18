import React, { Component } from "react";
import { Row, Col, Card } from "antd";
import { RouteComponentProps } from "react-router";

import UserList from "./UserList";

export type UserListPageProps = RouteComponentProps<any>;

class UserListPage extends Component<UserListPageProps, {}> {
  public render() {
    return (
      <div>
        <Card title={"User List Page"}>
          <Row type="flex" justify="start" align="middle">
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }}>
              <UserList />
            </Col>
          </Row>
        </Card>
      </div>
    );
  }
}

export { UserListPage };
