import React from "react";
import { Layout } from "antd";

const { Footer } = Layout;

const FooterLayout: React.SFC = () => {
  return (
    <Footer style={{ textAlign: "center" }}>
      <h2>The Book Store</h2>
       ©2019 Brochon Maximiliano
    </Footer>
  );
};

export { FooterLayout };
