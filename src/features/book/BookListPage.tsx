import React, { Component } from "react";
import { Row, Col, Card, Button } from "antd";

import { Link } from "react-router-dom";
import BookList from "./BookList";
import { UserType } from "../../models";

export interface IOwnProps {
  role?: UserType;
}

export type BookListPageProps = IOwnProps;

class BookListPage extends Component<BookListPageProps, {}> {
  public render() {
    const { role } = this.props;
    return (
      <div>
        <Card title={"Book List Page"}>
          {role === UserType.admin && (
            <Row type="flex" justify="end">
              <Col>
                <Link to={"/book/add"}>
                  <Button type="primary" icon="plus" shape="circle" />
                </Link>
              </Col>
            </Row>
          )}
          <Row type="flex" justify="start" align="middle">
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }}>
              <BookList role={role} />
            </Col>
          </Row>
        </Card>
      </div>
    );
  }
}

export { BookListPage };
