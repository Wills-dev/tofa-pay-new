import { useGetTofaMonthlyRevenue } from "@/hooks/useGetTofaMonthlyRevenue";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import ChartLoader from "../SkeletonLoader/ChartLoader";

const MonthlyProfit = () => {
  const { monthlyRevenue, isLoading } = useGetTofaMonthlyRevenue();

  return (
    <div className="mt-20">
      <div className="mb-10">
        <p className="text-xl font-semibold tracking-light text-slate-900">
          Monthly Gross Profit Per Partner (₦)
        </p>
      </div>
      <div className="w-full max-w-full h-[400px]  lg:h-[500px]">
        {isLoading ? (
          <ChartLoader />
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart width={500} height={300} data={monthlyRevenue}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="SIPI" stroke="#8884d8" />
              <Line type="monotone" dataKey="PIA" stroke="#82ca9d" />
              <Line type="monotone" dataKey="FMAN" stroke="#fb7837" />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default MonthlyProfit;
