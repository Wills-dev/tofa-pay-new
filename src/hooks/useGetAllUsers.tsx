import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userDetaillsType } from "@/types/types";
import { axiosInstance } from "@/shared-components/baseUrl";
import { useQuery } from "react-query";
import toast from "react-hot-toast";

export const useGetAllUsers = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 10;

  const navigate = useNavigate();

  const onUserErr = (error: any) => {
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

  const getAllUsers = () => {
    return axiosInstance
      .get(`/user/get-all-users`)
      .then((res) => res?.data?.Users?.rows);
  };

  const { data: allUsers, isLoading: loading } = useQuery(
    "users",
    getAllUsers,
    {
      onError: onUserErr,
    }
  );

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
  const filteredData = allUsers?.filter(
    (item: userDetaillsType) =>
      item?.companyName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item?.firstName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item?.lastName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item?.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item?.role?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastItem = (currentPage + 1) * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = filteredData?.slice(indexOfFirstItem, indexOfLastItem);

  return {
    currentUsers,
    itemsPerPage,
    paginate,
    loading,
    searchQuery,
    allUsers,
    filterData,
    filteredData,
  };
};
