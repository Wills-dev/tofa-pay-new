import { useGetMonthGrossProfit } from "@/hooks/useGetMonthGrossProfit";
import {
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import ChartLoader from "../SkeletonLoader/ChartLoader";

const MonthlyGrossProfit = () => {
  const { monthlyProfit, isLoading } = useGetMonthGrossProfit();

  return (
    <div className="mt-20 flex-1">
      <div className="mb-10">
        <p className="text-xl font-semibold tracking-light text-slate-900">
          Monthly Gross Revenue and Profit (₦)
        </p>
      </div>
      <div className="w-full max-w-full h-[400px] lg:h-[500px]">
        {isLoading ? (
          <ChartLoader />
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart width={500} height={400} data={monthlyProfit}>
              <CartesianGrid stroke="#f5f5f5" />
              <XAxis dataKey="month" scale="band" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="revenue" barSize={20} fill="#413ea0" />
              <Line type="monotone" dataKey="profit" stroke="#ff7300" />
            </ComposedChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default MonthlyGrossProfit;
