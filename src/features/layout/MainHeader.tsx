import React from "react";
import { Layout } from "antd";

const { Header } = Layout;

class MainHeader extends React.Component {
  public render() {
    return (
      <Header className="main-header" style={{ textAlign: "center" }}>
        <h4>The Book Store</h4>
      </Header>
    );
  }
}

export { MainHeader };
