"use client";
import {
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type DataPoint = {
  date: string;
  count: number;
};

type MyLineChartProps = {
  data: DataPoint[];
};

const MyLineChart = ({ data }: MyLineChartProps) => {
  return (
    <>
      <LineChart width={400} height={400} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" label={{ value: "Date" }} className="pt-4" />
        <YAxis
          allowDecimals={false}
          label={{
            value: "Number of Chats",
            angle: -90,
            style: { textAnchor: "middle" },
          }}
        />
        <Tooltip />

        <Line
          type="monotone"
          dataKey="count"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </>
  );
};

export default MyLineChart;
