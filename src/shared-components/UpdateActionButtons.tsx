import { GlobalContext } from "@/utils/GlobalState";
import { Spin } from "antd";
import { useContext } from "react";
import UploadAllTableReceiptModal from "./Modals/UploadAllTableReceiptModal";

type UpdateButtonTypes = {
  loadAllStatus: boolean;
  tableId: string | undefined;
  updateAllTableApproveStatus: (
    tableId: string | undefined,
    status: string
  ) => void;
  updateAllTableApprovePaymment: (
    tableId: string | undefined,
    status: string
  ) => void;
  loadAllPaymentStatus: boolean;
  loadAllConfirmPaymentStatus: boolean;
  updateAllTableConfirmPaymment: (
    tableId: string | undefined,
    status: string
  ) => void;
  loadAllTableReceipt: boolean;
  generalFile: any;
  generalFileLoader: boolean;
  generalImageUrl: string | null;
  updateAllTableReceipt: (tableId: string | undefined) => void;
  handleGeneralReceiptDelete: any;
  handleCancelGeneralRecieptModal: any;
  showGeneralReceiptModal: any;
  handleChangeReceipt: any;
  isModalReceiptOpen: boolean;
};

const UpdateActionButtons = ({
  loadAllStatus,
  updateAllTableApproveStatus,
  tableId,
  updateAllTableApprovePaymment,
  loadAllPaymentStatus,
  loadAllConfirmPaymentStatus,
  updateAllTableConfirmPaymment,
  loadAllTableReceipt,
  generalFile,
  generalFileLoader,
  generalImageUrl,
  updateAllTableReceipt,
  handleGeneralReceiptDelete,
  handleCancelGeneralRecieptModal,
  showGeneralReceiptModal,
  handleChangeReceipt,
  isModalReceiptOpen,
}: UpdateButtonTypes) => {
  const { user } = useContext(GlobalContext);

  return (
    <div className="flex gap-2 items-center flex-wrap mb-1">
      {user?.role === "Super Admin" || user?.role === "Partner" ? (
        <>
          {loadAllStatus ? (
            <button className="py-1 bg-gray-400 rounded-full text-sm  text-color-dark-font w-36">
              <Spin />
            </button>
          ) : (
            <button
              className=" py-1 bg-gray-400 rounded-full text-sm  text-color-dark-font w-36"
              onClick={() => updateAllTableApproveStatus(tableId, "Approved")}
            >
              Approve status
            </button>
          )}
        </>
      ) : null}

      {user?.role === "Super Admin" || user?.role === "TOFA Pay Admin" ? (
        <>
          {loadAllPaymentStatus ? (
            <button className="py-1 bg-gray-400 rounded-full text-sm  text-color-dark-font w-36">
              <Spin />
            </button>
          ) : (
            <button
              className=" py-1 bg-gray-400 rounded-full text-sm  text-color-dark-font w-36"
              onClick={() => updateAllTableApprovePaymment(tableId, "Approved")}
            >
              Approve payment
            </button>
          )}
        </>
      ) : user.role === "Finance" ? (
        <>
          {loadAllPaymentStatus ? (
            <button className="py-1 bg-gray-400 rounded-full text-sm  text-color-dark-font w-36">
              <Spin />
            </button>
          ) : (
            <button
              className=" py-1 bg-gray-400 rounded-full text-sm  text-color-dark-font w-36"
              onClick={() => updateAllTableApprovePaymment(tableId, "Approved")}
            >
              Approve payment
            </button>
          )}
        </>
      ) : null}

      {user?.role === "Super Admin" || user?.role === "Agent" ? (
        <button
          className=" py-1 bg-gray-400 rounded-full text-sm  text-color-dark-font w-36"
          onClick={showGeneralReceiptModal}
        >
          Upload reciept
        </button>
      ) : null}

      {user?.role === "Super Admin" || user?.role === "TOFA Pay Admin" ? (
        <>
          {loadAllConfirmPaymentStatus ? (
            <button className="py-1 bg-gray-400 rounded-full text-sm  text-color-dark-font w-36">
              <Spin />
            </button>
          ) : (
            <button
              className=" py-1 bg-gray-400 rounded-full text-sm  text-color-dark-font w-36"
              onClick={() => updateAllTableConfirmPaymment(tableId, "Paid")}
            >
              confirm payment
            </button>
          )}
        </>
      ) : user.role === "Finance" ? (
        <>
          {loadAllConfirmPaymentStatus ? (
            <button className="py-1 bg-gray-400 rounded-full text-sm  text-color-dark-font w-36">
              <Spin />
            </button>
          ) : (
            <button
              className=" py-1 bg-gray-400 rounded-full text-sm  text-color-dark-font w-36"
              onClick={() => updateAllTableConfirmPaymment(tableId, "Paid")}
            >
              confirm payment
            </button>
          )}
        </>
      ) : null}

      <UploadAllTableReceiptModal
        isModalOpen={isModalReceiptOpen}
        handleCancel={handleCancelGeneralRecieptModal}
        loadDetails={loadAllTableReceipt}
        file={generalFile}
        imageUrl={generalImageUrl}
        handleDelete={handleGeneralReceiptDelete}
        fileLoader={generalFileLoader}
        handleChange={handleChangeReceipt}
        handleSubmitReceipt={updateAllTableReceipt}
        tableId={tableId}
      />
    </div>
  );
};

export default UpdateActionButtons;
