import { useNavigate } from "react-router-dom";
import { PartnerType } from "@/types/types";
import { useState } from "react";
import { axiosInstance } from "@/shared-components/baseUrl";
import { useQuery } from "react-query";
import toast from "react-hot-toast";

export const useGetAllPartner = () => {
  const navigate = useNavigate();

  //   const [allPartner, setAllPartner] = useState<PartnerType[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 10;
  const [noMatch, setNoMatch] = useState(false);

  const onListErr = (error: any) => {
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

  const getAllList = () => {
    return axiosInstance.get(`/company/all`).then((res) => res?.data);
  };

  const { data: allPartner, isLoading: loading } = useQuery(
    "list",
    getAllList,
    {
      onError: onListErr,
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
  const filteredData = allPartner?.filter(
    (item: PartnerType) =>
      item?.companyName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item?.companyInitial?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item?.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item?.phoneNumber?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item?.currency?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastItem = (currentPage + 1) * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPartnerTables = filteredData?.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  return {
    allPartner,
    filterData,
    filteredData,
    currentPartnerTables,
    noMatch,
    setNoMatch,
    loading,
    searchQuery,
    paginate,
    itemsPerPage,
  };
};
