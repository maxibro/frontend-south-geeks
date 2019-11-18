import React, { Component } from "react";
import SignUpForm from "./SignUpForm";
import { Row, Col, Card } from "antd";

class SignUpPage extends Component {
  public render() {
    return (
      <Card title="Sign Up">
        <Row type="flex" justify="space-around" align="middle">
          <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }}>
            <SignUpForm />
          </Col>
        </Row>
      </Card>
    );
  }
}

export { SignUpPage };
