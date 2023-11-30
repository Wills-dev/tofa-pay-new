import { useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useQuery } from "react-query";

import { GlobalContext } from "@/utils/GlobalState";
import { ListDataType } from "@/types/types";
import { axiosInstance } from "@/shared-components/baseUrl";
import toast from "react-hot-toast";

export const useGetAllListTables = () => {
  const { user } = useContext(GlobalContext);

  const navigate = useNavigate();

  const [listSummary, setListSummary] = useState<ListDataType[]>([]);
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
    return axiosInstance
      .get(`/get-list-summary`)
      .then((res) => res.data.filteredData);
  };

  const { data: allList, isLoading: loading } = useQuery("list", getAllList, {
    onError: onListErr,
  });

  useMemo(() => {
    if (user.role === "Partner" || user.role === "Partner Agents") {
      const filterPartnerList = allList?.filter(
        (list: ListDataType) => list.companyInitial === user?.companyInitial
      );
      setListSummary(filterPartnerList);
    } else {
      setListSummary(allList);
    }
  }, [allList]);

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
  const filteredData = listSummary?.filter(
    (item: ListDataType) =>
      item?.companyInitial?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item?.tableId?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastItem = (currentPage + 1) * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentListTables = filteredData?.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  return {
    filterData,
    filteredData,
    currentListTables,
    noMatch,
    setNoMatch,
    loading,
    searchQuery,
    paginate,
    itemsPerPage,
  };
};
