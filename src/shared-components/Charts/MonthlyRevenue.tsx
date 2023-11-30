import { useGetTotatlRevenueForEachPartner } from "@/hooks/useGetTotatlRevenueForEachPartner";
import {
  PieChart,
  Pie,
  Sector,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import ChartLoader from "../SkeletonLoader/ChartLoader";

const MonthlyRevenue = () => {
  const { totalRevenuAndProfit, isLoad } = useGetTotatlRevenueForEachPartner();

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
  const COLORTWO = ["#FF8042", "#dddddd", "#000", "#0088FE"];

  return (
    <div className="mt-20 flex-1">
      <div className="mb-10">
        <p className="text-xl font-semibold tracking-light text-slate-900">
          Total Revenue and Profit Per Partner (₦)
        </p>
      </div>
      {isLoad ? (
        <ChartLoader />
      ) : (
        <div className="w-full">
          <PieChart width={800} height={250}>
            <Tooltip />
            <Pie
              data={
                totalRevenuAndProfit?.TotalRevenueForEachCompany &&
                totalRevenuAndProfit?.TotalRevenueForEachCompany
              }
              cx={100}
              cy={125}
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="revenue"
            >
              {totalRevenuAndProfit?.TotalRevenueForEachCompany?.map(
                (entry: string, index: number) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                )
              )}
            </Pie>
            <Pie
              data={
                totalRevenuAndProfit?.TotalProfitForEachCompany &&
                totalRevenuAndProfit?.TotalProfitForEachCompany
              }
              cx={400}
              cy={125}
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="profit"
            >
              {totalRevenuAndProfit?.TotalProfitForEachCompany.map(
                (entry: string, index: number) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORTWO[index % COLORTWO.length]}
                  />
                )
              )}
            </Pie>
          </PieChart>
        </div>
      )}
    </div>
  );
};

export default MonthlyRevenue;
