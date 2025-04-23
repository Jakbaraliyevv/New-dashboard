import { Button, Input, Modal, notification } from "antd";
import React, { useEffect, useState } from "react";
import { useAxios } from "../../axios";
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
function KirimIncomimngComponents() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [branch, setBranch] = useState([]);
  const [benzinData, setBenzinData] = useState([]);
  const axios = useAxios();
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [byId, setByID] = useState({});

  // Post uchun get value
  const [fillial, setFillial] = useState("");
  const [benzin, setBenzin] = useState("");
  const [miqdor, setMiqdor] = useState("");
  const [avtoRaqam, setAvtoRaqam] = useState("");
  const [umumiy, setUmumumiy] = useState("");
  const [sotuvSumma, setSotuvSumma] = useState("");
  const [editId, setEditID] = useState(null);
  const [edit, setEdit] = useState(false);

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
      url: "/benzin/",
      method: "GET",
    })
      .then((data) => setBenzinData(data))
      .catch((error) => console.log(error));
  }, []);

  const getIncomingData = () => {
    axios({
      url: "/incoming/",
      method: "GET",
    })
      .then((data) => setData(data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getIncomingData();
  }, []);

  const postData = () => {
    const data = {
      benzin,
      car_number: avtoRaqam,
      quantity: miqdor,
      price: umumiy,
      sale_price: sotuvSumma,
      branch: fillial,
    };

    console.log(data, "sen dattttata");
    if (edit && editId) {
      axios({
        url: `/incomings/${editId}/`,
        method: "PUT",
        data,
      })
        .then((data) => {
          console.log(data);
          clearForm();
          getIncomingData();
          notification.success({ message: "Data saved successfully!" });
        })
        .catch((error) => console.log(error));
    } else {
      axios({
        url: "/incoming/",
        method: "POST",
        data,
      })
        .then((data) => {
          console.log(data);
          getIncomingData();
          notification.success({ message: "Data saved successfully!" });
        })
        .catch((error) => console.log(error));
    }
  };

  const clearForm = () => {
    setMiqdor("");
    setAvtoRaqam("");
    setUmumumiy("");
    setSotuvSumma("");
    setEditID(null), setEdit(false);
  };

  const openEditModal = (item) => {
    setMiqdor(item?.quantity);
    setAvtoRaqam(item?.car_number);
    setUmumumiy(item?.purchase_price);
    setSotuvSumma(item?.sale_price);
    setEditID(item?.id), setEdit(true);
    setIsModalOpen(true);
  };

  const openDeleteModal = (id) => {
    setDeleteUserId(id);
    setIsDeleteModalOpen(true);
  };

  const deleteUser = () => {
    if (deleteUserId) {
      axios({
        url: `/incomings/${deleteUserId}/`,
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

  // Bu more barchasini orish uchun olingan id
  const getByID = (id) => {
    axios({
      url: `/incomings/${id}/`,
      method: "GET",
    })
      .then((data) => setByID(data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    console.log("getByID chaqirildi", id);
    if (id) {
      getByID(id);
    }
  }, [id]);

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
            Kirim ro'yxati
          </h2>
          <Button
            className="text-[1em] w-[120px] max-[500px]:w-[100px] max-[500px]:h-[29px]"
            onClick={() => {
              setIsModalOpen(true);
              clearForm();
            }}
          >
            Add kirim
          </Button>
        </div>
        <table className="w-full mt-7 block  max-[768px]:hidden">
          <thead className="bg-gray-200">
            <tr>
              <th className="border text-[1em] border-gray-300 px-4 py-2 w-1/5">
                Mashina raqami
              </th>
              <th className="border text-[1em] border-gray-300 px-4 py-2 w-1/5">
                Benzin turi
              </th>
              <th className="border text-[1em] border-gray-300 px-4 py-2 w-1/5">
                Miqdori (litr)
              </th>
              <th className="border text-[1em] border-gray-300 px-4 py-2 w-1/5">
                Umumiy narx (so'm)
              </th>
              <th className="border text-[1em] border-gray-300 px-4 py-2 w-1/5">
                Sana/Vaqt
              </th>
              <th className="border text-[1em] border-gray-300 px-4 py-2 w-1/5">
                Amallar
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.results?.map((item, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="border text-[1em] border-gray-300 px-4 py-2 text-center">
                  {item?.car_number}
                </td>
                <td className="border text-[1em] border-gray-300 px-4 py-2 text-center">
                  {item?.benzin}
                </td>
                <td className="border text-[1em] border-gray-300 px-4 py-2 text-center">
                  {item?.quantity}
                </td>
                <td className="border text-[1em] border-gray-300 px-4 py-2 text-center">
                  {item?.purchase_price.toLocaleString()}
                </td>
                <td className="border text-[1em] border-gray-300 px-4 py-2 text-center">
                  {formatDate(item?.created_at)}
                </td>
                <td className="border text-[1em] border-gray-300 px-4 py-2  justify-center flex gap-2">
                  <Button
                    className="w-[40px] mr-2 text-[1em]"
                    type="primary"
                    onClick={() => {
                      openEditModal(item);
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
                  <Button
                    onClick={() => {
                      getByID(item?.id);
                      setIsDetailModalOpen(true);
                    }}
                  >
                    More
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className=" flex-col gap-3 mt-5 bg-gray-200 hidden max-[768px:flex max-[768px]:block">
          {data?.results?.map((value) => (
            <div key={value?.id} className="space-y-4 ">
              <div className="border  shadow-sm p-4 bg-white">
                <div className="flex justify-between  border-b">
                  <span className="font-medium">To'liq ma'lumot</span>
                  <p
                    onClick={() => {
                      getByID(value?.id);
                      setIsDetailModalOpen(true);
                    }}
                    className=" text-[12px]"
                  >
                    Batafsil <EyeOutlined />
                  </p>
                </div>

                <div className="flex justify-between mt-2 pb-2 border-b">
                  <span className="font-medium"> Mashina raqami</span>
                  <span>{value?.car_number}</span>
                </div>
                <div className="flex justify-between mt-2 pb-2 border-b">
                  <span className="font-medium">Benzin turi</span>
                  <span>{value?.benzin}</span>
                </div>
                <div className="flex justify-between mt-2 pb-2 border-b">
                  <span className="font-medium"> Miqdori (litr)</span>
                  <span className="">{value?.quantity}</span>
                </div>
                <div className="flex justify-between mt-2 pb-2 border-b">
                  <span className="font-medium"> Umumiy narx (so'm)</span>
                  <span>{value?.purchase_price.toLocaleString()}</span>
                </div>
                <div className="flex justify-between mt-2 pb-2 border-b">
                  <span className="font-medium"> Sana/Vaqt </span>
                  <span>{formatDate(value?.created_at)}</span>
                </div>
                <div className="flex justify-between mt-3  border-b">
                  <span className="font-medium">Amallar</span>
                  <span className="flex items-center gap-4">
                    <p
                      className="text-blue-600"
                      onClick={() => {
                        openEditModal(value);
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

      {/* Batafsil Ma'lummotlar */}
      <Modal
        className="modall"
        title="Batafsil ma'lumotlar"
        open={isDetailModalOpen}
        onCancel={() => setIsDetailModalOpen(false)}
        footer={[
          <Button
            className="w-[120px] text-[15px] max-[768px]:w-[90px] max-[768px]:text-[12px]"
            key="close"
            onClick={() => setIsDetailModalOpen(false)}
          >
            Yopish
          </Button>,
        ]}
      >
        {byId && (
          <div className="bg-gray-50 p-4 rounded">
            <table className="w-full border-collapse">
              <tbody>
                <tr className="border-b border-gray-200">
                  <td className="py-2 font-medium text-gray-600">Fillial:</td>
                  <td className="py-2">{byId?.branch}</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-2 font-medium text-gray-600">
                    Mashina raqami:
                  </td>
                  <td className="py-2">{byId?.car_number}</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-2 font-medium text-gray-600">
                    Benzin turi:
                  </td>
                  <td className="py-2">{byId?.benzin}</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-2 font-medium text-gray-600">Miqdori:</td>
                  <td className="py-2">{byId?.quantity} litr</td>
                </tr>

                <tr className="border-b border-gray-200">
                  <td className="py-2 font-medium text-gray-600">
                    Jami narxi:
                  </td>
                  <td className="py-2">
                    {byId?.price ? byId.price.toLocaleString() + " so'm" : "—"}
                  </td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-2 font-medium text-gray-600">
                    Xarid narxi:
                  </td>
                  <td className="py-2">
                    {byId?.purchase_price
                      ? byId.purchase_price.toLocaleString() + " so'm"
                      : "—"}
                  </td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-2 font-medium text-gray-600">
                    Sotuv narxi:
                  </td>
                  <td className="py-2">
                    {byId?.sale_price
                      ? byId.sale_price.toLocaleString() + " so'm"
                      : "—"}
                  </td>
                </tr>
                <tr>
                  <td className="py-2 font-medium text-gray-600">
                    Yaratilgan vaqt:
                  </td>
                  <td className="py-2">{formatDate(byId?.created_at)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </Modal>
      {/* Post va edit uchun */}
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
            {edit ? "Yangilash" : "Saqlash"}
          </Button>,
        ]}
      >
        <form className="flex flex-col gap-7 max-[768px]:text-[0.8em]">
          <div className="space-y-2">
            <label className="text-[1em] font-medium text-gray-700">
              Fillial
            </label>
            <select
              onChange={(e) => setFillial(e.target.value)}
              className="w-full h-[35px] px-3 border border-gray-300 rounded-md bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 max-[768px]:h-[30px]"
            >
              <option value="">Fillalni tanlang</option>
              {branch?.map((value) => (
                <option className="text-red" key={value?.id} value={value.id}>
                  {value?.name}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-[1em] font-medium text-gray-700">
              Benzin
            </label>
            <select
              onChange={(e) => setBenzin(e.target.value)}
              className="w-full h-[35px] px-3 border border-gray-300 rounded-md bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 max-[768px]:h-[30px]"
            >
              <option value="">Benzin tanlang</option>
              {benzinData?.map((value) => (
                <option className="text-red" key={value?.id} value={value.id}>
                  {value?.name}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-[1em] font-medium text-gray-700">
              Miqdor
            </label>
            <Input
              value={miqdor}
              required
              className="h-[35px] rounded-md text-[1.1em] max-[768px]:h-[30px]"
              onChange={(e) => setMiqdor(e.target.value)}
              placeholder="Miqdorini kiriting"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[1em] font-medium text-gray-700">
              Mashinaqa raqami
            </label>
            <Input
              value={avtoRaqam}
              required
              className="h-[35px] rounded-md text-[1.1em] max-[768px]:h-[30px]"
              onChange={(e) => setAvtoRaqam(e.target.value)}
              placeholder="Mashina raqamini kiriting"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[1em] font-medium text-gray-700">
              Umumiy summasi (so'm)
            </label>
            <Input
              value={umumiy}
              required
              className="h-[35px] rounded-md text-[1.1em] max-[768px]:h-[30px]"
              onChange={(e) => setUmumumiy(e.target.value)}
              placeholder="Umumiy summani kiriting"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[1em] font-medium text-gray-700">
              Sotuv summasi (so'm)
            </label>
            <Input
              value={sotuvSumma}
              required
              className="h-[35px] rounded-md text-[1.1em] max-[768px]:h-[30px]"
              onChange={(e) => setSotuvSumma(e.target.value)}
              placeholder="Sotuv summani kiriting"
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

export default KirimIncomimngComponents;
