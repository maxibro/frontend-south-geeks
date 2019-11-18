import React from "react";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
import { withRouter, RouteComponentProps } from "react-router";
import { FooterLayout } from "./FooterLayout";

const { Content, Header } = Layout;

interface IPageLayoutState {}

interface IPageLayoutStateProps {
  routes: any[];
}

export interface IMatchParams {}

export type PageLayoutProps = IPageLayoutState &
  IPageLayoutStateProps &
  RouteComponentProps<IMatchParams>;

class PageLayout extends React.Component<PageLayoutProps, IPageLayoutState> {
  public state = {
    collapsed: true
  };

  public render() {
    const { children, routes } = this.props;
    const { location } = this.props;

    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Header>
          <Menu theme="dark" mode="horizontal" style={{ lineHeight: "64px" }}>
            {routes.map((route, index) => {
              return (
                route.displayOnMenu && (
                  <Menu.Item
                    key={index.toString()}
                    className={
                      location.pathname === route.path
                        ? "ant-menu-item-selected"
                        : ""
                    }
                  >
                    <Link to={route.path}>{route.name}</Link>
                  </Menu.Item>
                )
              );
            })}
          </Menu>
        </Header>
        <Content style={{ margin: "0 16px" }}>{children}</Content>
        <FooterLayout />
      </Layout>
    );
  }

  private onCollapse = (collapsed: boolean) => {
    this.setState({ collapsed });
  };
}

export default withRouter(PageLayout);
