import { axiosInstance } from "@/shared-components/baseUrl";
import { useState } from "react";
import { confirmAlert } from "react-confirm-alert";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useUpdateApprovePaymentbyTableId = () => {
  const navigate = useNavigate();

  const [loadAllPaymentStatus, setLoadAllPaymentStatus] =
    useState<boolean>(false);
  const [successReload2, setSuccessReload2] = useState<boolean>(false);

  const updateAllTableApprovePaymment = (
    tableId: string | undefined,
    status: string
  ) => {
    confirmAlert({
      title: "Confirm Approve",
      message:
        "Are you sure you want to approve payment for all farmers on this list?",
      buttons: [
        {
          label: "Yes",
          onClick: (e) => handleUpdateAllTableApproveStatus(tableId, status),
        },
        {
          label: "No",
        },
      ],
    });
  };

  const handleUpdateAllTableApproveStatus = async (
    tableId: string | undefined,
    status: string
  ) => {
    setLoadAllPaymentStatus(true);
    try {
      const currentStatus = {
        Approve_payment: status,
      };
      await axiosInstance.patch(
        `/approve-payment-by-tableid/${tableId}`,
        currentStatus
      );
      setLoadAllPaymentStatus(false);
      toast.success(
        `You have successfully approve payment for all farmers on this list`,
        {
          duration: 4000,
          style: {
            background: "#353434",
            color: "#fff",
          },
        }
      );
      setSuccessReload2((prev) => !prev);
    } catch (error: any) {
      setLoadAllPaymentStatus(false);
      console.log(error);
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
    loadAllPaymentStatus,
    successReload2,
    updateAllTableApprovePaymment,
  };
};
