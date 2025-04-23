import { Button, Input, Modal, notification } from "antd";
import React, { useEffect, useState } from "react";
import { useAxios } from "../../axios";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

function UserBalance() {
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // Delete modal state
  const [branch2, setBranch2] = useState([]);
  const [user, setUser] = useState("");
  const [balance, setBalance] = useState("");
  const [user2, setUser2] = useState("");
  const [balance2, setBalance2] = useState("");
  const [branch, setBranch] = useState([]);
  const axios = useAxios();
  const [userNameUpdata, setUserNameUpdata] = useState("");
  const [userBalanceUpdata, setBalanceUpdata] = useState("");
  const [deleteUserId, setDeleteUserId] = useState(null); // Store the ID of the user to be deleted
  const [currentUserId, setCurrentUserId] = useState(null); // Edit uchun foydalanuvchi ID-sini saqlash

  // Fetch data for branches and user balances
  useEffect(() => {
    axios({
      url: "/register/",
      method: "GET",
    })
      .then((data) => setBranch(data.data))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    axios({
      url: "/userbalance/",
      method: "GET",
    })
      .then((data) => setData(data))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    axios({
      url: "/user-data/",
      method: "GET",
    })
      .then((data) => setData2(data))
      .catch((error) => console.log(error));
  }, []);

  const postData = () => {
    const data = {
      user,
      balance,
    };

    if (!user || !branch2 || !balance) {
      notification.error({ message: "All fields must be filled!" });
      return;
    }

    axios({
      url: "/userbalance/",
      method: "POST",
      data,
    })
      .then((data) => {
        notification.success({ message: "Data saved successfully!" });
        // Ma'lumotlarni yangilash uchun qayta so'rov yuborish
        axios({
          url: "/userbalance/",
          method: "GET",
        })
          .then((data) => setData(data))
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  };

  // Edit tugmasi bosilganda foydalanuvchi ma'lumotlarini olish
  const UpdateData = (id) => {
    const findData = data?.results?.find((item) => item.id === id);
    if (findData) {
      setUserNameUpdata(findData?.username);
      setBalanceUpdata(findData?.balance);
      setCurrentUserId(id); // Foydalanuvchi ID-sini saqlash
    }
  };

  // Ma'lumotlarni yangilash funksiyasi
  const updateUserData = () => {
    if ((!userBalanceUpdata, !userNameUpdata)) {
      notification.error({ message: "Inputlarni kiritilishingiz shart!" });
      return;
    }

    axios({
      url: `/userbalances/${currentUserId}/`, // Tahrirlash uchun endpoint
      method: "PUT",
      data: {
        balance: userBalanceUpdata,
        user: userNameUpdata,
      },
    })
      .then(() => {
        notification.success({
          message: "Ma'lumotlar muvaffaqiyatli yangilandi!",
        });

        setIsModalOpen2(false);
        // Ma'lumotlarni yangilash uchun qayta so'rov yuborish
        axios({
          url: "/userbalance/",
          method: "GET",
        })
          .then((data) => setData(data))
          .catch((error) => console.log(error));
      })
      .catch((error) => {
        console.log(error);
        notification.error({ message: "Yangilashda xatolik yuz berdi!" });
      });
  };

  console.log(userBalanceUpdata, userNameUpdata, "xsxsxsx");

  // Open delete confirmation modal
  const openDeleteModal = (id) => {
    setDeleteUserId(id);
    setIsDeleteModalOpen(true);
  };

  // Handle delete action
  const deleteUser = () => {
    if (deleteUserId) {
      axios({
        url: `/userbalances/${deleteUserId}/`,
        method: "DELETE",
      })
        .then(() => {
          notification.success({ message: "Foydalanuvchi o'chirildi!" });
          setIsDeleteModalOpen(false);
          setDeleteUserId(null);

          // ❗️ Ma'lumotni refreshsiz yangilash
          const newData = {
            ...data,
            results: data.results.filter((item) => item.id !== deleteUserId),
          };
          setData(newData); // ❗️ Frontenddagi datani yangilab qo'yamiz
        })
        .catch((error) => {
          notification.error({ message: "O'chirishda xatolik yuz berdi!" });
          setIsDeleteModalOpen(false);
        });
    }
  };

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Oy indeksini 1 dan boshlash
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${day}.${month}.${year}, ${hours}:${minutes}`;
  };
  return (
    <section>
      <div className="max-[900px]:text-[0.8em]">
        <div className="bg-blue-600 flex items-center justify-between p-6 rounded-md max-[500px]:text-[0.9em]">
          <h2 className="text-[#FFF] text-[1.5em] font-bold max-[500px]:text-[14px]">
            Foydalanuvchilar ro'yxati
          </h2>
          <Button
            className="text-[1em] w-[120px] max-[500px]:w-[100px] max-[500px]:h-[29px]"
            onClick={() => setIsModalOpen(true)}
          >
            Hisobni to'ldirish
          </Button>
        </div>
        <table className="w-full mt-7 block  max-[768px]:hidden">
          <thead className="bg-gray-200">
            <tr>
              <th className="border text-[1em] border-gray-300 px-4 py-2 w-1/4">
                Foydalanuvchi nomi
              </th>
              <th className="border text-[1em] border-gray-300 px-4 py-2 w-1/4">
                Balans
              </th>
              <th className="border text-[1em] border-gray-300 px-4 py-2 w-1/4">
                Fillial
              </th>
              <th className="border text-[1em] border-gray-300 px-4 py-2 w-1/4">
                Yaratilgan vaqti
              </th>
              <th className="border text-[1em] border-gray-300 px-4 py-2 w-1/7">
                Amallar
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.results?.map((item, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="border text-[1em] border-gray-300 px-4 py-2 text-center">
                  {item?.username}
                </td>
                <td className="border text-[1em] border-gray-300 px-4 py-2 text-center">
                  {item?.balance} so'm
                </td>
                <td className="border text-[1em] border-gray-300 px-4 py-2 text-center">
                  {item?.branch}
                </td>
                <td className="border text-[1em] border-gray-300 px-4 py-2 text-center">
                  {formatDate(item?.created_at)}
                </td>
                <td className="border text-[1em] border-gray-300 px-4 py-2  justify-center flex gap-2">
                  <Button
                    className="w-[40px] mr-2 text-[1em]"
                    type="primary"
                    onClick={() => {
                      UpdateData(item.id);
                      setIsModalOpen2(true);
                    }}
                  >
                    <EditOutlined />
                  </Button>
                  <Button
                    className="w-[40px] text-[1em]"
                    danger
                    onClick={() => openDeleteModal(item.id)}
                  >
                    <DeleteOutlined />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className=" flex-col gap-3 mt-5 bg-gray-200 hidden max-[768px]:flex max-[768px]:block">
          {data?.results?.map((value) => (
            <div className="space-y-4 ">
              <div className="border  shadow-sm p-4 bg-white">
                <div className="flex justify-between pb-2 border-b">
                  <span className="font-medium">Foydalanuvchi nomi</span>
                  <span>{value?.username}</span>
                </div>
                <div className="flex justify-between mt-2 pb-2 border-b">
                  <span className="font-medium">Balance</span>
                  <span>{value?.balance} so'm</span>
                </div>
                <div className="flex justify-between mt-2 pb-2 border-b">
                  <span className="font-medium">Fillial</span>
                  <span className="">{value?.branch}</span>
                </div>
                <div className="flex justify-between mt-2 pb-2 border-b">
                  <span className="font-medium">Yaratilgan vaqti</span>
                  <span>{formatDate(value?.created_at)}</span>
                </div>
                <div className="flex justify-between mt-3  border-b">
                  <span className="font-medium">Amallar</span>
                  <span className="flex items-center gap-4">
                    <p
                      onClick={() => {
                        UpdateData(value?.id);
                        setIsModalOpen2(true);
                      }}
                    >
                      <EditOutlined /> Edit
                    </p>
                    <p
                      className="text-red-600"
                      onClick={() => openDeleteModal(value?.id)}
                    >
                      <DeleteOutlined />
                      Delete
                    </p>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for adding balance */}
      <Modal
        className="modall"
        title="Hisobni to'ldirish"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={[
          <Button
            className="w-[120px] text-[15px] max-[768px]:w-[90px] max-[768px]:text-[12px]"
            key="cancel"
            onClick={() => setIsModalOpen(false)}
          >
            Bekor qilish
          </Button>,
          <Button
            className="w-[120px] text-[15px] max-[768px]:w-[90px] max-[768px]:text-[12px]"
            key="submit"
            type="primary"
            onClick={() => {
              setIsModalOpen(false);
              postData();
            }}
          >
            To'ldirish
          </Button>,
        ]}
      >
        <form className="flex flex-col gap-7 max-[768px]:text-[0.8em]">
          <div className="space-y-2">
            <label className="text-[1em] font-medium text-gray-700">
              Balance
            </label>
            <Input
              id="balance"
              required
              className="h-[35px] rounded-md text-[1.1em] max-[768px]:h-[30px]"
              onChange={(e) => setBalance(e.target.value)}
              placeholder="Balansingizni kiriting"
            />
          </div>
          <div className="space-y-2">
            <select
              id="user"
              onChange={(e) => setUser(e.target.value)}
              className="w-full h-[35px] px-3 border border-gray-300 rounded-md bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 max-[768px]:h-[30px]"
            >
              <option value="">Foydalanuvchi tanlang</option>
              {data2?.map((value) => (
                <option
                  className="text-red"
                  key={value?.username}
                  value={value.id}
                >
                  {value?.username}
                </option>
              ))}
            </select>
          </div>
        </form>
      </Modal>

      {/* Modal for editing user balance */}
      <Modal
        className="modall"
        title="Foydalanuvchi balansini yangilash"
        open={isModalOpen2}
        onCancel={() => setIsModalOpen2(false)}
        footer={[
          <Button
            className="w-[120px] text-[15px] max-[768px]:w-[90px] max-[768px]:text-[12px]"
            key="cancel"
            onClick={() => setIsModalOpen2(false)}
          >
            Bekor qilish
          </Button>,
          <Button
            className="w-[120px] text-[15px] max-[768px]:w-[90px] max-[768px]:text-[12px]"
            key="submit"
            type="primary"
            onClick={updateUserData}
          >
            Saqlash
          </Button>,
        ]}
      >
        <form className="flex flex-col gap-7 max-[768px]:text-[0.9em]">
          {/* <div className="space-y-2">
            <label className="text-[1em] font-medium text-gray-700">
              Foydalanuvchi nomi
            </label>
            <Input
              id="username"
              value={userNameUpdata}
              className="h-[35px] rounded-md  text-[1em] max-[768px]:h-[30px]"
              disabled
            />
          </div> */}
          <div className="space-y-2">
            <select
              id="user"
              onChange={(e) => setUser(e.target.value)}
              className="w-full h-[35px] px-3 border border-gray-300 rounded-md bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 max-[768px]:h-[30px]"
            >
              <option value="">Foydalanuvchi tanlang</option>
              {data2?.map((value) => (
                <option
                  className="text-red"
                  key={value?.username}
                  value={value.id}
                >
                  {value?.username}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-[1em] font-medium text-gray-700">
              Yangi balans
            </label>
            <Input
              id="balance"
              value={userBalanceUpdata}
              onChange={(e) => setBalanceUpdata(e.target.value)}
              className="h-[35px] rounded-md text-[1em]  max-[768px]:h-[30px]"
              placeholder="Yangi balansni kiriting"
            />
          </div>
        </form>
      </Modal>

      {/* Modal for delete confirmation */}
      <Modal
        className="modall"
        title="O'chirish tasdiqlash"
        open={isDeleteModalOpen}
        onCancel={() => setIsDeleteModalOpen(false)}
        footer={[
          <Button
            className="w-[120px] text-[15px] max-[768px]:w-[80px] max-[768px]:text-[11px] max-[768px]:h-[29px]"
            key="cancel"
            onClick={() => setIsDeleteModalOpen(false)}
          >
            Bekor qilish
          </Button>,
          <Button
            className="w-[120px] text-[15px] max-[768px]:w-[80px] max-[768px]:text-[11px] max-[768px]:h-[29px]"
            key="submit"
            danger
            onClick={deleteUser}
          >
            O'chirish
          </Button>,
        ]}
      >
        <p className="text-[1em] max-[768px]:text-[0.9em]">
          Bu foydalanuvchini o'chirishni tasdiqlaysizmi?
        </p>
      </Modal>
    </section>
  );
}

export default UserBalance;

// import { Button, Input, Modal, notification } from "antd";
// import React, { useEffect, useState } from "react";
// import { useAxios } from "../../axios";
// import {
//   EditOutlined,
//   DeleteOutlined,
//   InfoCircleOutlined,
// } from "@ant-design/icons";

// function UserBalance() {
//   const [data, setData] = useState([]);
//   const [data2, setData2] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isModalOpen2, setIsModalOpen2] = useState(false);
//   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
//   const [isDetailModalOpen, setIsDetailModalOpen] = useState(false); // Batafsil ma'lumotlar modali uchun
//   const [detailUser, setDetailUser] = useState(null); // Batafsil ma'lumotlar uchun tanlangan foydalanuvchi
//   const [branch2, setBranch2] = useState([]);
//   const [user, setUser] = useState("");
//   const [balance, setBalance] = useState("");
//   const [user2, setUser2] = useState("");
//   const [balance2, setBalance2] = useState("");
//   const [branch, setBranch] = useState([]);
//   const axios = useAxios();
//   const [userNameUpdata, setUserNameUpdata] = useState("");
//   const [userBalanceUpdata, setBalanceUpdata] = useState("");
//   const [deleteUserId, setDeleteUserId] = useState(null);
//   const [currentUserId, setCurrentUserId] = useState(null);

//   // Fetch data for branches and user balances
//   useEffect(() => {
//     axios({
//       url: "/register/",
//       method: "GET",
//     })
//       .then((data) => setBranch(data.data))
//       .catch((error) => console.log(error));
//   }, []);

//   useEffect(() => {
//     axios({
//       url: "/userbalance/",
//       method: "GET",
//     })
//       .then((data) => setData(data))
//       .catch((error) => console.log(error));
//   }, []);

//   useEffect(() => {
//     axios({
//       url: "/user-data/",
//       method: "GET",
//     })
//       .then((data) => setData2(data))
//       .catch((error) => console.log(error));
//   }, []);

//   const postData = () => {
//     const data = {
//       user,
//       balance,
//     };

//     if (!user || !balance) {
//       notification.error({ message: "All fields must be filled!" });
//       return;
//     }

//     axios({
//       url: "/userbalance/",
//       method: "POST",
//       data,
//     })
//       .then((data) => {
//         notification.success({ message: "Data saved successfully!" });
//         // Ma'lumotlarni yangilash uchun qayta so'rov yuborish
//         axios({
//           url: "/userbalance/",
//           method: "GET",
//         })
//           .then((data) => setData(data))
//           .catch((error) => console.log(error));
//       })
//       .catch((error) => console.log(error));
//   };

//   // Edit tugmasi bosilganda foydalanuvchi ma'lumotlarini olish
//   const UpdateData = (id) => {
//     const findData = data?.results?.find((item) => item.id === id);
//     if (findData) {
//       setUserNameUpdata(findData?.username);
//       setBalanceUpdata(findData?.balance);
//       setCurrentUserId(id); // Foydalanuvchi ID-sini saqlash
//     }
//   };

//   // Ma'lumotlarni yangilash funksiyasi
//   const updateUserData = () => {
//     if (!userBalanceUpdata || !user) {
//       notification.error({ message: "Inputlarni kiritilishingiz shart!" });
//       return;
//     }

//     axios({
//       url: `/userbalances/${currentUserId}/`, // Tahrirlash uchun endpoint
//       method: "PUT",
//       data: {
//         balance: userBalanceUpdata,
//         user,
//       },
//     })
//       .then(() => {
//         notification.success({
//           message: "Ma'lumotlar muvaffaqiyatli yangilandi!",
//         });

//         setIsModalOpen2(false);
//         // Ma'lumotlarni yangilash uchun qayta so'rov yuborish
//         axios({
//           url: "/userbalance/",
//           method: "GET",
//         })
//           .then((data) => setData(data))
//           .catch((error) => console.log(error));
//       })
//       .catch((error) => {
//         console.log(error);
//         notification.error({ message: "Yangilashda xatolik yuz berdi!" });
//       });
//   };

//   // Open delete confirmation modal
//   const openDeleteModal = (id) => {
//     setDeleteUserId(id);
//     setIsDeleteModalOpen(true);
//   };

//   // Handle delete action
//   const deleteUser = () => {
//     if (deleteUserId) {
//       axios({
//         url: `/userbalances/${deleteUserId}/`,
//         method: "DELETE",
//       })
//         .then(() => {
//           notification.success({ message: "Foydalanuvchi o'chirildi!" });
//           setIsDeleteModalOpen(false);
//           setDeleteUserId(null);

//           // Ma'lumotni refreshsiz yangilash
//           const newData = {
//             ...data,
//             results: data.results.filter((item) => item.id !== deleteUserId),
//           };
//           setData(newData);
//         })
//         .catch((error) => {
//           notification.error({ message: "O'chirishda xatolik yuz berdi!" });
//           setIsDeleteModalOpen(false);
//         });
//     }
//   };

//   // Batafsil ma'lumotlarni ko'rsatish uchun
//   const showDetailModal = (user) => {
//     setDetailUser(user);
//     setIsDetailModalOpen(true);
//   };

//   const formatDate = (isoString) => {
//     const date = new Date(isoString);
//     const day = String(date.getDate()).padStart(2, "0");
//     const month = String(date.getMonth() + 1).padStart(2, "0");
//     const year = date.getFullYear();
//     const hours = String(date.getHours()).padStart(2, "0");
//     const minutes = String(date.getMinutes()).padStart(2, "0");

//     return `${day}.${month}.${year}, ${hours}:${minutes}`;
//   };

//   return (
//     <section>
//       <div className="max-[900px]:text-[0.8em]">
//         <div className="bg-blue-600 flex items-center justify-between p-6 rounded-md max-[500px]:text-[0.9em]">
//           <h2 className="text-[#FFF] text-[1.5em] font-bold max-[500px]:text-[14px]">
//             Foydalanuvchilar ro'yxati
//           </h2>
//           <Button
//             className="text-[1em] w-[120px] max-[500px]:w-[100px] max-[500px]:h-[29px]"
//             onClick={() => setIsModalOpen(true)}
//           >
//             Hisobni to'ldirish
//           </Button>
//         </div>
//         <table className="w-full mt-7 block max-[768px]:hidden">
//           <thead className="bg-gray-200">
//             <tr>
//               <th className="border text-[1em] border-gray-300 px-4 py-2 w-1/5">
//                 Foydalanuvchi nomi
//               </th>
//               <th className="border text-[1em] border-gray-300 px-4 py-2 w-1/5">
//                 Balans
//               </th>
//               <th className="border text-[1em] border-gray-300 px-4 py-2 w-1/5">
//                 Fillial
//               </th>
//               <th className="border text-[1em] border-gray-300 px-4 py-2 w-1/5">
//                 Yaratilgan vaqti
//               </th>
//               <th className="border text-[1em] border-gray-300 px-4 py-2 w-1/5">
//                 Amallar
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {data?.results?.map((item, index) => (
//               <tr key={index} className="hover:bg-gray-100">
//                 <td className="border text-[1em] border-gray-300 px-4 py-2 text-center">
//                   {item?.username}
//                 </td>
//                 <td className="border text-[1em] border-gray-300 px-4 py-2 text-center">
//                   {item?.balance} so'm
//                 </td>
//                 <td className="border text-[1em] border-gray-300 px-4 py-2 text-center">
//                   {item?.branch}
//                 </td>
//                 <td className="border text-[1em] border-gray-300 px-4 py-2 text-center">
//                   {formatDate(item?.created_at)}
//                 </td>
//                 <td className="border text-[1em] border-gray-300 px-4 py-2 justify-center flex gap-2">
//                   <Button
//                     className="text-[1em]"
//                     type="primary"
//                     onClick={() => showDetailModal(item)}
//                     style={{
//                       backgroundColor: "#52c41a",
//                       borderColor: "#52c41a",
//                     }}
//                     icon={<InfoCircleOutlined />}
//                   >
//                     Batafsil
//                   </Button>
//                   <Button
//                     className="w-[40px] text-[1em]"
//                     type="primary"
//                     onClick={() => {
//                       UpdateData(item.id);
//                       setIsModalOpen2(true);
//                     }}
//                   >
//                     <EditOutlined />
//                   </Button>
//                   <Button
//                     className="w-[40px] text-[1em]"
//                     danger
//                     onClick={() => openDeleteModal(item.id)}
//                   >
//                     <DeleteOutlined />
//                   </Button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         <div className="flex-col gap-3 mt-5 bg-gray-200 hidden max-[768px]:flex max-[768px]:block">
//           {data?.results?.map((value) => (
//             <div className="space-y-4" key={value.id}>
//               <div className="border shadow-sm p-4 bg-white">
//                 <div className="flex justify-between pb-2 border-b">
//                   <span className="font-medium">Foydalanuvchi nomi</span>
//                   <span>{value?.username}</span>
//                 </div>
//                 <div className="flex justify-between mt-2 pb-2 border-b">
//                   <span className="font-medium">Balance</span>
//                   <span>{value?.balance} so'm</span>
//                 </div>
//                 <div className="flex justify-between mt-2 pb-2 border-b">
//                   <span className="font-medium">Fillial</span>
//                   <span className="">{value?.branch}</span>
//                 </div>
//                 <div className="flex justify-between mt-2 pb-2 border-b">
//                   <span className="font-medium">Yaratilgan vaqti</span>
//                   <span>{formatDate(value?.created_at)}</span>
//                 </div>
//                 <div className="flex flex-col gap-2 mt-3">
//                   <Button
//                     className="w-full"
//                     type="primary"
//                     onClick={() => showDetailModal(value)}
//                     style={{
//                       backgroundColor: "#52c41a",
//                       borderColor: "#52c41a",
//                     }}
//                     icon={<InfoCircleOutlined />}
//                   >
//                     Batafsil
//                   </Button>
//                   <div className="flex justify-between items-center">
//                     <Button
//                       className="w-[48%]"
//                       type="primary"
//                       onClick={() => {
//                         UpdateData(value.id);
//                         setIsModalOpen2(true);
//                       }}
//                       icon={<EditOutlined />}
//                     >
//                       Tahrirlash
//                     </Button>
//                     <Button
//                       className="w-[48%]"
//                       danger
//                       onClick={() => openDeleteModal(value.id)}
//                       icon={<DeleteOutlined />}
//                     >
//                       O'chirish
//                     </Button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Modal for adding balance */}
//       <Modal
//         className="modall"
//         title="Hisobni to'ldirish"
//         open={isModalOpen}
//         onCancel={() => setIsModalOpen(false)}
//         footer={[
//           <Button
//             className="w-[120px] text-[15px] max-[768px]:w-[90px] max-[768px]:text-[12px]"
//             key="cancel"
//             onClick={() => setIsModalOpen(false)}
//           >
//             Bekor qilish
//           </Button>,
//           <Button
//             className="w-[120px] text-[15px] max-[768px]:w-[90px] max-[768px]:text-[12px]"
//             key="submit"
//             type="primary"
//             onClick={() => {
//               setIsModalOpen(false);
//               postData();
//             }}
//           >
//             To'ldirish
//           </Button>,
//         ]}
//       >
//         <form className="flex flex-col gap-7 max-[768px]:text-[0.8em]">
//           <div className="space-y-2">
//             <label className="text-[1em] font-medium text-gray-700">
//               Balance
//             </label>
//             <Input
//               id="balance"
//               required
//               className="h-[35px] rounded-md text-[1.1em] max-[768px]:h-[30px]"
//               onChange={(e) => setBalance(e.target.value)}
//               placeholder="Balansingizni kiriting"
//             />
//           </div>
//           <div className="space-y-2">
//             <select
//               id="user"
//               onChange={(e) => setUser(e.target.value)}
//               className="w-full h-[35px] px-3 border border-gray-300 rounded-md bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 max-[768px]:h-[30px]"
//             >
//               <option value="">Foydalanuvchi tanlang</option>
//               {data2?.map((value) => (
//                 <option
//                   className="text-red"
//                   key={value?.username}
//                   value={value.id}
//                 >
//                   {value?.username}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </form>
//       </Modal>

//       {/* Modal for editing user balance */}
//       <Modal
//         className="modall"
//         title="Foydalanuvchi balansini yangilash"
//         open={isModalOpen2}
//         onCancel={() => setIsModalOpen2(false)}
//         footer={[
//           <Button
//             className="w-[120px] text-[15px] max-[768px]:w-[90px] max-[768px]:text-[12px]"
//             key="cancel"
//             onClick={() => setIsModalOpen2(false)}
//           >
//             Bekor qilish
//           </Button>,
//           <Button
//             className="w-[120px] text-[15px] max-[768px]:w-[90px] max-[768px]:text-[12px]"
//             key="submit"
//             type="primary"
//             onClick={updateUserData}
//           >
//             Saqlash
//           </Button>,
//         ]}
//       >
//         <form className="flex flex-col gap-7 max-[768px]:text-[0.9em]">
//           <div className="space-y-2">
//             <select
//               id="user"
//               onChange={(e) => setUser(e.target.value)}
//               className="w-full h-[35px] px-3 border border-gray-300 rounded-md bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 max-[768px]:h-[30px]"
//             >
//               <option value="">Foydalanuvchi tanlang</option>
//               {data2?.map((value) => (
//                 <option
//                   className="text-red"
//                   key={value?.username}
//                   value={value.id}
//                 >
//                   {value?.username}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div className="space-y-2">
//             <label className="text-[1em] font-medium text-gray-700">
//               Yangi balans
//             </label>
//             <Input
//               id="balance"
//               value={userBalanceUpdata}
//               onChange={(e) => setBalanceUpdata(e.target.value)}
//               className="h-[35px] rounded-md text-[1em] max-[768px]:h-[30px]"
//               placeholder="Yangi balansni kiriting"
//             />
//           </div>
//         </form>
//       </Modal>

//       {/* Modal for delete confirmation */}
//       <Modal
//         className="modall"
//         title="O'chirish tasdiqlash"
//         open={isDeleteModalOpen}
//         onCancel={() => setIsDeleteModalOpen(false)}
//         footer={[
//           <Button
//             className="w-[120px] text-[15px] max-[768px]:w-[80px] max-[768px]:text-[11px] max-[768px]:h-[29px]"
//             key="cancel"
//             onClick={() => setIsDeleteModalOpen(false)}
//           >
//             Bekor qilish
//           </Button>,
//           <Button
//             className="w-[120px] text-[15px] max-[768px]:w-[80px] max-[768px]:text-[11px] max-[768px]:h-[29px]"
//             key="submit"
//             danger
//             onClick={deleteUser}
//           >
//             O'chirish
//           </Button>,
//         ]}
//       >
//         <p className="text-[1em] max-[768px]:text-[0.9em]">
//           Bu foydalanuvchini o'chirishni tasdiqlaysizmi?
//         </p>
//       </Modal>

//       {/* Modal for detailed information */}
//       <Modal
//         className="modall"
//         title={
//           <div className="flex items-center">
//             <InfoCircleOutlined style={{ marginRight: 10, color: "#52c41a" }} />
//             <span>Foydalanuvchi batafsil ma'lumotlari</span>
//           </div>
//         }
//         open={isDetailModalOpen}
//         onCancel={() => setIsDetailModalOpen(false)}
//         footer={[
//           <Button
//             className="w-[120px] text-[15px] max-[768px]:w-[90px] max-[768px]:text-[12px]"
//             key="close"
//             type="primary"
//             onClick={() => setIsDetailModalOpen(false)}
//           >
//             Yopish
//           </Button>,
//         ]}
//         width={600}
//       >
//         {detailUser && (
//           <div className="bg-gray-50 p-5 rounded-lg border border-gray-200 shadow-sm">
//             <div className="grid grid-cols-1 gap-4">
//               <div className="bg-white p-4 rounded-md shadow-sm border-l-4 border-blue-500">
//                 <h3 className="text-lg font-bold text-gray-800 mb-2">
//                   Foydalanuvchi ma'lumotlari
//                 </h3>
//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <p className="text-gray-500 text-sm">ID:</p>
//                     <p className="font-medium">{detailUser.id}</p>
//                   </div>
//                   <div>
//                     <p className="text-gray-500 text-sm">Foydalanuvchi nomi:</p>
//                     <p className="font-medium">{detailUser.username}</p>
//                   </div>
//                 </div>
//               </div>

//               <div className="bg-white p-4 rounded-md shadow-sm border-l-4 border-green-500">
//                 <h3 className="text-lg font-bold text-gray-800 mb-2">
//                   Balans ma'lumotlari
//                 </h3>
//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <p className="text-gray-500 text-sm">Joriy balans:</p>
//                     <p className="font-bold text-xl text-green-600">
//                       {detailUser.balance} so'm
//                     </p>
//                   </div>
//                   <div>
//                     <p className="text-gray-500 text-sm">
//                       So'nggi yangilanish:
//                     </p>
//                     <p className="font-medium">
//                       {formatDate(detailUser.created_at)}
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               <div className="bg-white p-4 rounded-md shadow-sm border-l-4 border-purple-500">
//                 <h3 className="text-lg font-bold text-gray-800 mb-2">
//                   Filial ma'lumotlari
//                 </h3>
//                 <div>
//                   <p className="text-gray-500 text-sm">Filial nomi:</p>
//                   <p className="font-medium">{detailUser.branch}</p>
//                 </div>
//               </div>

//               <div className="bg-white p-4 rounded-md shadow-sm border-l-4 border-yellow-500">
//                 <h3 className="text-lg font-bold text-gray-800 mb-2">
//                   Qo'shimcha ma'lumotlar
//                 </h3>
//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <p className="text-gray-500 text-sm">Yaratilgan sana:</p>
//                     <p className="font-medium">
//                       {formatDate(detailUser.created_at).split(",")[0]}
//                     </p>
//                   </div>
//                   <div>
//                     <p className="text-gray-500 text-sm">Yaratilgan vaqt:</p>
//                     <p className="font-medium">
//                       {formatDate(detailUser.created_at).split(",")[1]}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="mt-4 flex justify-between">
//               <Button
//                 type="primary"
//                 className="flex items-center"
//                 onClick={() => {
//                   setIsDetailModalOpen(false);
//                   UpdateData(detailUser.id);
//                   setIsModalOpen2(true);
//                 }}
//                 icon={<EditOutlined />}
//               >
//                 Balansni yangilash
//               </Button>
//               <Button
//                 danger
//                 className="flex items-center"
//                 onClick={() => {
//                   setIsDetailModalOpen(false);
//                   openDeleteModal(detailUser.id);
//                 }}
//                 icon={<DeleteOutlined />}
//               >
//                 Foydalanuvchini o'chirish
//               </Button>
//             </div>
//           </div>
//         )}
//       </Modal>
//     </section>
//   );
// }

// export default UserBalance;
