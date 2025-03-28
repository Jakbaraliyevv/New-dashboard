import React, { useState, useEffect } from "react";
import { Layout, Menu } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import {
  setCoolepseSidebar,
  resetSidebarState,
} from "../../redux/sidebar-slice";

const { Sider } = Layout;

const Saidbar = () => {
  const { coolepseSidebar } = useSelector((state) => state.sidebarSlice);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      const screenWidth = window.innerWidth;
      const newIsMobile = screenWidth < 600;

      setIsMobile(newIsMobile);
      if (newIsMobile) {
        dispatch(setCoolepseSidebar(true)); // Mobil ekranlarda default yopiq
      }
    };

    // Dastlabki tekshiruv
    checkScreenSize();

    // Ekran o'lchamini o'zgarishini kuzatish
    window.addEventListener("resize", checkScreenSize);

    // Cleanup
    return () => window.removeEventListener("resize", checkScreenSize);
  }, [dispatch]);

  // Sahifa o'zgarganda sidebar holatini tiklash
  useEffect(() => {
    dispatch(resetSidebarState());
  }, [location.pathname, dispatch]);

  // Mobile ekranda sidebar yopilganda
  const handleSidebarClose = () => {
    dispatch(setCoolepseSidebar(true));
  };

  return (
    <>
      {/* Mobile ekranda sidebar ochiq bo'lganda ekranning qolgan qismini yopish uchun overlay */}
      {isMobile && !coolepseSidebar && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: 999,
          }}
          onClick={handleSidebarClose}
        />
      )}

      <Sider
        collapsible
        collapsed={coolepseSidebar}
        width={200}
        style={{
          position: isMobile ? "fixed" : "static",
          height: "100vh",
          left: isMobile && coolepseSidebar ? "-200px" : "0",
          zIndex: 1000,
          transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        {/* Mobile ekranda yopish tugmasi */}
        {isMobile && !coolepseSidebar && (
          <div
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              zIndex: 1001,
            }}
          >
            <CloseOutlined
              onClick={handleSidebarClose}
              style={{
                fontSize: "20px",
                color: "#fff",
                cursor: "pointer",
              }}
            />
          </div>
        )}

        <div className="demo-logo-vertical" />
        <Menu
          onClick={(e) => {
            navigate(e.key);
            // Mobile ekranlarda menu elementiga bosganda yopiladi
            if (isMobile) {
              handleSidebarClose();
            }
          }}
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            { key: "/", label: "Status" },
            { key: "/home2", label: "Fillials status" },
            { key: "/home3", label: "User balance" },
            { key: "/home4", label: "Home 4" },
          ]}
        />
      </Sider>
    </>
  );
};

export default Saidbar;
