import React, { Component } from "react";
import { Row, Col, Card } from "antd";
import BookForm from "./BookForm";

class BookAddPage extends Component<any, {}> {
  public render() {
    return (
      <div>
        <Card title={"Create Book"}>
          <Row type="flex" justify="space-around" align="middle">
            <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }}>
              <BookForm />
            </Col>
          </Row>
        </Card>
      </div>
    );
  }
}

export { BookAddPage };
