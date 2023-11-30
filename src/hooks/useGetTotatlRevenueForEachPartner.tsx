import { axiosInstance } from "@/shared-components/baseUrl";
import toast from "react-hot-toast";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";

export const useGetTotatlRevenueForEachPartner = () => {
  const navigate = useNavigate();

  const onListErr = (error: any) => {
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

  const getStatictics = () => {
    return axiosInstance
      .get(`/company/total-revenue-profit/all`)
      .then((res) => res?.data);
  };

  const { data: totalRevenuAndProfit, isLoading: isLoad } = useQuery(
    "total revenue and profit statistics",
    getStatictics,
    {
      onError: onListErr,
    }
  );

  return {
    totalRevenuAndProfit,
    isLoad,
  };
};
