import { axiosInstance } from "@/shared-components/baseUrl";
import { GlobalContext } from "@/utils/GlobalState";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";

export const useGetPartnerStatistics = () => {
  const { user } = useContext(GlobalContext);
  const navigate = useNavigate();
  const [makeCall, setMakeCall] = useState<boolean>(false);

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
      .get(`/company/statistics/${user?.companyInitial}`)
      .then((res) => res?.data?.companySummary);
  };

  const { data: allPartnerStatistics, isLoading: isLoading } = useQuery(
    "partner statistics",
    getStatictics,
    {
      enabled: makeCall,
      onError: onListErr,
    }
  );

  useEffect(() => {
    if (user?.role === "Partner Agents" || user?.role === "Partner") {
      setMakeCall(true);
    }
  }, []);

  return {
    allPartnerStatistics,
    isLoading,
  };
};
