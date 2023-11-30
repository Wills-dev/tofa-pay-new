import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { confirmAlert } from "react-confirm-alert";
import toast from "react-hot-toast";

import { axiosInstance } from "@/shared-components/baseUrl";

export const useDeleteListRow = () => {
  const [deleteLoader, setDeleteLoader] = useState<boolean>(false);
  const [rerenderTwo, setRerenderTwo] = useState<boolean>(true);

  const navigate = useNavigate();

  const submit = (productID: string) => {
    confirmAlert({
      title: "Confirm Delete",
      message: "Are you sure you want to delete this farmer from list?",
      buttons: [
        {
          label: "Yes",
          onClick: (e) => handleDeleteRow(productID),
        },
        {
          label: "No",
        },
      ],
    });
  };

  const handleDeleteRow = async (rowId: string) => {
    setDeleteLoader(true);
    try {
      await axiosInstance.delete(`/delete-list/${rowId}`);
      setDeleteLoader(false);

      toast.success("You have successfully deleted this Farmer from list", {
        duration: 4000,
        style: {
          background: "#353434",
          color: "#fff",
        },
      });
      setRerenderTwo((prev) => !prev);
    } catch (error: any) {
      setDeleteLoader(false);
      console.log("error", error);
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
    submit,
    deleteLoader,
    rerenderTwo,
  };
};
