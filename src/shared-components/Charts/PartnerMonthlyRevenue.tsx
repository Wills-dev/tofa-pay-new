import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import ChartLoader from "../SkeletonLoader/ChartLoader";
import { useGetPartnerMonthlyRevenue } from "@/hooks/useGetPartnerMonthlyRevenue";
import { useContext } from "react";
import { GlobalContext } from "@/utils/GlobalState";

const PartnerMonthlyRevenue = () => {
  const { user } = useContext(GlobalContext);
  const { partnerRevenueMontly, isLoading } = useGetPartnerMonthlyRevenue();

  return (
    <div className="mt-20 flex-1">
      <div className="mb-10">
        <p className="text-xl font-semibold tracking-light text-slate-900">
          Monthly Revenue ({user?.currency && user.currency})
        </p>
      </div>
      <div className="w-full max-w-full h-[400px] lg:h-[500px]">
        {isLoading ? (
          <ChartLoader />
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart width={500} height={300} data={partnerRevenueMontly}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="revenue"
                fill="#e46a76"
                activeBar={<Rectangle fill="pink" stroke="#e46a76" />}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default PartnerMonthlyRevenue;
