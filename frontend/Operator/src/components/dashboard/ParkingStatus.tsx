
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

type StatusData = {
  status: string;
  value: number;
  color: string;
};

type ParkingStatusProps = {
  data: StatusData[];
};

export default function ParkingStatus({ data }: ParkingStatusProps) {
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            nameKey="status"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
