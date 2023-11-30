import { axiosInstance } from "@/shared-components/baseUrl";
import { useState } from "react";
import { confirmAlert } from "react-confirm-alert";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useUpdateApproveStatusByTableId = () => {
  const navigate = useNavigate();
  const [loadAllStatus, setLoadAllStatus] = useState<boolean>(false);
  const [successReload, setSuccessReload] = useState<boolean>(false);

  const updateAllTableApproveStatus = (
    tableId: string | undefined,
    status: string
  ) => {
    confirmAlert({
      title: "Confirm Approve",
      message: "Are you sure you want to approve all farmers on this list?",
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
    setLoadAllStatus(true);
    try {
      const currentStatus = {
        Approve_status: status,
      };
      await axiosInstance.patch(
        `/update-approve-by-tableid/${tableId}`,
        currentStatus
      );

      setLoadAllStatus(false);
      toast.success(`You have successfully approve all farmers on this list`, {
        duration: 4000,
        style: {
          background: "#353434",
          color: "#fff",
        },
      });
      setSuccessReload((prev) => !prev);
    } catch (error: any) {
      setLoadAllStatus(false);
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
    loadAllStatus,
    successReload,
    updateAllTableApproveStatus,
  };
};
