import { axiosInstance } from "@/shared-components/baseUrl";
import React, { useState } from "react";
import { confirmAlert } from "react-confirm-alert";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useUpdateRecieptByTableId = () => {
  const navigate = useNavigate();

  const [loadAllTableReceipt, setLoadAllTableReceipt] =
    useState<boolean>(false);
  const [successReload4, setSuccessReload4] = useState<boolean>(false);
  const [generalFile, setGeneralFile] = useState<File | null>(null);
  const [generalImageUrl, setGeneralImageUrl] = useState<string | null>(null);
  const [generalFileLoader, setGeneralFileLoader] = useState<boolean>(false);
  const [isModalReceiptOpen, setIsModalReceiptOpen] = useState(false);

  const showGeneralReceiptModal = () => {
    setIsModalReceiptOpen(true);
  };

  const handleCancelGeneralRecieptModal = () => {
    setIsModalReceiptOpen(false);
  };

  //uploading receiptd
  const handleChangeReceipt = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile =
      e.target.files && e.target.files.length > 0 ? e.target.files[0] : null;
    setGeneralFile(selectedFile);

    if (selectedFile) {
      const isJpgOrPng =
        selectedFile.type === "image/jpeg" || selectedFile.type === "image/png";
      const isLt2M = selectedFile.size / 1024 / 1024 < 1;
      if (!isJpgOrPng) {
        toast.error(`You can only upload JPG/PNG file!`, {
          duration: 4000,
          style: {
            background: "#353434",
            color: "#fff",
          },
        });
        setGeneralFile(null);
        setGeneralImageUrl(null);
      } else if (!isLt2M) {
        toast.error(`Image must be smaller than 1MB!`, {
          duration: 4000,
          style: {
            background: "#353434",
            color: "#fff",
          },
        });
        setGeneralFile(null);
        setGeneralImageUrl(null);
      }
    }
    if (selectedFile) {
      const objectUrl = URL.createObjectURL(selectedFile);
      setGeneralImageUrl(objectUrl);
    } else {
      setGeneralImageUrl(null);
    }
  };

  const handleGeneralReceiptDelete = () => {
    setGeneralFile(null);
    setGeneralImageUrl(null);
  };

  const updateAllTableReceipt = async (tableId: string | undefined) => {
    setLoadAllTableReceipt(true);

    try {
      if (generalFile) {
        const formData = new FormData();
        formData.append("image", generalFile);
        await axiosInstance.patch(
          `/upload-image-by-tableid/${tableId}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setIsModalReceiptOpen(false);
        setSuccessReload4((prev) => !prev);
        toast.success(
          "You have successfully uploaded your payment receipt for all farmers on the list",
          {
            duration: 4000,
            style: {
              background: "#353434",
              color: "#fff",
            },
          }
        );
        setLoadAllTableReceipt(false);
        setGeneralFile(null);
        setGeneralImageUrl(null);
      } else {
        setLoadAllTableReceipt(false);
        toast.error(`No file selected`, {
          duration: 4000,
          style: {
            background: "#353434",
            color: "#fff",
          },
        });
      }
    } catch (error: any) {
      setGeneralFileLoader(false);
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
    loadAllTableReceipt,
    successReload4,
    generalFile,
    generalFileLoader,
    generalImageUrl,
    updateAllTableReceipt,
    handleGeneralReceiptDelete,
    handleCancelGeneralRecieptModal,
    showGeneralReceiptModal,
    handleChangeReceipt,
    isModalReceiptOpen,
  };
};
