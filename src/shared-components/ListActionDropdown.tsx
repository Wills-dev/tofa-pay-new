import React, { useContext } from "react";
import { AiOutlineCloudUpload, AiOutlineFolderView } from "react-icons/ai";
import {
  MdDelete,
  MdOutlineDisabledByDefault,
  MdOutlinePaid,
} from "react-icons/md";
import { Link } from "react-router-dom";
import ListButtonSpinner from "./ListButtonSpinner";
import { GlobalContext } from "@/utils/GlobalState";
import { FiUserCheck } from "react-icons/fi";
import { BsCheck2Circle } from "react-icons/bs";

type DropdownTypes = {
  rowId: string;
  show: string;
  active: boolean;
  index: number;
  approveStatusLoader: boolean;
  status: string;
  paymentStatus: string;
  submitStatusApproval: (rowId: string, status: string) => void;
  approvePaymentLoader: boolean;
  handlePaymentApproval: (
    rowId: string,
    approvePaymentStatus: "Approved" | "Not-Approved"
  ) => Promise<void>;
  showModal: (id: string) => void;
  paymentStatusLoader: boolean;
  handlePayment: (rowId: string, status: string) => void;
  deleteLoader: boolean;
  submit: (rowId: string) => void;
  receipt: string | null;
};

const ListActionDropdown = ({
  rowId,
  show,
  active,
  index,
  approveStatusLoader,
  status,
  submitStatusApproval,
  paymentStatus,
  approvePaymentLoader,
  handlePaymentApproval,
  showModal,
  paymentStatusLoader,
  handlePayment,
  submit,
  deleteLoader,
  receipt,
}: DropdownTypes) => {
  const { user } = useContext(GlobalContext);

  return (
    <div
      className={`absolute rounded-md right-20   bg-white border-gray-200 border-1 shadow-md ${
        rowId === show && active ? "block" : "hidden"
      } ${
        index + 1 === 10 ? "-bottom-3" : index + 1 === 9 ? "-bottom-3" : "top-4"
      }`}
    >
      {user?.role === "Super Admin" ? (
        <div className="relative flex flex-col py-3 bg-white">
          {/* approve status of list done by partner*/}
          {status === "Pending" && (
            <>
              {approveStatusLoader ? (
                <ListButtonSpinner />
              ) : (
                <button
                  className="items-center flex gap-1 text-xs px-2 hover:bg-gray-100 py-1 text-gray-600"
                  onClick={() => submitStatusApproval(rowId, "Approved")}
                >
                  <span className="text-[#2095F2] text-sm ">
                    <FiUserCheck />
                  </span>
                  <span>Approve status</span>
                </button>
              )}
            </>
          )}

          {/* approve payment status done  by finance or admin */}
          {paymentStatus === "Pending" || paymentStatus === "Not-Approved" ? (
            <>
              {approvePaymentLoader ? (
                <ListButtonSpinner />
              ) : (
                <button
                  className="items-center flex gap-1 text-xs px-2 hover:bg-gray-100 py-1 text-gray-600"
                  onClick={() => handlePaymentApproval(rowId, "Approved")}
                >
                  <span className="text-[#2095F2] text-sm ">
                    <BsCheck2Circle />
                  </span>
                  <span>Approve payment</span>
                </button>
              )}
            </>
          ) : (
            <>
              {approvePaymentLoader ? (
                <ListButtonSpinner />
              ) : (
                <button
                  className="items-center flex gap-1 text-xs px-2 hover:bg-gray-100 py-1 text-[#e46a76]"
                  onClick={() => handlePaymentApproval(rowId, "Not-Approved")}
                >
                  <span className=" text-sm ">
                    <MdOutlineDisabledByDefault />
                  </span>
                  <span>Decline payment</span>
                </button>
              )}
            </>
          )}
          <button
            className="items-center flex gap-1 text-xs px-2 hover:bg-gray-100 py-1  text-gray-600"
            onClick={() => showModal(rowId)}
          >
            <span className="text-sm text-[#2095F2]">
              <AiOutlineCloudUpload />
            </span>
            {receipt === null ? (
              <span>Upload reciept</span>
            ) : (
              <span>Edit reciept</span>
            )}
          </button>
          <>
            {paymentStatusLoader ? (
              <ListButtonSpinner />
            ) : (
              <button
                className="items-center flex gap-1 text-xs px-2 hover:bg-gray-100 py-1  text-gray-600"
                onClick={() => handlePayment(rowId, "Paid")}
              >
                <span className="text-sm text-[#2095F2]">
                  <MdOutlinePaid />
                </span>
                <span>Confirm payment</span>
              </button>
            )}
          </>

          <Link
            to={`/lists/details/${rowId}`}
            className="items-center flex gap-1 text-xs px-2 hover:bg-gray-100 py-1 text-gray-600 "
          >
            <span className="text-sm text-[#2095F2]">
              <AiOutlineFolderView />
            </span>
            <span>View details</span>
          </Link>
          {deleteLoader ? (
            <ListButtonSpinner />
          ) : (
            <button
              className="items-center flex gap-1 text-xs px-2 hover:bg-gray-100 py-1 text-[#e46a76]"
              onClick={() => submit(rowId)}
            >
              <span className="text-sm">
                <MdDelete />
              </span>
              <span>Delete farmer</span>
            </button>
          )}
        </div>
      ) : user?.role === "TOFA Pay Admin" || user?.role === "Finance" ? (
        <div className="relative flex flex-col py-3 bg-white">
          {/* approve payment status done  by finance or admin */}
          {paymentStatus === "Pending" || paymentStatus === "Not-Approved" ? (
            <>
              {approvePaymentLoader ? (
                <ListButtonSpinner />
              ) : (
                <button
                  className="items-center flex gap-1 text-xs px-2 hover:bg-gray-100 py-1 text-gray-600"
                  onClick={() => handlePaymentApproval(rowId, "Approved")}
                >
                  <span className="text-[#2095F2] text-sm ">
                    <BsCheck2Circle />
                  </span>
                  <span>Approve payment</span>
                </button>
              )}
            </>
          ) : (
            <>
              {approvePaymentLoader ? (
                <ListButtonSpinner />
              ) : (
                <button
                  className="items-center flex gap-1 text-xs px-2 hover:bg-gray-100 py-1 text-[#e46a76]"
                  onClick={() => handlePaymentApproval(rowId, "Not-Approved")}
                >
                  <span className=" text-sm ">
                    <MdOutlineDisabledByDefault />
                  </span>
                  <span>Decline payment</span>
                </button>
              )}
            </>
          )}
          s
          <>
            {paymentStatusLoader ? (
              <ListButtonSpinner />
            ) : (
              <button
                className="items-center flex gap-1 text-xs px-2 hover:bg-gray-100 py-1  text-gray-600"
                onClick={() => handlePayment(rowId, "Paid")}
              >
                <span className="text-sm text-[#2095F2]">
                  <MdOutlinePaid />
                </span>
                <span>Confirm payment</span>
              </button>
            )}
          </>
          <Link
            to={`/lists/details/${rowId}`}
            className="items-center flex gap-1 text-xs px-2 hover:bg-gray-100 py-1 text-gray-600 "
          >
            <span className="text-sm text-[#2095F2]">
              <AiOutlineFolderView />
            </span>
            <span>View details</span>
          </Link>
          {deleteLoader ? (
            <ListButtonSpinner />
          ) : (
            <button
              className="items-center flex gap-1 text-xs px-2 hover:bg-gray-100 py-1 text-[#e46a76]"
              onClick={() => submit(rowId)}
            >
              <span className="text-sm">
                <MdDelete />
              </span>
              <span>Delete farmer</span>
            </button>
          )}
        </div>
      ) : user?.role === "Partner" ? (
        <div className="relative flex flex-col py-3 bg-white">
          {/* approve status of list done by partner*/}
          {status === "Pending" && (
            <>
              {approveStatusLoader ? (
                <ListButtonSpinner />
              ) : (
                <button
                  className="items-center flex gap-1 text-xs px-2 hover:bg-gray-100 py-1 text-gray-600"
                  onClick={() => submitStatusApproval(rowId, "Approved")}
                >
                  <span className="text-[#2095F2] text-sm ">
                    <FiUserCheck />
                  </span>
                  <span>Approve status</span>
                </button>
              )}
            </>
          )}
          <Link
            to={`/lists/details/${rowId}`}
            className="items-center flex gap-1 text-xs px-2 hover:bg-gray-100 py-1 text-gray-600 "
          >
            <span className="text-sm text-[#2095F2]">
              <AiOutlineFolderView />
            </span>
            <span>View details</span>
          </Link>
          {deleteLoader ? (
            <ListButtonSpinner />
          ) : (
            <button
              className="items-center flex gap-1 text-xs px-2 hover:bg-gray-100 py-1 text-[#e46a76]"
              onClick={() => submit(rowId)}
            >
              <span className="text-sm">
                <MdDelete />
              </span>
              <span>Delete farmer</span>
            </button>
          )}
        </div>
      ) : user?.role === "Agent" ? (
        <div className="relative flex flex-col py-3 bg-white">
          <button
            className="items-center flex gap-1 text-xs px-2 hover:bg-gray-100 py-1  text-gray-600"
            onClick={() => showModal(rowId)}
          >
            <span className="text-sm text-[#2095F2]">
              <AiOutlineCloudUpload />
            </span>
            {receipt === null ? (
              <span>Upload reciept</span>
            ) : (
              <span>Edit reciept</span>
            )}
          </button>
          <Link
            to={`/lists/details/${rowId}`}
            className="items-center flex gap-1 text-xs px-2 hover:bg-gray-100 py-1 text-gray-600 "
          >
            <span className="text-sm text-[#2095F2]">
              <AiOutlineFolderView />
            </span>
            <span>View details</span>
          </Link>
        </div>
      ) : (
        <div className="relative flex flex-col py-3 bg-white">
          <Link
            to={`/lists/details/${rowId}`}
            className="items-center flex gap-1 text-xs px-2 hover:bg-gray-100 py-1 text-gray-600 "
          >
            <span className="text-sm text-[#2095F2]">
              <AiOutlineFolderView />
            </span>
            <span>View details</span>
          </Link>
        </div>
      )}
    </div>
  );
};

export default ListActionDropdown;
