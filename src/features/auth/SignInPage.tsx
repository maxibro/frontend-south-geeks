import React, { Component } from "react";
import SignInForm from "./SignInForm";
import { Row, Col, Card } from "antd";

class SignInPage extends Component {
  public render() {
    return (
      <Card title="Sign in">
        <Row type="flex" justify="space-around" align="middle">
          <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }}>
            <SignInForm />
          </Col>
        </Row>
      </Card>
    );
  }
}

export { SignInPage };
