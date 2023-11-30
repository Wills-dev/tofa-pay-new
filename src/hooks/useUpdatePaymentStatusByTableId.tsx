import { axiosInstance } from "@/shared-components/baseUrl";
import { useState } from "react";
import { confirmAlert } from "react-confirm-alert";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useUpdatePaymentStatusByTableId = () => {
  const navigate = useNavigate();

  const [loadAllConfirmPaymentStatus, setLoadAllConfirmPaymentStatus] =
    useState<boolean>(false);

  const updateAllTableConfirmPaymment = (
    tableId: string | undefined,
    status: string
  ) => {
    confirmAlert({
      title: "Confirm Payment",
      message:
        "Are you sure you want to confirm payment for all farmers on this list?",
      buttons: [
        {
          label: "Yes",
          onClick: () => handleUpdateAllTableApproveStatus(tableId, status),
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
    setLoadAllConfirmPaymentStatus(true);
    console.log(status);
    try {
      const currentStatus = {
        Payment_status: status,
      };
      await axiosInstance.patch(
        `/update-payment-status-by-tableid/${tableId}`,
        currentStatus
      );

      setLoadAllConfirmPaymentStatus(false);
      toast.success(
        `You have successfully confirmed payment for all farmers on this list`,
        {
          duration: 4000,
          style: {
            background: "#353434",
            color: "#fff",
          },
        }
      );
      setTimeout(() => {
        navigate(`/all-list-tables`);
      }, 2800);
    } catch (error: any) {
      setLoadAllConfirmPaymentStatus(false);
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
    loadAllConfirmPaymentStatus,
    updateAllTableConfirmPaymment,
  };
};
