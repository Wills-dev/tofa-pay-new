import { axiosInstance } from "@/shared-components/baseUrl";
import { GlobalContext } from "@/utils/GlobalState";
import { useContext } from "react";
import toast from "react-hot-toast";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";

export const useGetPartnerMonthlyRevenue = () => {
  const navigate = useNavigate();
  const { user } = useContext(GlobalContext);

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
      .get(`/company/monthly-revenue/${user?.companyInitial}`)
      .then((res) => res?.data?.CompanyRevenueMonthly);
  };

  const { data: partnerRevenueMontly, isLoading: isLoading } = useQuery(
    "monthly revenue partner",
    getMonthlyPaidFarmers,
    {
      onError: onError,
    }
  );

  return {
    partnerRevenueMontly,
    isLoading,
  };
};
