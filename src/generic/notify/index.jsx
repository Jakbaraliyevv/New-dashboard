import { notification } from "antd";

const notificationApi = () => {
  const notify = ({ type }) => {
    switch (type) {
      case "fullData":
        return notification.error({
          message: "Iltimos, barcha maydonlarni to‘ldiring!",
        });
      case "login":
        return notification.success({
          message: "Tizimga muvaffaqiyatli kirdingiz",
        });
      case "register":
        return notification.success({
          message: "Register muvaffaqiyatli",
        });
      case "Saved":
        return notification.success({
          message: "Muvaffaqiyatli saqlandi",
        });
      case "notFound":
        return notification.error({
          message: "Foydalanuvchi topilmadi!",
        });
      default:
        return notification.info({
          message: "Noma’lum holat yuz berdi!",
        });
    }
  };

  return notify;
};

export default notificationApi;
