import React, { useEffect, useState } from "react";
import { useAxios } from "../../axios";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function StatusComponents() {
  const [data, setData] = useState(null);
  const axios = useAxios();

  useEffect(() => {
    axios({
      url: "/dashboard/",
      method: "GET",
    })
      .then((response) => {
        console.log("Dashboard response:", response);
        if (response && response.overall_stats) {
          setData(response.overall_stats);
        }
      })
      .catch((error) => console.log(error));
  }, []);

  // Ma'lumotlar yuklanayotganda yoki mavjud bo'lmaganda
  if (!data) {
    return (
      <section className="p-4">
        <div className="text-center py-12 bg-gray-100 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-700">
            Ma'lumotlar yuklanmoqda...
          </h2>
        </div>
      </section>
    );
  }

  // Pie chart data - moliyaviy ko'rsatkichlar
  // Bu yerda barcha 4 ta moliyaviy ko'rsatkichlarni qo'shdim
  const pieData = [
    { name: "Foyda", value: data.total_profit },
    { name: "Xarajat", value: data.total_expense },
    { name: "Qarz", value: data.total_debt },
    { name: "Kassa", value: data.kassa },
  ].filter((item) => item.value > 0);

  // Bar chart data - barcha 7 ta ko'rsatkichni qo'shdim
  const barData = [
    { name: "Foyda", value: data.total_profit },
    { name: "Xarajat", value: data.total_expense },
    { name: "Qarz", value: data.total_debt },
    { name: "Kiruvchi tovar", value: data.total_incoming_inventory },
    { name: "Chiquvchi tovar", value: data.total_outgoing_inventory },
    { name: "Qoldiq", value: data.total_astatka },
    { name: "Kassa", value: data.kassa },
  ];

  // Colors for charts - barcha 7 ta qiymat uchun 7 ta rang
  const COLORS = [
    "#0088FE",
    "#FF8042",
    "#FFBB28",
    "#00C49F",
    "#AF19FF",
    "#FF4560",
    "#2E93fA",
  ];

  return (
    <section className="p-4">
      <h1 className="text-2xl font-bold mb-8 text-center">
        Dashboard Statistikasi
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Doira Diagramma */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-center">
            Moliyaviy Ko'rsatkichlar
          </h2>
          {pieData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => new Intl.NumberFormat().format(value)}
                />
                <Legend
                  layout="horizontal"
                  verticalAlign="bottom"
                  align="center"
                />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-64">
              <p className="text-gray-500">
                Moliyaviy ko'rsatkichlar hozircha mavjud emas
              </p>
            </div>
          )}
        </div>

        {/* To'rtburchak Diagramma */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-center">
            Barcha Ko'rsatkichlar
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={barData}
              margin={{
                top: 5,
                right: 5,
                left: 5,
                bottom: 28,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 10 }}
                angle={-45}
                textAnchor="end"
                height={60}
              />
              <YAxis />
              <Tooltip
                formatter={(value) => new Intl.NumberFormat().format(value)}
              />
              <Legend
                layout="horizontal"
                verticalAlign="bottom"
                align="center"
                wrapperStyle={{ paddingTop: 10 }}
              />
              <Bar dataKey="value" fill="#8884d8">
                {barData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}

export default StatusComponents;
