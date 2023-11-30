import { useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { axiosInstance } from "@/shared-components/baseUrl";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useExportSchedule = () => {
  const [excelLoading, setExcelLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const exportTableToExcel = async (
    tableData: any[],
    filename: string,
    tableId: string | undefined
  ) => {
    setExcelLoading(true);
    const worksheet = XLSX.utils.json_to_sheet(tableData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const data = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(data, `${filename}.xlsx`);

    const formData = new FormData();
    formData.append("file", data, `${filename}.xlsx`);
    formData.append("tableId", tableId as string);

    try {
      await axiosInstance.patch("/create-scheduled-summary", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setExcelLoading(false);
      toast.success("You have successfully exported the schedule", {
        duration: 4000,
        style: {
          background: "#353434",
          color: "#fff",
        },
      });
    } catch (error: any) {
      console.error(error);
      setExcelLoading(false);
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

  return { exportTableToExcel, excelLoading };
};
