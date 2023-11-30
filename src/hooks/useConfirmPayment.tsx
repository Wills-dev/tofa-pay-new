import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { axiosInstance } from "@/shared-components/baseUrl";

import toast from "react-hot-toast";

export const useConfirmPayment = () => {
  const [paymentStatusLoader, setPaymentStatusLoader] =
    useState<boolean>(false);
  const [rerenderOne, setRerenderOne] = useState<boolean>(true);

  const navigate = useNavigate();

  const handlePayment = async (rowId: string, paymentStatus: string) => {
    setPaymentStatusLoader(true);
    try {
      const currentPaymentStatus = paymentStatus;
      const submitPaymentStatus = {
        Payment_status: currentPaymentStatus,
      };
      await axiosInstance.patch(
        `/update-payment-status/${rowId}`,
        submitPaymentStatus
      );
      if (currentPaymentStatus === "Paid") {
        toast.success("You have successfully paid farmer", {
          duration: 4000,
          style: {
            background: "#353434",
            color: "#fff",
          },
        });
      } else if ("Not Paid") {
        toast.success("Supplier has not been paid", {
          duration: 4000,
          style: {
            background: "#353434",
            color: "#fff",
          },
        });
      }
      setRerenderOne((prev) => !prev);
      setPaymentStatusLoader(false);
    } catch (error: any) {
      setPaymentStatusLoader(false);
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
    }
  };
  return {
    handlePayment,
    paymentStatusLoader,
    rerenderOne,
  };
};
