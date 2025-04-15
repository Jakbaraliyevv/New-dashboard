// import { Button, Input, Modal } from "antd";
// import React, { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
// import notificationApi from "../../generic/notify";
// import { useAxios } from "../../axios";

// function BenzinTurlari() {
//   const axios = useAxios();
//   const notify = notificationApi();
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [branch, setBranch] = useState([]);
//   const [name, setName] = useState("");
//   const [price, setPrice] = useState("");
//   const [selectt, setSelect] = useState("");
//   const [stock, setStock] = useState("");
//   const [benzinData, setBenzinData] = useState([]);

//   const location = useLocation();
//   const branchId = location.state?.branchId; // ID ni olish

//   console.log(branchId, "iddddd");
//   useEffect(() => {
//     axios({
//       url: "/register/",
//       method: "GET",
//     })
//       .then((data) => setBranch(data.data))
//       .catch((error) => console.log(error));
//   }, []);

//   const postData = () => {
//     const data = {
//       branch: selectt,
//       name,
//       price,
//       stock,
//     };
//     if (!selectt || !name || !price || !stock) {
//       notify({ type: "fullData" });
//       return;
//     }

//     const url = `/1branch${selectt}/`;
//     console.log("So‘rov URL:", url);
//     axios({
//       url: `/benzin/`,
//       method: "POST",
//       data,
//     })
//       .then((data) => {
//         console.log(data);
//         notify({ type: "Saved" });
//       })
//       .catch((error) => console.log(error));

//     console.log(data, "data11");
//   };

//   useEffect(() => {
//     axios({
//       url: `/benzin/`,
//       method: "GET",
//     })
//       .then((data) => {
//         setBenzinData(data);
//       })
//       .catch((error) => console.log(error));
//   }, []);

//   console.log(benzinData, "benzin");
//   return (
//     <section className="bg-[#f9fafb] min-h-screen">
//       <div className="w-[90%] m-auto pt-[20px]">
//         <div className="bg-blue-600 flex items-center justify-between p-5 rounded-md">
//           <h2 className="text-[#FFF] text-[25px] font-bold">Benzin turlari</h2>
//           <Button onClick={() => setIsModalOpen(true)}>Add benzin</Button>
//         </div>
//         <table className="w-full mt-7">
//           <thead className="bg-gray-200">
//             <tr>
//               <th className="border border-gray-300 px-4 py-2 w-1/5">Branch</th>
//               <th className="border border-gray-300 px-4 py-2 w-1/5">Name</th>
//               <th className="border border-gray-300 px-4 py-2 w-1/5">Price</th>
//               <th className="border border-gray-300 px-4 py-2 w-1/5">Stock</th>
//               <th className="border border-gray-300 px-4 py-2 w-1/5">
//                 Amallar
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {benzinData && benzinData.length > 0 ? (
//               benzinData.map((value) => (
//                 <tr className="hover:bg-gray-100" key={value?.id}>
//                   <td className="border border-gray-300 px-4 py-2 text-center">
//                     {value?.branch}
//                   </td>
//                   <td className="border border-gray-300 px-4 py-2 text-center">
//                     {value?.name}
//                   </td>
//                   <td className="border border-gray-300 px-4 py-2 text-center">
//                     {value?.price}
//                   </td>
//                   <td className="border border-gray-300 px-4 py-2 text-center">
//                     {value?.stock}
//                   </td>
//                   <td className="border border-gray-300 px-4 py-2 text-end">
//                     <Button className="w-[80px] mr-2" type="primary">
//                       Tahrirlash
//                     </Button>
//                     <Button className="w-[80px]" danger>
//                       O‘chirish
//                     </Button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td
//                   colSpan="5"
//                   className="border border-gray-300 px-4 py-2 text-center text-gray-500"
//                 >
//                   Ma'lumot topilmadi
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//       <Modal
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
//             Saqlash
//           </Button>,
//         ]}
//       >
//         <div className="mt-5">
//           <form className="flex flex-col gap-7">
//             <div className="space-y-2">
//               <label
//                 htmlFor="benzin"
//                 className="text-[17px] font-medium text-gray-700"
//               >
//                 Benzin nomi
//               </label>
//               <Input
//                 id="benzin"
//                 required
//                 className="h-11 rounded-lg text-base"
//                 onChange={(e) => setName(e.target.value)}
//                 placeholder="Benzin nomini kiriting"
//               />
//             </div>
//             <div className="space-y-2">
//               <label
//                 htmlFor="price"
//                 className="text-[17px] font-medium text-gray-700"
//               >
//                 Benzin narxi
//               </label>
//               <Input
//                 id="price"
//                 required
//                 className="h-11 rounded-lg text-base"
//                 onChange={(e) => setPrice(e.target.value)}
//                 placeholder="Benzin narxini kiriting"
//               />
//             </div>
//             <div className="space-y-2">
//               <label
//                 htmlFor="qoldiq"
//                 className="text-[17px] font-medium text-gray-700"
//               >
//                 Benzin qoldiq
//               </label>
//               <Input
//                 id="qoldiq"
//                 required
//                 className="h-11 rounded-lg text-base"
//                 onChange={(e) => setStock(e.target.value)}
//                 placeholder="Benzin qoldigini kiriting"
//               />
//             </div>
//             <div className="space-y-2">
//               <label
//                 htmlFor="branch"
//                 className="text-[17px] font-medium text-gray-700"
//               >
//                 Fillial
//               </label>
//               <select
//                 id="branch"
//                 onChange={(e) => setSelect(e.target.value)}
//                 className="w-full h-11 px-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               >
//                 <option value="">Fillialni tanlang</option>
//                 {branch?.map((value) => (
//                   <option value={value.id}>{value.name}</option>
//                 ))}
//               </select>
//             </div>
//           </form>
//         </div>
//       </Modal>
//     </section>
//   );
// }

// export default BenzinTurlari;

// import { Button, Input, Modal } from "antd";
// import React, { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
// import notificationApi from "../../generic/notify";
// import { useAxios } from "../../axios";

// function BenzinTurlari() {
//   const axios = useAxios();
//   const notify = notificationApi();
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
//   const [deleteId, setDeleteId] = useState(null);

//   const [branch, setBranch] = useState([]);
//   const [name, setName] = useState("");
//   const [price, setPrice] = useState("");
//   const [selectt, setSelect] = useState("");
//   const [stock, setStock] = useState("");
//   const [benzinData, setBenzinData] = useState([]);

//   const location = useLocation();

//   useEffect(() => {
//     axios({
//       url: "/register/",
//       method: "GET",
//     })
//       .then((data) => setBranch(data.data))
//       .catch((error) => console.log(error));
//   }, []);

//   const postData = () => {
//     const data = {
//       branch: selectt,
//       name,
//       price,
//       stock,
//     };
//     if (!selectt || !name || !price || !stock) {
//       notify({ type: "fullData" });
//       return;
//     }

//     axios({
//       url: `/benzin/`,
//       method: "POST",
//       data,
//     })
//       .then((data) => {
//         notify({ type: "Saved" });
//         getBenzinData(); // ma'lumotlarni yangilaymiz
//       })
//       .catch((error) => console.log(error));
//   };

//   const getBenzinData = () => {
//     axios({
//       url: `/benzin/`,
//       method: "GET",
//     })
//       .then((data) => {
//         setBenzinData(data);
//       })
//       .catch((error) => console.log(error));
//   };

//   useEffect(() => {
//     getBenzinData();
//   }, []);

//   const deleteBenzin = () => {
//     axios({
//       url: `/benzins/${deleteId}/`,
//       method: "DELETE",
//     })
//       .then(() => {
//         notify({ type: "Deleted" });
//         setIsDeleteModalOpen(false);
//         setDeleteId(null);
//         getBenzinData();
//       })
//       .catch((err) => {
//         console.error(err);
//       });
//   };

//   return (
//     <section className="bg-[#f9fafb] min-h-screen">
//       <div className="w-[90%] m-auto pt-[20px]">
//         <div className="bg-blue-600 flex items-center justify-between p-5 rounded-md">
//           <h2 className="text-[#FFF] text-[25px] font-bold">Benzin turlari</h2>
//           <Button onClick={() => setIsModalOpen(true)}>Add benzin</Button>
//         </div>

//         <table className="w-full mt-7">
//           <thead className="bg-gray-200">
//             <tr>
//               <th className="border border-gray-300 px-4 py-2 w-1/5">Branch</th>
//               <th className="border border-gray-300 px-4 py-2 w-1/5">Name</th>
//               <th className="border border-gray-300 px-4 py-2 w-1/5">Price</th>
//               <th className="border border-gray-300 px-4 py-2 w-1/5">Stock</th>
//               <th className="border border-gray-300 px-4 py-2 w-1/5">
//                 Amallar
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {benzinData && benzinData.length > 0 ? (
//               benzinData.map((value) => (
//                 <tr className="hover:bg-gray-100" key={value?.id}>
//                   <td className="border border-gray-300 px-4 py-2 text-center">
//                     {value?.branch}
//                   </td>
//                   <td className="border border-gray-300 px-4 py-2 text-center">
//                     {value?.name}
//                   </td>
//                   <td className="border border-gray-300 px-4 py-2 text-center">
//                     {value?.price}
//                   </td>
//                   <td className="border border-gray-300 px-4 py-2 text-center">
//                     {value?.stock}
//                   </td>
//                   <td className="border border-gray-300 px-4 py-2 text-end">
//                     <Button className="w-[80px] mr-2" type="primary">
//                       Tahrirlash
//                     </Button>
//                     <Button
//                       className="w-[80px]"
//                       danger
//                       onClick={() => {
//                         setDeleteId(value?.id);
//                         setIsDeleteModalOpen(true);
//                       }}
//                     >
//                       O‘chirish
//                     </Button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td
//                   colSpan="5"
//                   className="border border-gray-300 px-4 py-2 text-center text-gray-500"
//                 >
//                   Ma'lumot topilmadi
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Add Modal */}
//       <Modal
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
//             Saqlash
//           </Button>,
//         ]}
//       >
//         <div className="mt-5">
//           <form className="flex flex-col gap-7">
//             <div className="space-y-2">
//               <label
//                 htmlFor="benzin"
//                 className="text-[17px] font-medium text-gray-700"
//               >
//                 Benzin nomi
//               </label>
//               <Input
//                 id="benzin"
//                 required
//                 className="h-11 rounded-lg text-base"
//                 onChange={(e) => setName(e.target.value)}
//                 placeholder="Benzin nomini kiriting"
//               />
//             </div>
//             <div className="space-y-2">
//               <label
//                 htmlFor="price"
//                 className="text-[17px] font-medium text-gray-700"
//               >
//                 Benzin narxi
//               </label>
//               <Input
//                 id="price"
//                 required
//                 className="h-11 rounded-lg text-base"
//                 onChange={(e) => setPrice(e.target.value)}
//                 placeholder="Benzin narxini kiriting"
//               />
//             </div>
//             <div className="space-y-2">
//               <label
//                 htmlFor="qoldiq"
//                 className="text-[17px] font-medium text-gray-700"
//               >
//                 Benzin qoldiq
//               </label>
//               <Input
//                 id="qoldiq"
//                 required
//                 className="h-11 rounded-lg text-base"
//                 onChange={(e) => setStock(e.target.value)}
//                 placeholder="Benzin qoldigini kiriting"
//               />
//             </div>
//             <div className="space-y-2">
//               <label
//                 htmlFor="branch"
//                 className="text-[17px] font-medium text-gray-700"
//               >
//                 Fillial
//               </label>
//               <select
//                 id="branch"
//                 onChange={(e) => setSelect(e.target.value)}
//                 className="w-full h-11 px-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               >
//                 <option value="">Fillialni tanlang</option>
//                 {branch?.map((value) => (
//                   <option key={value.id} value={value.id}>
//                     {value.name}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </form>
//         </div>
//       </Modal>

//       {/* Delete Confirm Modal */}
//       <Modal
//         open={isDeleteModalOpen}
//         onCancel={() => setIsDeleteModalOpen(false)}
//         footer={[
//           <Button key="cancel" onClick={() => setIsDeleteModalOpen(false)}>
//             Bekor qilish
//           </Button>,
//           <Button key="delete" type="primary" danger onClick={deleteBenzin}>
//             Ha, o‘chirish
//           </Button>,
//         ]}
//       >
//         <p>Rostdan ham ushbu benzin turini o‘chirmoqchimisiz?</p>
//       </Modal>
//     </section>
//   );
// }

// export default BenzinTurlari;

import { Button, Input, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import notificationApi from "../../generic/notify";
import { useAxios } from "../../axios";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
function BenzinTurlari() {
  const axios = useAxios();
  const notify = notificationApi();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false); // bu tahrirlash uchun
  const [editId, setEditId] = useState(null); // qaysi id tahrirlanmoqda
  const [deleteId, setDeleteId] = useState(null);

  const [branch, setBranch] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [selectt, setSelect] = useState("");
  const [stock, setStock] = useState("");
  const [benzinData, setBenzinData] = useState([]);

  const location = useLocation();
  const branchId = location.state?.branchId;

  useEffect(() => {
    axios({
      url: "/register/",
      method: "GET",
    })
      .then((data) => setBranch(data.data))
      .catch((error) => console.log(error));
  }, []);

  const getBenzinData = () => {
    axios({
      url: `/benzin/`,
      method: "GET",
    })
      .then((data) => {
        setBenzinData(data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getBenzinData();
  }, []);

  const clearForm = () => {
    setName("");
    setPrice("");
    setStock("");
    setSelect("");
    setEditId(null);
    setIsEdit(false);
  };

  const postData = () => {
    if (!selectt || !name || !price || !stock) {
      notify({ type: "fullData" });
      return;
    }

    const data = { branch: selectt, name, price, stock };

    if (isEdit && editId) {
      // EDIT
      axios({
        url: `/benzins/${editId}/`,
        method: "PUT",
        data,
      })
        .then(() => {
          notify({ type: "Edited" });
          setIsModalOpen(false);
          clearForm();
          getBenzinData();
        })
        .catch((error) => console.log(error));
    } else {
      // CREATE
      axios({
        url: `/benzin/`,
        method: "POST",
        data,
      })
        .then(() => {
          notify({ type: "Saved" });
          setIsModalOpen(false);
          clearForm();
          getBenzinData();
        })
        .catch((error) => console.log(error));
    }
  };

  const openEditModal = (value) => {
    setName(value?.name);
    setPrice(value?.price);
    setStock(value?.stock);
    setSelect(value?.branch);
    setEditId(value?.id);
    setIsEdit(true);
    setIsModalOpen(true);
  };

  const deleteBenzin = () => {
    axios({
      url: `/benzins/${deleteId}/`,
      method: "DELETE",
    })
      .then(() => {
        notify({ type: "Deleted" });
        setIsDeleteModalOpen(false);
        setDeleteId(null);
        getBenzinData();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <section className="bg-[#f9fafb] min-h-screen">
      <div className="w-[90%] m-auto pt-[20px]">
        <div className="bg-blue-600 flex items-center justify-between p-5 rounded-md">
          <h2 className="text-[#FFF] text-[25px] font-bold">Benzin turlari</h2>
          <Button
            onClick={() => {
              clearForm();
              setIsModalOpen(true);
            }}
          >
            Add benzin
          </Button>
        </div>

        <table className="w-full mt-7 block  max-[768px]:hidden">
          <thead className="bg-gray-200">
            <tr>
              <th className="border border-gray-300 px-4 py-2 w-1/4">Branch</th>
              <th className="border border-gray-300 px-4 py-2 w-1/4">Name</th>
              <th className="border border-gray-300 px-4 py-2 w-1/4">Price</th>
              <th className="border border-gray-300 px-4 py-2 w-1/4">Stock</th>
              <th className="border border-gray-300 px-4 py-2 w-1/7">
                Amallar
              </th>
            </tr>
          </thead>
          <tbody>
            {benzinData && benzinData.length > 0 ? (
              benzinData?.map((value) => (
                <tr className="hover:bg-gray-100" key={value?.id}>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {value?.branch}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {value?.name}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {value?.price}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {value?.stock}
                    dcdcd
                  </td>
                  <td className="border border-gray-300 px-4 py-2 flex text-center">
                    <Button
                      className="w-[40px] mr-2"
                      type="primary"
                      onClick={() => openEditModal(value)}
                    >
                      <EditOutlined />
                    </Button>
                    <Button
                      className="w-[40px]"
                      danger
                      onClick={() => {
                        setDeleteId(value?.id);
                        setIsDeleteModalOpen(true);
                      }}
                    >
                      <DeleteOutlined />
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="border border-gray-300 px-4 py-2 text-center text-gray-500"
                >
                  Ma'lumot topilmadi
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className=" flex-col gap-3 mt-5 bg-gray-200 hidden max-[768px]:flex max-[768px]:block">
          {benzinData?.map((value) => (
            <div className="space-y-4 ">
              <div className="border  shadow-sm p-4 bg-white">
                <div className="flex justify-between pb-2 border-b">
                  <span className="font-medium">Branch</span>
                  <span>{value?.branch}</span>
                </div>
                <div className="flex justify-between mt-2 pb-2 border-b">
                  <span className="font-medium">Name</span>
                  <span>{value?.name}</span>
                </div>
                <div className="flex justify-between mt-2 pb-2 border-b">
                  <span className="font-medium">Price</span>
                  <span className="">{value?.price}</span>
                </div>
                <div className="flex justify-between mt-2 pb-2 border-b">
                  <span className="font-medium">Stock</span>
                  <span>{value?.stock}</span>
                </div>
                <div className="flex justify-between mt-3  border-b">
                  <span className="font-medium">Amallar</span>
                  <span className="flex items-center gap-4">
                    <p onClick={() => openEditModal(value)}>
                      <EditOutlined /> Edit
                    </p>
                    <p
                      className="text-red-600"
                      onClick={() => {
                        setDeleteId(value?.id);
                        setIsDeleteModalOpen(true);
                      }}
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

      {/* Create/Edit Modal */}
      <Modal
        className="modall"
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          clearForm();
        }}
        footer={[
          <Button
            className="w-[120px] text-[15px] max-[768px]:w-[90px] max-[768px]:text-[12px]"
            key="cancel"
            onClick={() => {
              setIsModalOpen(false);
              clearForm();
            }}
          >
            Bekor qilish
          </Button>,
          <Button
            className="w-[120px] text-[15px] max-[768px]:w-[90px] max-[768px]:text-[12px]"
            key="submit"
            type="primary"
            onClick={postData}
          >
            {isEdit ? "Yangilash" : "Saqlash"}
          </Button>,
        ]}
      >
        <div className="mt-5">
          <form className="flex flex-col gap-7 max-[768px]:text-[0.9em]">
            <div className="space-y-2">
              <label
                htmlFor="benzin"
                className="text-[1em] font-medium text-gray-700"
              >
                Benzin nomi
              </label>
              <Input
                id="benzin"
                className="h-[35px] rounded-md text-[1em] max-[768px]:h-[30px]"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Benzin nomini kiriting"
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="price"
                className="text-[1em] font-medium text-gray-700"
              >
                Benzin narxi
              </label>
              <Input
                id="price"
                className="h-[35px] rounded-md text-[1em] max-[768px]:h-[30px]"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Benzin narxini kiriting"
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="qoldiq"
                className="text-[1em] font-medium text-gray-700"
              >
                Benzin qoldiq
              </label>
              <Input
                id="qoldiq"
                className="h-[35px] rounded-md text-[1em] max-[768px]:h-[30px]"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                placeholder="Benzin qoldigini kiriting"
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="branch"
                className="text-[1em] font-medium text-gray-700"
              >
                Fillial
              </label>
              <select
                id="branch"
                value={selectt}
                onChange={(e) => setSelect(e.target.value)}
                className="w-full h-[35px] px-3 border border-gray-300 rounded-md bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 max-[768px]:h-[30px]"
              >
                <option value="">Fillialni tanlang</option>
                {branch?.map((value) => (
                  <option key={value.id} value={value.id}>
                    {value.name}
                  </option>
                ))}
              </select>
            </div>
          </form>
        </div>
      </Modal>

      {/* Delete Confirm Modal */}
      <Modal
        className="modall"
        open={isDeleteModalOpen}
        onCancel={() => setIsDeleteModalOpen(false)}
        footer={[
          <Button
            className="w-[120px] text-[15px] max-[768px]:w-[90px] max-[768px]:text-[12px]"
            key="cancel"
            onClick={() => setIsDeleteModalOpen(false)}
          >
            Bekor qilish
          </Button>,
          <Button
            className="w-[120px] text-[15px] max-[768px]:w-[90px] max-[768px]:text-[12px]"
            key="delete"
            type="primary"
            danger
            onClick={deleteBenzin}
          >
            Ha, o‘chirish
          </Button>,
        ]}
      >
        <p className="text-[1em] max-[768px]:text-[0.9em]">
          Rostdan ham ushbu benzin turini o‘chirmoqchimisiz?
        </p>
      </Modal>
    </section>
  );
}

export default BenzinTurlari;
