// import { Button, Input, Modal } from "antd";
// import React, { useEffect, useState } from "react";
// import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
// import { useAxios } from "../../axios";

// function UserBalance() {
//   const [data, setData] = useState([]);
//   const [data2, setData2] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isModalOpen2, setIsModalOpen2] = useState(false);
//   const [branch2, setBranch2] = useState([]);
//   const [user, setUser] = useState("");
//   const [balance, setBalance] = useState("");
//   const [user2, setUser2] = useState("");
//   const [balance2, setBalance2] = useState("");
//   const [branch, setBranch] = useState([]);
//   const axios = useAxios();
//   const [userNameUpdata, setUserNameUpdata] = useState("");
//   const [userBalanceUpdata, setBalanceUpdata] = useState("");
//   // branch
//   useEffect(() => {
//     axios({
//       url: "/register/",
//       method: "GET",
//     })
//       .then((data) => setBranch(data.data))
//       .catch((error) => console.log(error));
//   }, []);
//   // branch
//   useEffect(() => {
//     axios({
//       url: "/userbalance/",
//       method: "GET",
//     })
//       .then((data) => setData(data))
//       .catch((error) => console.log(error));
//   }, []);

//   //   Hisob toldirish

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

//     if (!user || !branch2 || !balance) {
//       notify({ type: "fullData" });
//       return;
//     }

//     console.log(data, "data");
//     axios({
//       url: "/userbalance/",
//       method: "POST",
//       data,
//     })
//       .then((data) => {
//         console.log(data);
//         notify({ type: "Saved" });
//       })
//       .catch((error) => console.log(error));
//   };

//   //   Userbalense get
//   const UpdateData = (id) => {
//     console.log(data, "ress");
//     const findData = data?.results?.find((item) => item.id == id);
//     setUserNameUpdata(findData?.username);
//     setBalanceUpdata(findData?.balance);
//   };
//   return (
//     <section>
//       <div className="w-[90%] m-auto pt-[20px]">
//         <div className="bg-blue-600 flex items-center justify-between p-5 rounded-md">
//           <h2 className="text-[#FFF] text-[25px] font-bold">
//             Foydalanuvchilar ro'yxati
//           </h2>
//           <Button onClick={() => setIsModalOpen(true)}>
//             Hisobni to'ldirish
//           </Button>
//         </div>
//         <table className="w-full mt-7">
//           <thead className="bg-gray-200">
//             <tr>
//               <th className="border border-gray-300 px-4 py-2 w-1/5">
//                 Foydalanuvchi nomi
//               </th>
//               <th className="border border-gray-300 px-4 py-2 w-1/5">Balans</th>

//               <th className="border border-gray-300 px-4 py-2 w-1/5">
//                 Fillial
//               </th>
//               <th className="border border-gray-300 px-4 py-2 w-1/5">
//                 Yaratilgan vaqti
//               </th>
//               <th className="border border-gray-300 px-4 py-2 w-1/5">
//                 Amallar
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {data?.results?.map((item, index) => (
//               <tr key={index} className="hover:bg-gray-100">
//                 <td className="border border-gray-300 px-4 py-2 text-center">
//                   {item.username}
//                 </td>
//                 <td className="border border-gray-300 px-4 py-2 text-center">
//                   {item.balance} so'm
//                 </td>
//                 <td className="border border-gray-300 px-4 py-2 text-center">
//                   {item?.branch}
//                 </td>
//                 <td className="border border-gray-300 px-4 py-2 text-center">
//                   {item?.created_at}
//                 </td>

//                 <td className="border border-gray-300 px-4 py-2 text-end flex gap-2">
//                   <Button
//                     onClick={() => {
//                       setIsModalOpen2(true), UpdateData(item.id);
//                     }}
//                     type="primary"
//                     icon={<EditOutlined />}
//                     className="mr-2"
//                   />
//                   <Button danger icon={<DeleteOutlined />} />
//                 </td>
//               </tr>
//             ))}
//             {/* <tr>
//               <td
//                 colSpan="5"
//                 className="border border-gray-300 px-4 py-2 text-center text-gray-500"
//               >
//                 Ma'lumot topilmadi
//               </td>
//             </tr> */}
//           </tbody>
//         </table>
//       </div>

//       <Modal
//         title="Hisobni to'ldirish"
//         open={isModalOpen}
//         onCancel={() => setIsModalOpen(false)}
//         footer={[
//           <Button key="cancel" onClick={() => setIsModalOpen(false)}>
//             Bekor qilish
//           </Button>,
//           <Button
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
//         <form className="flex flex-col gap-7">
//           <div className="space-y-2">
//             <label
//               htmlFor="benzin"
//               className="text-[17px] font-medium text-gray-700"
//             >
//               Balance
//             </label>
//             <Input
//               id="balance"
//               required
//               className="h-11 rounded-lg text-base"
//               onChange={(e) => setBalance(e.target.value)}
//               placeholder="Balansingizni  kiriting"
//             />
//           </div>
//           <div className="space-y-2">
//             <label
//               htmlFor="user"
//               className="text-[17px] font-medium text-gray-700"
//             >
//               Foydalanuvchi
//             </label>
//             <select
//               id="user"
//               onChange={(e) => setUser(e.target.value)}
//               className="w-full h-11 px-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             >
//               <option value="">Foydalanuvchi tanlang</option>
//               {data2?.map((value) => (
//                 <option key={value?.username} value={value.id}>
//                   {value?.username}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </form>
//       </Modal>

//       <Modal
//         title="Hisobni to'ldirish"
//         open={isModalOpen2}
//         onCancel={() => setIsModalOpen2(false)}
//         footer={[
//           <Button key="cancel" onClick={() => setIsModalOpen2(false)}>
//             Bekor qilish
//           </Button>,
//           <Button
//             key="submit"
//             type="primary"
//             onClick={() => {
//               setIsModalOpen2(false);
//               postData();
//             }}
//           >
//             To'ldirish
//           </Button>,
//         ]}
//       >
//         <form className="flex flex-col gap-7">
//           <div className="space-y-2">
//             <label
//               htmlFor="user"
//               className="text-[17px] font-medium text-gray-700"
//             >
//               Foydalanuvchi
//             </label>
//             <select
//               id="user"
//               value={userNameUpdata}
//               onChange={(e) => setUserNameUpdata(e.target.value)}
//               className="w-full h-11 px-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             >
//               <option value="">Foydalanuvchi tanlang</option>
//               {data2?.map((value) => (
//                 <option key={value?.username} value={value.id}>
//                   {value?.username}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div className="space-y-2">
//             <label
//               htmlFor="benzin"
//               className="text-[17px] font-medium text-gray-700"
//             >
//               Balance
//             </label>
//             <Input
//               id="balance"
//               value={userBalanceUpdata}
//               required
//               className="h-11 rounded-lg text-base"
//               onChange={(e) => setBalanceUpdata(e.target.value)}
//               placeholder="Balansingizni  kiriting"
//             />
//           </div>
//         </form>
//       </Modal>
//     </section>
//   );
// }

// export default UserBalance;

// import { Button, Input, Modal, notification } from "antd";
// import React, { useEffect, useState } from "react";
// import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
// import { useAxios } from "../../axios";

// function UserBalance() {
//   const [data, setData] = useState([]);
//   const [data2, setData2] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isModalOpen2, setIsModalOpen2] = useState(false);
//   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // Delete modal state
//   const [branch2, setBranch2] = useState([]);
//   const [user, setUser] = useState("");
//   const [balance, setBalance] = useState("");
//   const [user2, setUser2] = useState("");
//   const [balance2, setBalance2] = useState("");
//   const [branch, setBranch] = useState([]);
//   const axios = useAxios();
//   const [userNameUpdata, setUserNameUpdata] = useState("");
//   const [userBalanceUpdata, setBalanceUpdata] = useState("");
//   const [deleteUserId, setDeleteUserId] = useState(null); // Store the ID of the user to be deleted

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

//     if (!user || !branch2 || !balance) {
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
//       })
//       .catch((error) => console.log(error));
//   };

//   const UpdateData = (id) => {
//     const findData = data?.results?.find((item) => item.id == id);
//     setUserNameUpdata(findData?.username);
//     setBalanceUpdata(findData?.balance);
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

//           // ❗️ Ma'lumotni refreshsiz yangilash
//           const newData = {
//             ...data,
//             results: data.results.filter((item) => item.id !== deleteUserId),
//           };
//           setData(newData); // ❗️ Frontenddagi datani yangilab qo'yamiz
//         })
//         .catch((error) => {
//           notification.error({ message: "O'chirishda xatolik yuz berdi!" });
//           setIsDeleteModalOpen(false);
//         });
//     }
//   };

//   return (
//     <section>
//       <div className="w-[90%] m-auto pt-[20px]">
//         <div className="bg-blue-600 flex items-center justify-between p-5 rounded-md">
//           <h2 className="text-[#FFF] text-[25px] font-bold">
//             Foydalanuvchilar ro'yxati
//           </h2>
//           <Button onClick={() => setIsModalOpen(true)}>
//             Hisobni to'ldirish
//           </Button>
//         </div>
//         <table className="w-full mt-7">
//           <thead className="bg-gray-200">
//             <tr>
//               <th className="border border-gray-300 px-4 py-2 w-1/5">
//                 Foydalanuvchi nomi
//               </th>
//               <th className="border border-gray-300 px-4 py-2 w-1/5">Balans</th>
//               <th className="border border-gray-300 px-4 py-2 w-1/5">
//                 Fillial
//               </th>
//               <th className="border border-gray-300 px-4 py-2 w-1/5">
//                 Yaratilgan vaqti
//               </th>
//               <th className="border border-gray-300 px-4 py-2 w-1/5">
//                 Amallar
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {data?.results?.map((item, index) => (
//               <tr key={index} className="hover:bg-gray-100">
//                 <td className="border border-gray-300 px-4 py-2 text-center">
//                   {item.username}
//                 </td>
//                 <td className="border border-gray-300 px-4 py-2 text-center">
//                   {item.balance} so'm
//                 </td>
//                 <td className="border border-gray-300 px-4 py-2 text-center">
//                   {item?.branch}
//                 </td>
//                 <td className="border border-gray-300 px-4 py-2 text-center">
//                   {item?.created_at}
//                 </td>
//                 <td className="border border-gray-300 px-4 py-2 text-end flex gap-2">
//                   <Button
//                     onClick={() => {
//                       setIsModalOpen2(true);
//                       UpdateData(item.id);
//                     }}
//                     type="primary"
//                     icon={<EditOutlined />}
//                     className="mr-2"
//                   />
//                   <Button
//                     danger
//                     icon={<DeleteOutlined />}
//                     onClick={() => openDeleteModal(item.id)}
//                   />
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Modal for adding balance */}
//       <Modal
//         title="Hisobni to'ldirish"
//         open={isModalOpen}
//         onCancel={() => setIsModalOpen(false)}
//         footer={[
//           <Button key="cancel" onClick={() => setIsModalOpen(false)}>
//             Bekor qilish
//           </Button>,
//           <Button
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
//         <form className="flex flex-col gap-7">
//           <div className="space-y-2">
//             <label className="text-[17px] font-medium text-gray-700">
//               Balance
//             </label>
//             <Input
//               id="balance"
//               required
//               className="h-11 rounded-lg text-base"
//               onChange={(e) => setBalance(e.target.value)}
//               placeholder="Balansingizni kiriting"
//             />
//           </div>
//           <div className="space-y-2">
//             <label className="text-[17px] font-medium text-gray-700">
//               Foydalanuvchi
//             </label>
//             <select
//               id="user"
//               onChange={(e) => setUser(e.target.value)}
//               className="w-full h-11 px-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             >
//               <option value="">Foydalanuvchi tanlang</option>
//               {data2?.map((value) => (
//                 <option key={value?.username} value={value.id}>
//                   {value?.username}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </form>
//       </Modal>

//       {/* Modal for delete confirmation */}
//       <Modal
//         title="O'chirish tasdiqlash"
//         open={isDeleteModalOpen}
//         onCancel={() => setIsDeleteModalOpen(false)}
//         footer={[
//           <Button key="cancel" onClick={() => setIsDeleteModalOpen(false)}>
//             Bekor qilish
//           </Button>,
//           <Button key="submit" danger onClick={deleteUser}>
//             O'chirish
//           </Button>,
//         ]}
//       >
//         <p>Bu foydalanuvchini o'chirishni tasdiqlaysizmi?</p>
//       </Modal>
//     </section>
//   );
// }

// export default UserBalance;

import { Button, Input, Modal, notification } from "antd";
import React, { useEffect, useState } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useAxios } from "../../axios";

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
    if (!userBalanceUpdata) {
      notification.error({ message: "Balans kiritilishi shart!" });
      return;
    }

    axios({
      url: `/userbalances/${currentUserId}/`, // Tahrirlash uchun endpoint
      method: "PATCH",
      data: {
        balance: userBalanceUpdata,
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

  console.log(data?.results, "daddda2")


  return (
    <section>
      <div className="w-[90%] m-auto pt-[20px]">
        <div className="bg-blue-600 flex items-center justify-between p-5 rounded-md">
          <h2 className="text-[#FFF] text-[25px] font-bold">
            Foydalanuvchilar ro'yxati
          </h2>
          <Button onClick={() => setIsModalOpen(true)}>
            Hisobni to'ldirish
          </Button>
        </div>
        <table className="w-full mt-7">
          <thead className="bg-gray-200">
            <tr>
              <th className="border border-gray-300 px-4 py-2 w-1/5">
                Foydalanuvchi nomi
              </th>
              <th className="border border-gray-300 px-4 py-2 w-1/5">Balans</th>
              <th className="border border-gray-300 px-4 py-2 w-1/5">
                Fillial
              </th>
              <th className="border border-gray-300 px-4 py-2 w-1/5">
                Yaratilgan vaqti
              </th>
              <th className="border border-gray-300 px-4 py-2 w-1/5">
                Amallar
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.results?.map((item, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {item.username}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {item.balance} so'm
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {item?.branch}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {item?.created_at}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-end flex gap-2">
                  <Button
                    className="w-[80px] mr-2"
                    type="primary"
                    onClick={() => {
                      UpdateData(item.id);
                      setIsModalOpen2(true);
                    }}
                  >
                    Tahrirlash
                  </Button>
                  <Button
                    className="w-[80px]"
                    danger
                    onClick={() => openDeleteModal(item.id)}
                  >
                    O‘chirish
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for adding balance */}
      <Modal
        title="Hisobni to'ldirish"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsModalOpen(false)}>
            Bekor qilish
          </Button>,
          <Button
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
        <form className="flex flex-col gap-7">
          <div className="space-y-2">
            <label className="text-[17px] font-medium text-gray-700">
              Balance
            </label>
            <Input
              id="balance"
              required
              className="h-11 rounded-lg text-base"
              onChange={(e) => setBalance(e.target.value)}
              placeholder="Balansingizni kiriting"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[17px] font-medium text-gray-700">
              Foydalanuvchi
            </label>
            <select
              id="user"
              onChange={(e) => setUser(e.target.value)}
              className="w-full h-11 px-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Foydalanuvchi tanlang</option>
              {data2?.map((value) => (
                <option key={value?.username} value={value.id}>
                  {value?.username}
                </option>
              ))}
            </select>
          </div>
        </form>
      </Modal>

      {/* Modal for editing user balance */}
      <Modal
        title="Foydalanuvchi balansini yangilash"
        open={isModalOpen2}
        onCancel={() => setIsModalOpen2(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsModalOpen2(false)}>
            Bekor qilish
          </Button>,
          <Button key="submit" type="primary" onClick={updateUserData}>
            Saqlash
          </Button>,
        ]}
      >
        <form className="flex flex-col gap-7">
          <div className="space-y-2">
            <label className="text-[17px] font-medium text-gray-700">
              Foydalanuvchi nomi
            </label>
            <Input
              id="username"
              value={userNameUpdata}
              className="h-11 rounded-lg text-base"
              disabled
            />
          </div>
          <div className="space-y-2">
            <label className="text-[17px] font-medium text-gray-700">
              Yangi balans
            </label>
            <Input
              id="balance"
              value={userBalanceUpdata}
              onChange={(e) => setBalanceUpdata(e.target.value)}
              className="h-11 rounded-lg text-base"
              placeholder="Yangi balansni kiriting"
            />
          </div>
        </form>
      </Modal>

      {/* Modal for delete confirmation */}
      <Modal
        title="O'chirish tasdiqlash"
        open={isDeleteModalOpen}
        onCancel={() => setIsDeleteModalOpen(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsDeleteModalOpen(false)}>
            Bekor qilish
          </Button>,
          <Button key="submit" danger onClick={deleteUser}>
            O'chirish
          </Button>,
        ]}
      >
        <p>Bu foydalanuvchini o'chirishni tasdiqlaysizmi?</p>
      </Modal>
    </section>
  );
}

export default UserBalance;
