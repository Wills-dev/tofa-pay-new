import { axiosInstance } from "@/shared-components/baseUrl";
import { GlobalContext } from "@/utils/GlobalState";
import { useContext, useMemo, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { DisputeType } from "@/types/types";
import toast from "react-hot-toast";

export const useGetAllDispute = () => {
  const navigate = useNavigate();
  const { user } = useContext(GlobalContext);
  const [allUserDispute, setAllUserDispute] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 10;
  const [noMatch, setNoMatch] = useState(false);

  const onDisputeErr = (error: any) => {
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

  const getAllDispute = () => {
    return axiosInstance.get(`/get-disputes`).then((res) => res.data.disputes);
  };

  const { data: allDispute, isLoading: isLoading } = useQuery(
    "dispute",
    getAllDispute,
    {
      onError: onDisputeErr,
    }
  );

  // useMemo(() => {
  //   if (
  //     user?.role === "Partner" ||
  //     user?.role === "Partner Agents" ||
  //     user?.role === "Agent" ||
  //     user?.role === "Compliance"
  //   ) {
  //     setAllUserDispute(user.dispute);
  //   } else {
  //     setAllUserDispute(allDispute);
  //   }
  // }, [allDispute, user]);

  // Function to slice the data based on current page
  const paginate = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  // Function to filter the data based on the search query
  const filterData = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(0); // Reset to the first page when filtering
  };

  // Slice the data based on current page and items per page
  const filteredData = allDispute?.filter(
    (item: DisputeType) =>
      item?.user?.firstName
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      item?.user?.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item?.user?.lastName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item?.resolution?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item?.id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item?.complaint?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item?.user?.role?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastItem = (currentPage + 1) * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData?.slice(indexOfFirstItem, indexOfLastItem);

  return {
    currentItems,
    itemsPerPage,
    isLoading,
    allDispute,
    currentPage,
    setNoMatch,
    filterData,
    filteredData,
    paginate,
    user,
  };
};
