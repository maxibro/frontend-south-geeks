import React from "react";
import { Layout } from "antd";
import { MainHeader } from "./MainHeader";
import { FooterLayout } from "./FooterLayout";
const { Content } = Layout;

interface IMainLayoutState {}

class MainLayout extends React.Component<{}, IMainLayoutState> {
  public render() {
    const { children } = this.props;
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Layout>
          <MainHeader />
          <Content style={{ margin: "16px 16px" }}>{children}</Content>
          <FooterLayout />
        </Layout>
      </Layout>
    );
  }
}

export { MainLayout };
