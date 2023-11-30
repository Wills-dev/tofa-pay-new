import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import { axiosInstance } from "@/shared-components/baseUrl";
import toast from "react-hot-toast";

export const useApproveStatus = () => {
  const [approveStatusLoader, setAprroveStatustLoader] =
    useState<boolean>(false);
  const [rerender, setRerender] = useState<boolean>(true);
  const navigate = useNavigate();

  const submitStatusApproval = (productID: string, status: string) => {
    confirmAlert({
      title: "Confirm Approval",
      message: "Are you sure you want to approve this Farmer?",
      buttons: [
        {
          label: "Yes",
          onClick: (e) => handleStatusApproval(productID, status),
        },
        {
          label: "No",
        },
      ],
    });
  };

  const handleStatusApproval = async (
    rowId: string,
    approveListStatus: string
  ) => {
    setAprroveStatustLoader(true);

    try {
      const approveStatus = approveListStatus;

      const submitListStatusApproval = {
        Approve_status: approveStatus,
      };

      await axiosInstance.patch(
        `/update-approve-status/${rowId}`,
        submitListStatusApproval
      );
      setAprroveStatustLoader(false);
      setRerender((prev) => !prev);
      toast.success("You have successfully approved Farmer", {
        duration: 4000,
        style: {
          background: "#353434",
          color: "#fff",
        },
      });
    } catch (error: any) {
      console.log(error);
      setAprroveStatustLoader(false);
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
    submitStatusApproval,
    approveStatusLoader,
    rerender,
  };
};
