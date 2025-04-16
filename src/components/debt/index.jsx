import { Button, Input, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { EditOutlined, DeleteOutlined, CloseOutlined } from "@ant-design/icons";
import { useAxios } from "../../axios";

function DebtQarzlarComponents() {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false); // Tahrirlash holatini boshqarish
  const [showFullReason, setShowFullReason] = useState(false);
  const [activeReason, setActiveReason] = useState("");
  const [userData, setUserData] = useState();
  const [deleteId, setDeleteId] = useState(null);

  const [branch, setBranch] = useState();
  //  Get input value
  const [fillial, setFillial] = useState("");
  const [name, setName] = useState("");
  const [sabab, setSabab] = useState("");
  const [miqdor, setMiqdor] = useState("");
  const axios = useAxios();

  // Textni koproq korish uchun bu <>

  const truncateText = (text, maxLength = 30) => {
    if (text && text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  // Modalni ochish va tahrirlash holatini belgilash
  const openModal = (isEditMode) => {
    setIsEdit(isEditMode);
    setIsModalOpen(true);
    if (!isEditMode) {
      clearForm();
    }
  };

  // Textni koproq korish uchun bu </>

  //   Fillial Datani get qilish <>
  useEffect(() => {
    axios({
      method: "GET",
      url: "/register/",
    })
      .then((data) => setBranch(data))
      .catch((error) => console.log(error));
  }, []);

  //   Debtni get qilish

  const getOutgongData = () => {
    axios({
      method: "GET",
      url: "/debt/",
    })
      .then((data) => setUserData(data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getOutgongData();
  }, []);

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Oy indeksini 1 dan boshlash
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${day}.${month}.${year}, ${hours}:${minutes}`;
  };
  //   User Datani get qilish </>

  const postData = () => {
    const data = {
      name,
      miqdor,
      branch: fillial,
      izoh: sabab,
    };
    console.log(data, "data");
  };

  const clearForm = () => {};

  const deleteBenzin = () => {
    axios({
      url: `/debts/${deleteId}/`,
      method: "DELETE",
    })
      .then(() => {
        setIsDeleteModalOpen(false);
        setDeleteId(null);
        getOutgongData();
      })
      .catch((err) => {
        console.error(err);
      });
  };
  return (
    <section >
      <div className="">
        <div className="bg-blue-600 flex items-center justify-between p-5 rounded-md">
          <h2 className="text-[#FFF] text-[25px] font-bold">Qarzlar</h2>
          <Button
            onClick={() => openModal(false)} // Add holatida
          >
            Add Qarz
          </Button>
        </div>

        <table className="w-full mt-7 block max-[768px]:hidden">
          <thead className="bg-gray-200">
            <tr>
              <th className="border border-gray-300 px-4 py-2 w-1/5">Branch</th>
              <th className="border border-gray-300 px-4 py-2 w-1/5">Name</th>
              <th className="border border-gray-300 px-4 py-2 w-1/5">
                Miqdori
              </th>
              <th className="border border-gray-300 px-4 py-2 w-1/5">Sababi</th>
              <th className="border border-gray-300 px-4 py-2 w-1/5">
                Yaratilgan vaqti
              </th>
              <th className="border border-gray-300 px-4 py-2 w-1/7">
                Amallar
              </th>
            </tr>
          </thead>
          {userData?.results?.map((value) => (
            <tbody key={value?.id}>
              <tr className="hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {value?.branch}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {value?.nomi}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {value?.miqdori}
                </td>

                <td
                  onClick={() => {
                    setActiveReason(value?.description);
                    setShowFullReason(true);
                  }}
                  className="border border-gray-300 px-4 py-2 text-center relative group"
                >
                  <div className="flex items-center justify-center">
                    <span className="mr-1">
                      {truncateText(value?.description)}
                    </span>
                  </div>
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {formatDate(value?.created_at)}
                </td>
                <td className="border border-gray-300 px-4 py-2 flex justify-center">
                  <Button
                    className="w-[40px] mr-2"
                    type="primary"
                    onClick={() => openModal(true)} // Edit holatida
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
            </tbody>
          ))}
        </table>

        {/* To'liq matnni ko'rsatish uchun modal */}
        {showFullReason && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">To'liq sabab</h3>
                <button
                  onClick={() => setShowFullReason(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <CloseOutlined />
                </button>
              </div>
              <p className="text-gray-700">{activeReason}</p>
              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => setShowFullReason(false)}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Yopish
                </button>
              </div>
            </div>
          </div>
        )}
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
                htmlFor="branch"
                className="text-[1em] font-medium text-gray-700"
              >
                Fillial
              </label>
              <select
                id="branch"
                onChange={(e) => setFillial(e.target.value)}
                className="w-full h-[35px] px-3 border border-gray-300 rounded-md bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 max-[768px]:h-[30px]"
              >
                <option value="">Fillialni tanlang</option>
                {branch?.data?.map((value) => (
                  <option key={value?.id} value={value?.id}>
                    {value?.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="benzin"
                className="text-[1em] font-medium text-gray-700"
              >
                Nomi
              </label>
              <Input
                id="benzin"
                className="h-[35px] rounded-md text-[1em] max-[768px]:h-[30px]"
                onChange={(e) => setName(e.target.value)}
                placeholder="Nomini kiriting"
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="benzin"
                className="text-[1em] font-medium text-gray-700"
              >
                Miqdori
              </label>
              <Input
                id="benzin"
                className="h-[35px] rounded-md text-[1em] max-[768px]:h-[30px]"
                onChange={(e) => setMiqdor(e.target.value)}
                placeholder="Benzin miqdorini kiriting"
              />
            </div>
            <div>
              <label
                htmlFor="benzin"
                className="text-[1em] font-medium text-gray-700"
              >
                Izoh
              </label>
              <Input.TextArea
                onChange={(e) => setSabab(e.target.value)}
                placeholder="Izohni kiriting"
                rows={4}
              />
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

export default DebtQarzlarComponents;
