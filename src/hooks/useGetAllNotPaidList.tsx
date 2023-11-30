import { useContext, useEffect, useState } from "react";

import { axiosInstance } from "@/shared-components/baseUrl";
import { GlobalContext } from "@/utils/GlobalState";
import { ListDataType } from "@/types/types";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const useGetAllNotPaidList = () => {
  const { user } = useContext(GlobalContext);
  const navigate = useNavigate();

  const [getAllList, setGetAllList] = useState<ListDataType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedKey, setSelectedKey] = useState<string>("");
  const [selectedValue, setSelectedValue] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 10;
  const [noMatch, setNoMatch] = useState(false);

  const getList = async () => {
    try {
      const userCompany = user.companyInitial && user.companyInitial;
      // const data = await axiosInstance.get(`/get-lists/${userCompany}`);
      // setGetAllList(data?.data?.lists?.rows);

      const data = await axiosInstance.get(`/get-list?page=0`);
      // partner list (Partner can only see their list)
      if (user.role === "Partner" || user.role === "Partner Agents") {
        const filterPartnerList = data?.data?.lists?.rows?.filter(
          (list: ListDataType) => list.companyInitial === user?.companyInitial
        );
        setGetAllList(filterPartnerList);
      } else {
        setGetAllList(data?.data?.lists?.rows);
      }
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
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

  //   filter function
  const handleValueChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedValue(value);

    const newArray = getAllList?.filter(
      (item: ListDataType) => item[selectedKey as keyof ListDataType] === value
    );
    if (newArray) {
      setGetAllList(newArray);
    }
  };

  const handleResetFilter = () => {
    getList();
    setSelectedKey("");
  };

  // Function to slice the data based on current page
  const paginate = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  // Function to filter the data based on the search query
  const filterData = (query: string) => {
    setSearchQuery(query);
    // Reset to the first page when filtering
    setCurrentPage(0);
  };

  // Slice the data based on current page and items per page
  const filteredData = getAllList?.filter(
    (item) =>
      item?.Cash_will_be_collected_by?.toLowerCase().includes(
        searchQuery.toLowerCase()
      ) ||
      item?.companyInitial?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item?.Product_supplied?.toLowerCase().includes(
        searchQuery.toLowerCase()
      ) ||
      item?.Type_of_transaction?.toLowerCase().includes(
        searchQuery.toLowerCase()
      ) ||
      item?.Approve_status?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item?.Approve_payment?.toLowerCase().includes(
        searchQuery.toLowerCase()
      ) ||
      item?.Identity_no_and_type?.toLowerCase().includes(
        searchQuery.toLowerCase()
      ) ||
      item?.Transaction_No?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item?.tableId?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item?.Payment_status?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item?.Identity_no_and_type?.toLowerCase().includes(
        searchQuery.toLowerCase()
      )
  );

  const indexOfLastItem = (currentPage + 1) * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentLists = filteredData?.slice(indexOfFirstItem, indexOfLastItem);

  return {
    getAllList,
    setGetAllList,
    getList,
    loading,
    selectedKey,
    setSelectedKey,
    selectedValue,
    setSelectedValue,
    paginate,
    handleValueChange,
    currentLists,
    noMatch,
    setNoMatch,
    user,
    filteredData,
    filterData,
    searchQuery,
    handleResetFilter,
    itemsPerPage,
  };
};
