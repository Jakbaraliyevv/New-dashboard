import { Button, Input } from "antd";
import { useNavigate } from "react-router-dom";
import notificationApi from "../../../generic/notify";
import { useEffect, useState } from "react";
import { useAxios } from "../../../axios";

function Register() {
  const notify = notificationApi();
  const navigate = useNavigate();
  const axios = useAxios();
  const [userName, setUserName] = useState("");
  const [name, setName] = useState("");
  const [lastname, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [selectValue, setSelectValue] = useState("");
  const [data, setData] = useState([]);
  const getValue = async () => {
    if (!userName || !password || !email || !selectValue) {
      notify({ type: "fullData" });
      return;
    }

    const data = {
      username: userName,
      first_name: name,
      last_name: lastname,
      email,
      password,
      branch: selectValue,
    };

    try {
      const response = await fetch("https://bcrm.uz/api/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log(result);

      if (response.ok) {
        notify({
          type: "register",
        });
        localStorage.setItem("register", JSON.stringify(data));
        navigate("/login");
      } else {
        notify({
          type: "error",
          message: result.message || "Xatolik yuz berdi!",
        });
      }
    } catch (error) {
      console.error("Xatolik:", error);
      notify({ type: "error", message: "Tarmoq xatosi yuz berdi!" });
    }
  };

  useEffect(() => {
    axios({
      url: "/register/",
      method: "GET",
    })
      .then((data) => setData(data.data))
      .catch((error) => console.log(error));
  }, []);
  console.log(data);
  return (
    <section className="bg-gradient-to-r from-blue-600 to-blue-400 min-h-screen">
      <div className="w-full max-w-5xl mx-auto px-4 py-12 min-h-screen flex items-center justify-center">
        <div className="w-full md:w-4/5 lg:w-3/4 bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="hidden md:block md:w-2/5 bg-gradient-to-br from-blue-500 to-indigo-600 p-8 text-white">
              <div className="h-full flex flex-col justify-between">
                <div>
                  <h2 className="text-3xl font-bold mb-6">Xush kelibsiz!</h2>
                  <p className="mb-8">
                    Bizning platformamizga a'zo bo'ling va barcha
                    imkoniyatlardan foydalaning.
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-blue-400 flex items-center justify-center mr-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <p>Tezkor va oson ro'yxatdan o'tish</p>
                  </div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-blue-400 flex items-center justify-center mr-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <p>Xavfsiz ma'lumotlar saqlash</p>
                  </div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-blue-400 flex items-center justify-center mr-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <p>24/7 mijozlar xizmati</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full md:w-3/5 p-8">
              <div className="mb-6 text-center">
                <h1 className="text-2xl font-bold text-gray-800">
                  Ro'yxatdan o'tish
                </h1>
                <p className="text-gray-600 mt-2">
                  Barcha imkoniyatlardan foydalanish uchun hisob yarating
                </p>
              </div>

              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label
                      htmlFor="firstname"
                      className="text-sm font-medium text-gray-700"
                    >
                      Ismingiz
                    </label>
                    <Input
                      id="firstname"
                      required
                      className="h-11 rounded-lg text-base"
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ismingizni kiriting"
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="lastname"
                      className="text-sm font-medium text-gray-700"
                    >
                      Familiyangiz
                    </label>
                    <Input
                      id="lastname"
                      required
                      className="h-11 rounded-lg text-base"
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Familiyangizni kiriting"
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="username"
                      className="text-sm font-medium text-gray-700"
                    >
                      Foydalanuvchi nomi
                    </label>
                    <Input
                      id="username"
                      required
                      className="h-11 rounded-lg text-base"
                      onChange={(e) => setUserName(e.target.value)}
                      placeholder="Foydalanuvchi nomini kiriting"
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="text-sm font-medium text-gray-700"
                    >
                      Email
                    </label>
                    <Input
                      id="email"
                      required
                      type="email"
                      className="h-11 rounded-lg text-base"
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email manzilingizni kiriting"
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="password"
                      className="text-sm font-medium text-gray-700"
                    >
                      Parol
                    </label>
                    <Input
                      id="password"
                      required
                      type="password"
                      className="h-11 rounded-lg text-base"
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Parolingizni kiriting"
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="branch"
                      className="text-sm font-medium text-gray-700"
                    >
                      Bo'lim
                    </label>
                    <select
                      id="branch"
                      onChange={(e) => setSelectValue(e.target.value)}
                      className="w-full h-11 px-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Fillialni tanlang</option>
                      {data?.map((value) => (
                        <option value={value.id}>{value.name}</option>
                      ))}
                      {/* <option value="2">Bo'lim 2</option>
                      <option value="3">Bo'lim 3</option> */}
                    </select>
                  </div>
                </div>

                <div className="pt-4">
                  <Button
                    onClick={getValue}
                    type="primary"
                    className="w-full h-12 rounded-lg text-base font-medium bg-blue-600 hover:bg-blue-700 border-none shadow-md"
                  >
                    Ro'yxatdan o'tish
                  </Button>
                </div>

                <div className="text-center text-gray-600 text-sm mt-4">
                  Allaqachon hisobingiz bormi?{" "}
                  <a href="/" className="text-blue-600 hover:underline">
                    Kirish
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Register;
