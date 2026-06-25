"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const data = [
  { name: "Mon", requests: 5 },
  { name: "Tue", requests: 8 },
  { name: "Wed", requests: 12 },
  { name: "Thu", requests: 7 },
  { name: "Fri", requests: 10 },
  { name: "Sat", requests: 15 },
  { name: "Sun", requests: 9 },
];

const Rechart = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800">
          Donation Requests
        </h2>
        <p className="text-sm text-gray-500">
          Daily donation request statistics
        </p>
      </div>

      <div className="h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
            />

            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={false}
            />

            <YAxis
              tickLine={false}
              axisLine={false}
            />

            <Tooltip />

            <Bar
              dataKey="requests"
              radius={[10, 10, 0, 0]}
              fill="#ef4444"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Rechart;