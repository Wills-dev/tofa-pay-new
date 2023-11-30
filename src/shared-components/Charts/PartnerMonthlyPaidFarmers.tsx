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
import { useGetPartnerMonthlyPaidFarmers } from "@/hooks/useGetPartnerMonthlyPaidFarmers";

const PartnerMonthlyPaidFarmers = () => {
  const { noOfPartnerPaidFarmersMontly, isLoading } =
    useGetPartnerMonthlyPaidFarmers();

  return (
    <div className="mt-20 flex-1">
      <div className="mb-10">
        <p className="text-xl font-semibold tracking-light text-slate-900">
          Number of Monthly paid Farmers
        </p>
      </div>
      <div className="w-full max-w-full h-[400px] lg:h-[500px]">
        {isLoading ? (
          <ChartLoader />
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              width={500}
              height={300}
              data={noOfPartnerPaidFarmersMontly}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="noOfPaid"
                fill="#8884d8"
                activeBar={<Rectangle fill="#8884d8" stroke="#8884d8" />}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default PartnerMonthlyPaidFarmers;
