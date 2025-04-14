import { Button, Input, Modal } from "antd";
import { MoreOutlined } from "@ant-design/icons";

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAxios } from "../../axios";

const AddFillial = () => {
  const axios = useAxios();
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState("");
  const [menuOpen, setMenuOpen] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedBranchId, setSelectedBranchId] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const [branchData, setBranchData] = useState({
    id: null,
    name: "",
    address: "",
    manager: "",
    contact_number: "",
  });

  useEffect(() => {
    // Ekrandagi boshqa joyga bosilganda menyuni yopish
    const handleClickOutside = (event) => {
      if (!event.target.closest(".menu-container")) {
        setMenuOpen(null);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    fetchBranches();
    fetchDashboardData();
  }, [refreshTrigger]);

  const fetchDashboardData = () => {
    axios({
      url: "/dashboard/",
      method: "GET",
    })
      .then((data) => setData(data))
      .catch((error) => console.error("Xatolik:", error));
  };

  useEffect(() => {
    if (data2.length > 0) {
      setSelectedBranch(data2[0]?.name || "Noma'lum filial");
    }
  }, [data2]);

  const fetchBranches = () => {
    axios({
      url: "/register/",
      method: "GET",
    })
      .then((data) => setData2(data.data))
      .catch((error) => console.error("Xatolik:", error));
  };

  const selectedData = data?.branch_stats?.[selectedBranch] || {};

  const openAddModal = () => {
    setBranchData({
      id: null,
      name: "",
      address: "",
      manager: "",
      contact_number: "",
    });
    setIsEditMode(false);
    setIsModalOpen(true);
  };

  const openEditModal = (branch) => {
    setBranchData({
      id: branch.id,
      name: branch.name,
      address: branch.address,
      manager: branch.manager,
      contact_number: branch.contact_number,
    });
    setIsEditMode(true);
    setIsModalOpen(true);
    setMenuOpen(null);
  };

  const handleBranchSubmit = () => {
    if (isEditMode) {
      axios({
        url: `/branches/${branchData.id}/`,
        method: "PATCH",
        data: branchData,
      })
        .then((response) => {
          console.log("Branch updated:", response);
          setIsModalOpen(false);
          // Ma'lumotlarni yangilash uchun refresh triggerini yangilash
          setRefreshTrigger((prev) => prev + 1);
        })
        .catch((error) => console.log("Error updating branch:", error));
    } else {
      axios({
        url: "/branch/",
        method: "POST",
        data: branchData,
      })
        .then((response) => {
          console.log("Branch added:", response);
          setIsModalOpen(false);
          // Ma'lumotlarni yangilash uchun refresh triggerini yangilash
          setRefreshTrigger((prev) => prev + 1);
        })
        .catch((error) => console.log("Error adding branch:", error));
    }
  };

  const handleDeleteBranch = (branchId) => {
    setSelectedBranchId(branchId);
    setIsDeleteModalOpen(true);
    setMenuOpen(null);
  };

  const confirmDeleteBranch = () => {
    axios({
      url: `/branches/${selectedBranchId}/`,
      method: "DELETE",
    })
      .then((response) => {
        console.log("Branch deleted:", response);
        setIsDeleteModalOpen(false);
        // Ma'lumotlarni yangilash uchun refresh triggerini yangilash
        setRefreshTrigger((prev) => prev + 1);
      })
      .catch((error) => console.log("Error deleting branch:", error));
  };

  return (
    <section className="flex flex-col gap-5 max-[900px]:text-[0.9em]  max-[717px]:text-[0.8em]  max-[385px]:text-[0.7em]">
      <div className="flex flex-col gap-5 bg-[#FFF] shadow rounded-md p-5">
        <div className="flex items-center justify-between">
          <h1 className="text-[1.1em] font-bold">Fillallar ro'yxati</h1>
          <Button
            className=" buttonAndt text-[15px] w-[160px] max-[900px]:w-[140px] max-[900px]:text-[13px] "
            onClick={openAddModal}
          >
            Add new branch
          </Button>
        </div>

        <div className=" flex flex-wrap gap-4 max-[600px]:grid max-[600px]:grid-cols-3 max-[500px]:grid-cols-2">
          {data2?.map((value) => (
            <div
              key={value.id}
              className={` buttonAndt2 transition-colors duration-200 bg-[#e5e7eb] relative p-4 h-[3.2em] flex justify-between items-center w-fit min-w-[120px] rounded-md cursor-pointer pl-6 pr-8 max-[600px]:!w-full   ${
                selectedBranch === value.name
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              } `}
              onClick={() => setSelectedBranch(value.name)}
            >
              <div className="text-[1em] font-medium">
                {value?.name}
              </div>
              <MoreOutlined
                className="!text-[1.1em] font-bold cursor-pointer absolute top-2 right-2"
                onClick={(e) => {
                  e.stopPropagation();
                  setMenuOpen(menuOpen === value.id ? null : value.id);
                }}
              />
              {menuOpen === value.id && (
                <div className="menu-container absolute top-10 right-0 bg-white shadow-md rounded-md p-2 w-40 text-black z-10">
                  <button
                    className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                    onClick={() => openEditModal(value)}
                  >
                    Edit
                  </button>
                  <button
                    className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                    onClick={() => handleDeleteBranch(value.id)}
                  >
                    Delete
                  </button>
                  {/* <Link
                    to="/benzin-turlari"
                    state={{ branchId: value.id }} // ID ni to‘g‘ri yuborish
                    className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                  >
                    Add New Benzin
                  </Link> */}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <Link to={"/dashboard/benzin-turlari"}>
          <h2 className=" text-[1.2em] font-semibold text-gray-800 mb-4 border-b pb-2">
            {selectedBranch} filial statistikasi
          </h2>
        </Link>

        <div className="grid grid-cols-3 gap-[1.2em] max-[840px]:grid-cols-2 max-[436px]:grid-cols-1">
          <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center mb-2">
              <span className="text-[1.2em] mr-2">💰</span>
              <div className="text-[1em] text-gray-600 font-medium">Foyda</div>
            </div>
            <div className="text-[1.5em] font-bold text-blue-700">
              {selectedData?.profit}
            </div>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center mb-2">
              <span className="text-[1.2em] mr-2">💸</span>
              <div className="text-[1em] text-gray-600 font-medium">
                Xarajat
              </div>
            </div>
            <div className="text-[1.5em] font-bold text-blue-700">
              {selectedData?.expense}
            </div>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center mb-2">
              <span className="text-[1.2em] mr-2">📦</span>
              <div className="text-[1em] text-gray-600 font-medium">
                Kiruvchi miqdor
              </div>
            </div>
            <div className="text-[1.5em] font-bold text-blue-700">
              {selectedData?.debt}
            </div>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center mb-2">
              <span className="text-[1.2em] mr-2">📊</span>
              <div className="text-[1em] text-gray-600 font-medium">Qoldiq</div>
            </div>
            <div className="text-[1.5em] font-bold text-blue-700">
              {selectedData?.astatka}
            </div>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center mb-2">
              <span className="text-[1.2em] mr-2">💳</span>
              <div className="text-[1em] text-gray-600 font-medium">Qarz</div>
            </div>
            <div className="text-[1.5em] font-bold text-blue-700">
              {selectedData?.incoming_quantity}
            </div>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center mb-2">
              <span className="text-[1.2em] mr-2">💵</span>
              <div className="text-[1em] text-gray-600 font-medium">Kassa</div>
            </div>
            <div className="text-[1.5em] font-bold text-blue-700">
              {selectedData?.kassa}
            </div>
          </div>
        </div>
      </div>

      {/* Shared Modal for Add/Edit Branch */}
      <Modal
        title={isEditMode ? "Fillialni tahrirlash" : "Yangi fillial qo'shish"}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsModalOpen(false)}>
            Bekor qilish
          </Button>,
          <Button key="submit" type="primary" onClick={handleBranchSubmit}>
            {isEditMode ? "Saqlash" : "To'ldirish"}
          </Button>,
        ]}
      >
        <form className="flex flex-col gap-7 mt-7">
          <div className="space-y-2">
            <label
              htmlFor="branch"
              className="text-[1em] font-medium text-gray-700"
            >
              Fillial nomini kiriting
            </label>
            <Input
              name="name"
              value={branchData.name}
              onChange={(e) =>
                setBranchData({ ...branchData, name: e.target.value })
              }
              id="branch"
              required
              className="h-9 rounded-lg text-base"
              placeholder="Fillial nomini kiriting"
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="address"
              className="text-[1em] font-medium text-gray-700"
            >
              Manzilni kiriting
            </label>
            <Input
              id="address"
              name="address"
              value={branchData.address}
              onChange={(e) =>
                setBranchData({ ...branchData, address: e.target.value })
              }
              required
              className="h-9 rounded-lg text-base"
              placeholder="Manzilni kiriting"
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="manager"
              className="text-[1em] font-medium text-gray-700"
            >
              Manager
            </label>
            <Input
              name="manager"
              value={branchData.manager}
              onChange={(e) =>
                setBranchData({ ...branchData, manager: e.target.value })
              }
              id="manager"
              required
              className="h-9 rounded-lg text-base"
              placeholder="Manager ismini kiriting"
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="phone"
              className="text-[1em] font-medium text-gray-700"
            >
              Telefon raqamni kiriting
            </label>
            <Input
              name="contact_number"
              value={branchData.contact_number}
              onChange={(e) =>
                setBranchData({ ...branchData, contact_number: e.target.value })
              }
              id="phone"
              required
              className="h-9 rounded-lg text-base"
              placeholder="Telefon raqamini kiriting"
            />
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        title="Fillialni o'chirish"
        open={isDeleteModalOpen}
        onCancel={() => setIsDeleteModalOpen(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsDeleteModalOpen(false)}>
            Bekor qilish
          </Button>,
          <Button
            key="submit"
            type="primary"
            danger
            onClick={confirmDeleteBranch}
          >
            O'chirish
          </Button>,
        ]}
      >
        <p className="py-4">Haqiqatan ham bu fillialni o'chirmoqchimisiz?</p>
      </Modal>
    </section>
  );
};

export default AddFillial;
