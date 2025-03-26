// import React from "react";

// const MainLayout = () => {
//   return <div>

//   </div>;
// };

// export default MainLayout;
// //hohlasen apppni kodini shetta yozsen boladi Aziz

import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Layout, theme } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { setCoolepseSidebar } from "../../redux/sidebar-slice";
import Saidbar from "../saidbar";
const { Header, Content } = Layout;
const MainLayout = () => {
  const dispatch = useDispatch();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const { coolepseSidebar } = useSelector((state) => state.sidebarSlice);
  return (
    <Layout className="h-screen">
      <Saidbar />
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={
              coolepseSidebar ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />
            }
            onClick={() => dispatch(setCoolepseSidebar())}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            // background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default MainLayout;
