import { axiosInstance } from "@/shared-components/baseUrl";
import toast from "react-hot-toast";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";

export const useGetMonthGrossProfit = () => {
  const navigate = useNavigate();

  const onError = (error: any) => {
    if (error.response.data.message) {
      toast.error(`${error.response.data.message}`, {
        duration: 4000,
        style: {
          background: "#353434",
          color: "#fff",
        },
      });
    } else if (error.response.data.Error === "Kindly login") {
      navigate("/login");
    } else if (error.response.data.Error) {
      toast.error(`${error.response.data.Error}`, {
        duration: 4000,
        style: {
          background: "#353434",
          color: "#fff",
        },
      });
    } else if (error.response.data.error) {
      toast.error(`${error.response.data.error}`, {
        duration: 4000,
        style: {
          background: "#353434",
          color: "#fff",
        },
      });
    } else if (
      !error.response.data.Error ||
      !error.response.data.error ||
      !error.response.data.message
    ) {
      return navigate(`/no-connection`);
    }
  };

  const getMonthlyPaidFarmers = () => {
    return axiosInstance
      .get(`/monthly-profit-revenue`)
      .then((res) => res?.data.monthlyProfitAndRevenue);
  };

  const { data: monthlyProfit, isLoading: isLoading } = useQuery(
    "tofa monthly profit",
    getMonthlyPaidFarmers,
    {
      onError: onError,
    }
  );

  return {
    monthlyProfit,
    isLoading,
  };
};
