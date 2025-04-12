// import { Navigate, Outlet } from "react-router-dom";

// const PrivateRoute = () => {
//   const isAuthenticated = localStorage.getItem("token"); // Token yoki login statusini tekshirish

//   return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
// };

// export default PrivateRoute;

import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Bu kutubxonani o'rnatish kerak: npm install jwt-decode

const PrivateRoute = () => {
  const token = localStorage.getItem("token");

  // Token mavjudligi va amal qilish muddatini tekshirish
  const isTokenValid = () => {
    if (!token) return false;

    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000; // seconds formatida

      // Token exp (expiration) vaqtini tekshirish
      return decodedToken.exp > currentTime;
    } catch (error) {
      // Token decode qilinishida xatolik yuz berganda
      console.error("Token tekshirishda xatolik:", error);
      return false;
    }
  };

  return isTokenValid() ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
