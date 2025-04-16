// import React, { useState, useEffect } from "react";
// import { Layout, Menu } from "antd";
// import { CloseOutlined } from "@ant-design/icons";
// import { useSelector, useDispatch } from "react-redux";
// import { useNavigate, useLocation } from "react-router-dom";
// import {
//   setCoolepseSidebar,
//   resetSidebarState,
// } from "../../redux/sidebar-slice";

// const { Sider } = Layout;

// const Saidbar = () => {
//   const { coolepseSidebar } = useSelector((state) => state.sidebarSlice);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [isMobile, setIsMobile] = useState(false);

//   useEffect(() => {
//     const checkScreenSize = () => {
//       const screenWidth = window.innerWidth;
//       const newIsMobile = screenWidth < 600;

//       setIsMobile(newIsMobile);
//       if (newIsMobile) {
//         dispatch(setCoolepseSidebar(true)); // Mobil ekranlarda default yopiq
//       }
//     };

//     // Dastlabki tekshiruv
//     checkScreenSize();

//     // Ekran o'lchamini o'zgarishini kuzatish
//     window.addEventListener("resize", checkScreenSize);

//     // Cleanup
//     return () => window.removeEventListener("resize", checkScreenSize);
//   }, [dispatch]);

//   // Sahifa o'zgarganda sidebar holatini tiklash
//   useEffect(() => {
//     dispatch(resetSidebarState());
//   }, [location.pathname, dispatch]);

//   // Mobile ekranda sidebar yopilganda
//   const handleSidebarClose = () => {
//     dispatch(setCoolepseSidebar(true));
//   };

//   return (
//     <>
//       {/* Mobile ekranda sidebar ochiq bo'lganda ekranning qolgan qismini yopish uchun overlay */}
//       {isMobile && !coolepseSidebar && (
//         <div
//           style={{
//             position: "fixed",
//             top: 0,
//             left: 0,
//             right: 0,
//             bottom: 0,
//             backgroundColor: "rgba(0,0,0,0.5)",
//             zIndex: 999,
//           }}
//           onClick={handleSidebarClose}
//         />
//       )}

//       <Sider
//         collapsible
//         collapsed={coolepseSidebar}
//         width={200}
//         style={{
//           position: isMobile ? "fixed" : "satic",
//           height: "100vh",
//           left: isMobile && coolepseSidebar ? "-200px" : "0",
//           zIndex: 1000,
//           transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
//         }}
//       >
//         {isMobile && !coolepseSidebar && (
//           <div
//             style={{
//               position: "absolute",
//               top: "10px",
//               right: "10px",
//               zIndex: 1001,
//             }}
//           >
//             <CloseOutlined
//               onClick={handleSidebarClose}
//               style={{
//                 fontSize: "20px",
//                 color: "#fff",
//                 cursor: "pointer",
//               }}
//             />
//           </div>
//         )}

//         <div className="demo-logo-vertical" />
//         <Menu
//           onClick={(e) => {
//             navigate(e.key);
//             if (isMobile) {
//               handleSidebarClose();
//             }
//           }}
//           theme="dark"
//           mode="inline"
//           defaultSelectedKeys={["1"]}
//           items={[
//             { key: "/", label: "Status" },
//             { key: "/home2", label: "Fillials status" },
//             { key: "/home3", label: "User balance" },
//             { key: "/home4", label: "Home 4" },
//           ]}
//         />
//       </Sider>

//       {/* <Sider
//         collapsible
//         collapsed={coolepseSidebar}
//         width={200}
//         style={{
//           position: "fixed", // Bu yerda "static" emas, "fixed" bo'ladi, shunda web holatda ham qotib turadi
//           height: "100vh",
//           left: coolepseSidebar ? "-200px" : "0", // Qotirish holatiga mos ravishda o'ngga siljish
//           zIndex: 1000,
//           transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
//         }}
//       >
//         {isMobile && !coolepseSidebar && (
//           <div
//             style={{
//               position: "absolute",
//               top: "10px",
//               right: "10px",
//               zIndex: 1001, // Close icon uchun yuqori zIndex
//             }}
//           >
//             <CloseOutlined
//               onClick={handleSidebarClose}
//               style={{
//                 fontSize: "20px",
//                 color: "#fff",
//                 cursor: "pointer",
//               }}
//             />
//           </div>
//         )}
//         <Menu
//           onClick={(e) => {
//             navigate(e.key);
//             if (isMobile) {
//               handleSidebarClose();
//             }
//           }}
//           theme="dark"
//           mode="inline"
//           defaultSelectedKeys={["1"]}
//           items={[
//             { key: "/", label: "Status" },
//             { key: "/home2", label: "Fillials status" },
//             { key: "/home3", label: "User balance" },
//             { key: "/home4", label: "Home 4" },
//           ]}
//         />
//       </Sider> */}
//     </>
//   );
// };

// export default Saidbar;
import React, { useState, useEffect } from "react";
import { Layout, Menu } from "antd";
import {
  CloseOutlined,
  HomeOutlined,
  BranchesOutlined,
  WalletOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
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
        dispatch(setCoolepseSidebar(true)); // Collapse sidebar by default on mobile
      }
    };

    // Initial check
    checkScreenSize();

    // Watch for screen size changes
    window.addEventListener("resize", checkScreenSize);

    // Cleanup
    return () => window.removeEventListener("resize", checkScreenSize);
  }, [dispatch]);

  // Reset sidebar state when page changes
  useEffect(() => {
    dispatch(resetSidebarState());
  }, [location.pathname, dispatch]);

  // Close sidebar on mobile
  const handleSidebarClose = () => {
    dispatch(setCoolepseSidebar(true));
  };

  // Menu items with icons
  const menuItems = [
    { key: "/", label: "Status", icon: <HomeOutlined /> },
    { key: "/home2", label: "Fillials status", icon: <BranchesOutlined /> },
    { key: "/home3", label: "User balance", icon: <WalletOutlined /> },
    {
      key: "/benzin-turlari",
      label: "Benzin turlari",
      icon: <AppstoreOutlined />,
    },
    { key: "/outgoing", label: "Chiqim", icon: <WalletOutlined /> },
    { key: "/debt", label: "Qarzlar", icon: <WalletOutlined /> },
    { key: "/kirim", label: "Kirim", icon: <WalletOutlined /> },
    { key: "/operators", label: "Operators", icon: <WalletOutlined /> },
    { key: "/expenses", label: "Expenses", icon: <WalletOutlined /> },
    { key: "/banks", label: "Banks", icon: <WalletOutlined /> },
    { key: "/foydalar", label: "Foydalar", icon: <WalletOutlined /> },
    {
      key: "/operator-records",
      label: "Opertor recordes",
      icon: <WalletOutlined />,
    },
    { key: "/summalar", label: "Summalar", icon: <WalletOutlined /> },
  ];

  return (
    <>
      {/* Overlay for mobile when sidebar is open */}
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
        collapsedWidth={isMobile ? 0 : 80}
        trigger={null}
        width={200}
        style={{
          position: "fixed",
          height: "100vh",
          zIndex: 1000,
          left: 0,
          overflow: "auto",
          boxShadow: "2px 0 8px rgba(0,0,0,0.15)",
          transition: "all 0.2s ease-in-out",
          // Mobil holatda sidebar contentni surib yubormasligi uchun
          transform:
            isMobile && coolepseSidebar ? "translateX(-100%)" : "translateX(0)",
        }}
      >
        {/* Close button for mobile */}
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

        <div
          className="demo-logo-vertical"
          style={{
            height: "64px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
            fontSize: coolepseSidebar ? "18px" : "20px",
            margin: "10px 0",
            fontWeight: "bold",
          }}
        >
          {coolepseSidebar ? "FS" : "Filial System"}
        </div>

        <Menu
          onClick={(e) => {
            navigate(e.key);
            if (isMobile) {
              handleSidebarClose();
            }
          }}
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[location.pathname]}
          items={menuItems}
        />
      </Sider>
    </>
  );
};

export default Saidbar;
