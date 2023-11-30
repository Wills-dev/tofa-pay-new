import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { axiosInstance } from "@/shared-components/baseUrl";
import toast from "react-hot-toast";

export const useApprovePayment = () => {
  const navigate = useNavigate();

  const [approvePaymentLoader, setApprovePaymentLoader] =
    useState<boolean>(false);
  const [rerenderThree, setRerenderThree] = useState<boolean>(true);

  const handlePaymentApproval = async (
    rowId: string,
    approvePaymentStatus: "Approved" | "Not-Approved"
  ) => {
    setApprovePaymentLoader(true);
    try {
      const currentSubmitPaymentApproval = {
        Approve_payment: approvePaymentStatus,
      };
      await axiosInstance.patch(
        `/update-approve-payment/${rowId}`,
        currentSubmitPaymentApproval
      );

      setApprovePaymentLoader(false);
      setRerenderThree((prev) => !prev);
      if (approvePaymentStatus === "Approved") {
        toast.success("You have successfully approved payment", {
          duration: 4000,
          style: {
            background: "#353434",
            color: "#fff",
          },
        });
      } else if (approvePaymentStatus === "Not-Approved") {
        toast.success("You have successfully disapproved payment", {
          duration: 4000,
          style: {
            background: "#353434",
            color: "#fff",
          },
        });
      }
    } catch (error: any) {
      console.log(error);
      setApprovePaymentLoader(false);
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
    handlePaymentApproval,
    approvePaymentLoader,
    rerenderThree,
  };
};
