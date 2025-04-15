import React, { useState } from "react";
import { Button, Modal, Input } from "antd";

function OutgoingComponents() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [selectt, setSelect] = useState("");
  const [branch, setBranch] = useState([
    { id: 1, name: "Chilonzor" },
    { id: 2, name: "Yunusobod" },
  ]);

  const clearForm = () => {
    setName("");
    setPrice("");
    setStock("");
    setSelect("");
    setIsModalOpen(false);
  };

  const postData = () => {
    console.log("Yangi benzin qo'shildi:", {
      name,
      price,
      stock,
      branchId: selectt,
    });
    clearForm();
  };

  const deleteBenzin = () => {
    console.log("Benzin o‘chirildi");
    setIsDeleteModalOpen(false);
  };

  return (
    <section className="bg-[#f9fafb] min-h-screen">
      <div className="w-[90%] m-auto pt-[20px]">
        <div className="bg-blue-600 flex items-center justify-between p-5 rounded-md">
          <h2 className="text-[#FFF] text-[25px] font-bold">Chiqimlar xolati</h2>
          <Button
            onClick={() => {
              clearForm();
              setIsModalOpen(true);
            }}
          >
            Add Chiqim
          </Button>
        </div>

        <table className="w-full mt-7">
          <thead className="bg-gray-200">
            <tr>
              <th className="border border-gray-300 px-4 py-2 w-1/5">Branch</th>
              <th className="border border-gray-300 px-4 py-2 w-1/5">Name</th>
              <th className="border border-gray-300 px-4 py-2 w-1/5">Price</th>
              <th className="border border-gray-300 px-4 py-2 w-1/5">Stock</th>
              <th className="border border-gray-300 px-4 py-2 w-1/5">
                Amallar
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="hover:bg-gray-100">
              <td className="border border-gray-300 px-4 py-2 text-center">
                Chilonzor
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                AI-91
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                7800
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                1200
              </td>
              <td className="border border-gray-300 px-4 py-2 text-end">
                <Button
                  className="w-[80px] mr-2"
                  type="primary"
                  onClick={() => setIsModalOpen(true)}
                >
                  Tahrirlash
                </Button>
                <Button
                  className="w-[80px]"
                  danger
                  onClick={() => setIsDeleteModalOpen(true)}
                >
                  O‘chirish
                </Button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Create/Edit Modal */}
      <Modal
        open={isModalOpen}
        onCancel={clearForm}
        footer={[
          <Button key="cancel" onClick={clearForm}>
            Bekor qilish
          </Button>,
          <Button key="submit" type="primary" onClick={postData}>
            Saqlash
          </Button>,
        ]}
      >
        <div className="mt-5">
          <form className="flex flex-col gap-7">
            <div className="space-y-2">
              <label
                htmlFor="benzin"
                className="text-[17px] font-medium text-gray-700"
              >
                Benzin nomi
              </label>
              <Input
                id="benzin"
                className="h-11 rounded-lg text-base"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Benzin nomini kiriting"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="price"
                className="text-[17px] font-medium text-gray-700"
              >
                Benzin narxi
              </label>
              <Input
                id="price"
                type="number"
                className="h-11 rounded-lg text-base"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Benzin narxini kiriting"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="qoldiq"
                className="text-[17px] font-medium text-gray-700"
              >
                Benzin qoldiq
              </label>
              <Input
                id="qoldiq"
                type="number"
                className="h-11 rounded-lg text-base"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                placeholder="Benzin qoldigini kiriting"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="branch"
                className="text-[17px] font-medium text-gray-700"
              >
                Fillial
              </label>
              <select
                id="branch"
                value={selectt}
                onChange={(e) => setSelect(e.target.value)}
                className="w-full h-11 px-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Fillialni tanlang</option>
                {branch.map((value) => (
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
        open={isDeleteModalOpen}
        onCancel={() => setIsDeleteModalOpen(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsDeleteModalOpen(false)}>
            Bekor qilish
          </Button>,
          <Button key="delete" type="primary" danger onClick={deleteBenzin}>
            Ha, o‘chirish
          </Button>,
        ]}
      >
        <p>Rostdan ham ushbu benzin turini o‘chirmoqchimisiz?</p>
      </Modal>
    </section>
  );
}

export default OutgoingComponents;
