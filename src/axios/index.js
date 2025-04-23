import axios from "axios";

export const useAxios = () => {
  const response = async ({ url, method = "GET", data, headers, params }) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Token mavjud emas!");
      throw new Error("Token topilmadi. Iltimos, tizimga qayta kiring.");
    }

    try {
      const res = await axios({
        url: `${import.meta.env.VITE_BASE_URL}${url}`,
        method,
        data,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          ...headers,
        },
        params, // Tokenni bu yerda qayta qo‘shmaslik kerak
      });

      return res.data;
    } catch (error) {
      console.error("So‘rovda xatolik:", error.response?.data || error.message);
      throw error;
    }
  };

  return response;
};
