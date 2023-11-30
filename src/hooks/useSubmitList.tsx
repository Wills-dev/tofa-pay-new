import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import * as XLSX from "xlsx";
import toast from "react-hot-toast";
import { confirmAlert } from "react-confirm-alert";

import { ExcelDataType } from "@/types/types";
import { axiosInstance } from "@/shared-components/baseUrl";
import { excelDateToJavaScriptDate } from "@/helpers/helperFunctions";
import { GlobalContext } from "@/utils/GlobalState";

export const useSubmitList = () => {
  const navigate = useNavigate();
  const { user } = useContext(GlobalContext);

  const [excelList, setExcelList] = useState<ExcelDataType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const deleteRow = (index: number) => {
    if (index >= 0 && index < excelList.length) {
      const newExcelFile = [...excelList];
      newExcelFile.splice(index, 1);
      setExcelList(newExcelFile);
    }
  };

  const handleDeleteRow = (index: number) => {
    confirmAlert({
      title: "Confirm Delete",
      message: "Are you sure you want to delete row?",
      buttons: [
        {
          label: "Yes",
          onClick: (e) => deleteRow(index),
        },
        {
          label: "No",
        },
      ],
    });
  };

  const readExcel = (file: any) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = (e: any) => {
        const bufferArray = e.target.result;

        const wb = XLSX.read(bufferArray, { type: "buffer" });

        const wsname = wb.SheetNames[0];

        const ws = wb.Sheets[wsname];

        const data = XLSX.utils.sheet_to_json(ws);

        resolve(data);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });

    promise.then((data: any) => {
      setExcelList(data);
    });
  };

  const handleExcelFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      readExcel(file);
    }
  };

  const handleExcelSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setLoading(true);

    const listData = excelList?.map((item) => ({
      ...item,
      Date_of_delivery: excelDateToJavaScriptDate(item.Date_of_delivery),
      Type_of_transaction: item?.Type_of_transaction?.toString(),
      Location: item?.Location?.toString(),
      Transaction_No: item?.Transaction_No?.toString(),
      Mode_of_payment: item?.Mode_of_payment?.toString(),
      Contact_No: item?.Contact_No?.toString(),
      Identity_no_and_type: item?.Identity_no_and_type?.toString(),
      Cash_will_be_collected_by: item?.Cash_will_be_collected_by?.toString(),
      Supplier_name: item?.Supplier_name?.toString(),
      Supplier_invoice_No: item?.Supplier_invoice_No?.toString(),
      Product_supplied: item?.Product_supplied?.toString(),
      Damage_bags_cost: item?.Damage_bags_cost?.toString(),
      Partner_email: item?.Partner_email?.toString(),
      Total_amount_payable: Number(item?.Total_amount_payable),
      Price: Number(item?.Price),
      companyName: user?.companyInitial ? user?.companyInitial : "None",
      companyInitial: user?.companyInitial ? user?.companyInitial : "None",
      Amount_to_be_paid_to_Supplier: Number(
        item?.Amount_to_be_paid_to_Supplier
      ),
      Name: `${user?.firstName} ${user?.lastName}`,
    }));

    try {
      const excelDetails = {
        listData: listData,
      };

      await axiosInstance.post("/create-list", excelDetails);
      toast.success("You have successfully uploaded list", {
        duration: 4000,
        style: {
          background: "#353434",
          color: "#fff",
        },
      });
      setLoading(false);
      setTimeout(() => {
        navigate("/lists");
      }, 3000);
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

  return {
    handleExcelFileChange,
    loading,
    handleExcelSubmit,
    excelList,
    handleDeleteRow,
  };
};
