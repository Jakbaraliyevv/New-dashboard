import React, { useState } from "react";
import {
  UploadOutlined,
  UserAddOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const { Sider } = Layout;

const Saidbar = () => {
  const { coolepseSidebar } = useSelector((state) => state.sidebarSlice);
  const navigate = useNavigate();
  return (
    <Sider trigger={null} collapsible collapsed={coolepseSidebar}>
      <div className="demo-logo-vertical" />
      <Menu
        onClick={(e) => navigate(e.key)}
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["1"]}
        items={[
          {
            key: "/",
            label: "Satatus",
          },
          {
            key: "/home2",
            label: "Fillials status",
          },
          {
            key: "/home3",
            label: "User balance",
          },
          {
            key: "/home4",
            label: "home 4",
          },
        ]}
      />
    </Sider>
  );
};

export default Saidbar;
