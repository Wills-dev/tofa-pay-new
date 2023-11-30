import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { axiosInstance } from "@/shared-components/baseUrl";
import toast from "react-hot-toast";

interface ListRowIdType {
  id: string;
}

export const useGetListRowDetails = () => {
  const navigate = useNavigate();
  const [listDetails, setListDetails] = useState<ListRowIdType>({
    id: "",
  });
  const [loadDetails, setLoadDetails] = useState(false);

  const getListDetails = async (listId: string) => {
    setLoadDetails(true);
    try {
      const data = await axiosInstance.get(`/get-list/${listId}`);
      setListDetails(data.data.list);
      setLoadDetails(false);
    } catch (error: any) {
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
    listDetails,
    getListDetails,
    loadDetails,
  };
};
