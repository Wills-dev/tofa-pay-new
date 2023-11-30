import { axiosInstance } from "@/shared-components/baseUrl";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface ScheduleData {
  email: string;
  name: string;
  createdAt: any;
  id: string;
  tableId: string;
  userId: string;
  excelFile: string;
  companyInitial: string;
  companyEmail: any;
  user: any;
}

export const useGetAllExportedScheduleTable = () => {
  const [selectedKey, setSelectedKey] = useState<string>("");
  const [selectedValue, setSelectedValue] = useState<string>("");
  const [getAllSchedule, setGetAllSchedule] = useState<ScheduleData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 10;

  const navigate = useNavigate();

  const getExportedSchedule = async () => {
    try {
      const data = await axiosInstance.get(
        `get-shedule-summary-after-schedule`
      );
      setGetAllSchedule(data.data.lists);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
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

  const handleResetFilter = () => {
    getExportedSchedule();
    setSelectedKey("");
  };

  const handleValueChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedValue(value);

    const newArray = getAllSchedule?.filter(
      (item: ScheduleData) => item[selectedKey as keyof ScheduleData] === value
    );
    if (newArray) {
      setGetAllSchedule(newArray);
    }
  };

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
  const filteredData = getAllSchedule?.filter(
    (item: ScheduleData) =>
      item?.user?.lastName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item?.user?.firstName
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      item?.user?.companyInitial
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      item?.id?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastItem = (currentPage + 1) * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentScheduled = filteredData?.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  return {
    getAllSchedule,
    currentScheduled,
    itemsPerPage,
    searchQuery,
    filteredData,
    filterData,
    loading,
    getExportedSchedule,
    paginate,
    handleValueChange,
    selectedValue,
    setSelectedKey,
    selectedKey,
    handleResetFilter,
  };
};
