import { GlobalContext } from "@/utils/GlobalState";
import { useContext, useState } from "react";
import { ScheduleData } from "@/types/types";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "@/shared-components/baseUrl";
import toast from "react-hot-toast";

export const useGetAllScheduleTables = () => {
  const { user } = useContext(GlobalContext);
  const [allScheduleTable, setAllScheduleTables] = useState<ScheduleData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 10;

  const navigate = useNavigate();

  const getAllScheduleTables = async () => {
    try {
      const data = await axiosInstance.get(`/get-scheduled-tables`);
      const allScheduleTables = data.data.filteredData;
      if (user.role === "Partner" || user.role === "Partner Agents") {
        const filterPartnerList = data.data.filteredData?.filter(
          (list: ScheduleData) => list.companyInitial === user?.companyInitial
        );
        setAllScheduleTables(filterPartnerList);
      } else {
        setAllScheduleTables(allScheduleTables);
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
  const filteredData = allScheduleTable?.filter(
    (item: ScheduleData) =>
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
  const currentScheduled = filteredData?.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  return {
    allScheduleTable,
    currentScheduled,
    itemsPerPage,
    searchQuery,
    filteredData,
    filterData,
    loading,
    getAllScheduleTables,
    user,
    paginate,
  };
};
