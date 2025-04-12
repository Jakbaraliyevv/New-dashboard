// import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
// import { Button, Layout, theme } from "antd";
// import { useDispatch, useSelector } from "react-redux";
// import { Outlet } from "react-router-dom";
// import { setCoolepseSidebar } from "../../redux/sidebar-slice";
// import Saidbar from "../saidbar";
// const { Header, Content } = Layout;

// const MainLayout = () => {
//   const dispatch = useDispatch();
//   const {
//     token: { colorBgContainer, borderRadiusLG },
//   } = theme.useToken();
//   const { coolepseSidebar } = useSelector((state) => state.sidebarSlice);

//   return (
//     <Layout className="h-screen">
//       <Saidbar />
//       <Layout>
//         <Header
//           style={{
//             padding: 0,
//             background: colorBgContainer,
//             top: 0,
//             position: "sticky",
//             zIndex: 29,
//           }}
//         >
//           <Button
//             type="text"
//             icon={
//               coolepseSidebar ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />
//             }
//             onClick={() => dispatch(setCoolepseSidebar())}
//             style={{
//               fontSize: "16px",
//               width: 64,
//               height: 64,
//             }}
//           />
//         </Header>
//         <Content
//           style={{
//             margin: "24px 16px",
//             padding: 24,
//             minHeight: "100%",
//             borderRadius: borderRadiusLG,
//           }}
//         >
//           <Outlet />
//         </Content>
//       </Layout>
//     </Layout>
//   );
// };

// export default MainLayout;
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Layout, theme } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { setCoolepseSidebar } from "../../redux/sidebar-slice";
import Saidbar from "../saidbar";
import { useState, useEffect } from "react";

const { Header, Content } = Layout;

const MainLayout = () => {
  const dispatch = useDispatch();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const { coolepseSidebar } = useSelector((state) => state.sidebarSlice);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      const screenWidth = window.innerWidth;
      setIsMobile(screenWidth < 600);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <Layout className="h-screen">
      <Saidbar />
      <Layout
        style={{
          // Desktop holatda sidebar ochiq bo'lsa 200px, yopiq bo'lsa 80px, mobil holatda 0
          marginLeft: isMobile ? 0 : coolepseSidebar ? 80 : 200,
          transition: "margin-left 0.2s ease-in-out",
          width: "100%",
        }}
      >
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            position: "sticky",
            top: 0,
            zIndex: 29,
            width: "100%",
            boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
            display: "flex",
            alignItems: "center",
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
          <span
            style={{ fontWeight: "bold", fontSize: "18px", marginLeft: "10px" }}
          >
            Filial Dashboard
          </span>
        </Header>
        <Content
          style={{
            // margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            // borderRadius: borderRadiusLG,
            overflow: "auto",
            // background: colorBgContainer,
            // boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
