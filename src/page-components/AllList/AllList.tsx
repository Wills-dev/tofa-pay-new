import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import toast, { Toaster } from "react-hot-toast";
import ReactPaginate from "react-paginate";
import { BsSearch, BsThreeDotsVertical } from "react-icons/bs";
import { BiFilter } from "react-icons/bi";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";

import { axiosInstance } from "@/shared-components/baseUrl";
import DashboardNavBar from "@/shared-components/DashboardNavBar";
import Header from "@/shared-components/Header";
import { AppContext } from "@/utils/AppState";

import { useGetAllNotPaidList } from "@/hooks/useGetAllNotPaidList";
import { useApproveStatus } from "@/hooks/useApproveStatus";
import { useApprovePayment } from "@/hooks/useApprovePayment";
import { useDeleteListRow } from "@/hooks/useDeleteListRow";
import { useGetListRowDetails } from "@/hooks/useGetListRowDetails";
import { useConfirmPayment } from "@/hooks/useConfirmPayment";
import {
  convertDateFormat,
  formatName,
  numberWithCommas,
} from "@/helpers/helperFunctions";
import ListLoader from "@/shared-components/SkeletonLoader/ListLoader";
import TableEmptyState from "@/shared-components/TableEmptyState";
import UploadRecieptModal from "@/shared-components/Modals/UploadRecieptModal";
import ListActionDropdown from "@/shared-components/ListActionDropdown";
import { ProtectedRoutes } from "@/utils/ProtectedRoutes";

const AllList: React.FC = () => {
  const { activeMenu } = useContext(AppContext);

  const navigate = useNavigate();

  const [active, setActive] = useState(false);
  const [show, setShow] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [fileLoader, setFileLoader] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rerenderFour, setRerenderFour] = useState<boolean>(true);

  const { submitStatusApproval, approveStatusLoader, rerender } =
    useApproveStatus();
  const { handlePaymentApproval, approvePaymentLoader, rerenderThree } =
    useApprovePayment();
  const { handlePayment, paymentStatusLoader, rerenderOne } =
    useConfirmPayment();
  const { submit, deleteLoader, rerenderTwo } = useDeleteListRow();
  const { listDetails, getListDetails, loadDetails } = useGetListRowDetails();

  const {
    getAllList,
    getList,
    loading,
    selectedKey,
    setSelectedKey,
    selectedValue,
    paginate,
    handleValueChange,
    currentLists,
    setNoMatch,
    user,
    filteredData,
    filterData,
    searchQuery,
    handleResetFilter,
    itemsPerPage,
  } = useGetAllNotPaidList();

  const handleShowUserActions = (id: string) => {
    setShow(id);
    setActive((current) => !current);
  };

  const showModal = (listId: string) => {
    setIsModalOpen(true);
    getListDetails(listId);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  //uploading receiptd
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile =
      e.target.files && e.target.files.length > 0 ? e.target.files[0] : null;
    setFile(selectedFile);

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
        setFile(null);
        setImageUrl(null);
      } else if (!isLt2M) {
        toast.error(`Image must be smaller than 1MB!`, {
          duration: 4000,
          style: {
            background: "#353434",
            color: "#fff",
          },
        });
        setFile(null);
        setImageUrl(null);
      }
    }
    if (selectedFile) {
      const objectUrl = URL.createObjectURL(selectedFile);
      setImageUrl(objectUrl);
    } else {
      setImageUrl(null);
    }
  };

  const handleDelete = () => {
    setFile(null);
    setImageUrl(null);
  };

  // submit proof of payment
  const handleSubmitReceipt = async (rowId: string) => {
    setFileLoader(true);
    try {
      if (file) {
        const formData = new FormData();
        formData.append("image", file);
        await axiosInstance.post(`/image-upload/${rowId}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        setIsModalOpen(false);
        setRerenderFour((prev) => !prev);
        toast.success("You have successfully uploaded your payment receipt", {
          duration: 4000,
          style: {
            background: "#353434",
            color: "#fff",
          },
        });
        setFileLoader(false);
        setFile(null);
        setImageUrl(null);
      } else {
        setFileLoader(false);
        toast.error(`No file selected`, {
          duration: 4000,
          style: {
            background: "#353434",
            color: "#fff",
          },
        });
      }
    } catch (error: any) {
      setFileLoader(false);
      console.log(error);
      if (!error.response.data.Error) {
        return navigate(`/no-connection`);
      }
      toast.error(`${error.response.data.Error}`, {
        duration: 4000,
        style: {
          background: "#353434",
          color: "#fff",
        },
      });
    }
  };

  useEffect(() => {
    getList();
    if (filteredData?.length < 1) {
      setNoMatch(true);
    } else if (filteredData?.length > 0) {
      setNoMatch(false);
    } else {
      setNoMatch(false);
    }
  }, [user, rerender, rerenderOne, rerenderTwo, rerenderThree, rerenderFour]);

  return (
    <>
      <div className={` bg-main-bg min-h-screen  flex-1 w-full`}>
        <Toaster />
        <div className={`${activeMenu ? ` md:ml-72 ` : `flex-2`}`}>
          <div className="fixed md:static bg-main-bg navbar w-full">
            <DashboardNavBar />
          </div>
          <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl pt-20 max-sm:mt-0">
            <Header category="List" title="All Lists" />
            {loading ? (
              <ListLoader />
            ) : (
              <>
                <div className="flex justify-between items-center flex-wrap gap-5">
                  <div className="flex items-center gap-4 flex-wrap">
                    <div className="flex items-center gap-2">
                      <label
                        htmlFor="filter"
                        className="text-gray-400 flex items-center"
                      >
                        Filter by
                        <span className="ml-2 text-xl text-primary-color">
                          <BiFilter />
                        </span>
                      </label>
                      <select
                        value={selectedKey}
                        onChange={(e) => setSelectedKey(e.target.value)}
                        id="filter"
                        className="h-11 w-40 border rounded-lg px-2 outline-none overflow-x-auto text-gray-400"
                      >
                        <option value="">Select</option>
                        {Object.keys((getAllList && getAllList[0]) ?? {}).map(
                          (key) => (
                            <option key={key} value={key}>
                              {formatName(key)}
                            </option>
                          )
                        )}
                      </select>
                    </div>
                    {selectedKey && (
                      <div className="flex items-center gap-1">
                        <select
                          value={selectedValue}
                          onChange={handleValueChange}
                          className="h-11 w-52 border rounded-lg outline-none overflow-x-auto px-1 text-gray-400"
                        >
                          <option value="">Select a value</option>
                          {Array.from(
                            new Set(
                              getAllList?.map((item: any) => item[selectedKey])
                            )
                          ).map((value: any) => (
                            <option key={value} value={value}>
                              {value}
                            </option>
                          ))}
                        </select>
                        <button
                          className="bg-gray-400 px-3 py-1 rounded-full text-sm text-color-dark-font"
                          onClick={handleResetFilter}
                        >
                          Reset
                        </button>
                      </div>
                    )}
                  </div>
                  <form className="flex items-center gap-2 border shadow-md rounded-lg w-80 h-12 px-2 focus-within:border-primary-color">
                    <div className="text-primary-color text">
                      <BsSearch />
                    </div>
                    <input
                      type="search"
                      value={searchQuery}
                      onChange={(e) => filterData(e.target.value)}
                      className="outline-none h-full flex-1"
                    />
                  </form>
                </div>
                {currentLists?.length < 1 ? (
                  <>
                    {searchQuery && filteredData?.length < 1 ? (
                      <TableEmptyState
                        title="No list matched your search. Try searching for something
                      else"
                      />
                    ) : (
                      <TableEmptyState title="Monitor all list and update the status of each row here" />
                    )}
                  </>
                ) : (
                  <div className="mt-12 ">
                    <div
                      className={` max-w-full w-full relative  overflow-x-auto pb-5 bg-white max-h-[85vh] `}
                    >
                      <table className=" rounded-xl border-collapse">
                        <thead>
                          <tr className="max-sm:text-sm">
                            <th className="bg-gray-100 border-b text-left px-4 py-4 rounded-tl-xl whitespace-nowrap z-50 left-0 font-semibold  max-sm:hidden">
                              S/N
                            </th>
                            <th className="bg-gray-100 border-b text-left px-4 py-4 whitespace-nowrap font-semibold z-10">
                              Table ID
                            </th>
                            <th className="bg-gray-100 border-b text-left px-4 py-4 whitespace-nowrap font-semibold z-10">
                              Date of delivery
                            </th>
                            <th className="bg-gray-100 border-b text-left px-4 py-4 whitespace-nowrap font-semibold z-10">
                              Transaction_No.
                            </th>
                            <th className="bg-gray-100 border-b text-left px-4 py-4 whitespace-nowrap font-semibold z-10">
                              Identity No. and Type
                            </th>
                            <th className="bg-gray-100 border-b text-left px-4 py-4 whitespace-nowrap font-semibold z-10">
                              Cash Collected by
                            </th>
                            <th className="bg-gray-100 border-b text-left px-4 py-4 whitespace-nowrap font-semibold z-10">
                               Quantity supplied
                            </th>
                            <th className="bg-gray-100 border-b text-left px-4 py-4 whitespace-nowrap font-semibold z-10">
                              Price
                            </th>
                            <th className="bg-gray-100 border-b text-left px-4 py-4 whitespace-nowrap font-semibold z-10">
                              Total amount payable
                            </th>
                            <th className="bg-gray-100 border-b text-left px-4 py-4 whitespace-nowrap font-semibold z-10">
                              Amount to be paid to Supplier
                            </th>
                            <th className="bg-gray-100 border-b text-left px-4 py-4 whitespace-nowrap font-semibold z-10">
                                Company
                            </th>
                            <th className="bg-gray-100 border-b  px-4 py-4 whitespace-nowrap font-semibold text-center z-10">
                                Status
                            </th>
                            <th className="bg-gray-100 border-b text-left px-4 py-4 whitespace-nowrap font-semibold z-10">
                                Approve payment
                            </th>
                            <th className="bg-gray-100 border-b text-left px-4 py-4 whitespace-nowrap font-semibold z-10">
                                Payment receipt
                            </th>
                            <th className="bg-gray-100 border-b  px-4 py-4 whitespace-nowrap font-semibold text-center z-10">
                                Payment status
                            </th>
                            <th className="bg-gray-100 border-b text-left px-4 py-4 whitespace-nowrap rounded-tr-xl font-semibold sticky right-0 z-50 ">
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {currentLists?.map((data, index) => (
                            <tr
                              className="hover:bg-gray-50 focus:bg-gray-300 active:bg-red-200  text-sm"
                              tabIndex={0}
                              key={index}
                            >
                              <td className="border-b px-4 py-4 whitespace-nowrap sticky left-0 bg-white border-r max-sm:hidden">
                                {index + 1}
                              </td>
                              <td className="border-b px-4 py-4 whitespace-nowrap text-gray-500">
                                {data?.tableId && data?.tableId}
                              </td>
                              <td className="border-b px-4 py-4 whitespace-nowrap text-gray-500">
                                {data?.Date_of_delivery &&
                                  convertDateFormat(data.Date_of_delivery)}
                              </td>
                              <td className="border-b px-4 py-4 whitespace-nowrap text-gray-500">
                                {data?.Transaction_No && data.Transaction_No}
                              </td>
                              <td className="border-b px-4 py-4 whitespace-nowrap text-gray-500">
                                {data?.Identity_no_and_type &&
                                  data.Identity_no_and_type}
                              </td>
                              <td className="border-b px-4 py-4 whitespace-nowrap text-gray-500">
                                {data?.Cash_will_be_collected_by &&
                                  data.Cash_will_be_collected_by}
                              </td>
                              <td className="border-b px-4 py-4 whitespace-nowrap text-gray-500">
                                {data?.Quantity_supplied &&
                                  numberWithCommas(data.Quantity_supplied)}
                              </td>
                              <td className="border-b px-4 py-4 whitespace-nowrap text-gray-500">
                                {data?.user?.currency && data?.user?.currency}{" "}
                                {data?.Price && numberWithCommas(data.Price)}
                              </td>
                              <td className="border-b px-4 py-4 whitespace-nowrap text-gray-500">
                                {data?.user?.currency && data?.user?.currency}{" "}
                                {data?.Total_amount_payable &&
                                  numberWithCommas(data.Total_amount_payable)}
                              </td>
                              <td className="border-b px-4 py-4 whitespace-nowrap text-gray-500">
                                {data?.user?.currency && data?.user?.currency}{" "}
                                {data?.Amount_to_be_paid_to_Supplier &&
                                  numberWithCommas(
                                    data.Amount_to_be_paid_to_Supplier
                                  )}
                              </td>
                              <td className="border-b px-4 py-4 whitespace-nowrap text-gray-500 text-center">
                                {data?.companyInitial && data.companyInitial}
                              </td>
                              <td className="border-b px-4 py-4 whitespace-nowrap text-gray-500">
                                <p
                                  className={`${
                                    data?.Approve_status === "Pending"
                                      ? "bg-[#fff4e5] text-[#fec90f]"
                                      : "bg-[#d6f9e3] text-[#03d754]"
                                  } flex justify-center items-center w-28 h-7 rounded-full`}
                                >
                                  {data?.Approve_status && data.Approve_status}
                                </p>
                              </td>
                              <td
                                className={` border-b px-4 py-4 whitespace-nowrap text-gray-500 max-sm:px-2`}
                              >
                                <p
                                  className={`${
                                    data?.Approve_payment === "Pending"
                                      ? "bg-[#fff4e5] text-[#fec90f]"
                                      : data?.Approve_payment === "Not-Approved"
                                      ? "bg-[#facbc5] text-[#e46a76]"
                                      : "bg-[#d6f9e3] text-[#03d754]"
                                  } flex justify-center items-center w-28 h-7 rounded-full`}
                                >
                                  {data?.Approve_payment &&
                                  data.Approve_payment === "Not-Approved"
                                    ? "Not Approved"
                                    : data.Approve_payment}
                                </p>
                              </td>
                              <td className="border-b px-4 py-4 whitespace-nowrap text-gray-500 text-center">
                                {data?.Payment_receipt ? (
                                  <a
                                    href={`${data?.Payment_receipt}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-400 underline"
                                  >
                                    View receipt
                                  </a>
                                ) : (
                                  <p>None</p>
                                )}
                              </td>
                              <td className="border-b px-4 py-4 whitespace-nowrap text-gray-500">
                                <p
                                  className={`${
                                    data?.Payment_status === "Not Paid"
                                      ? "border-[#e46a76]  text-[#e46a76]"
                                      : "border-[#03d754] text-[#03d754]"
                                  } flex justify-center items-center w-28 h-7 rounded-full border-1`}
                                >
                                  {data?.Payment_status && data.Payment_status}
                                </p>
                              </td>
                              <td className="border-b py-4 whitespace-nowrap sticky right-0   border-r bg-white ">
                                <div className="h-full flex justify-center items-center relative ">
                                  <button
                                    onClick={(e) =>
                                      handleShowUserActions(data.id)
                                    }
                                    className="px-2"
                                  >
                                    <BsThreeDotsVertical />
                                  </button>
                                  <ListActionDropdown
                                    rowId={data.id}
                                    show={show}
                                    active={active}
                                    index={index}
                                    approveStatusLoader={approveStatusLoader}
                                    status={data?.Approve_status}
                                    submitStatusApproval={submitStatusApproval}
                                    paymentStatus={data?.Approve_payment}
                                    approvePaymentLoader={approvePaymentLoader}
                                    paymentStatusLoader={paymentStatusLoader}
                                    showModal={showModal}
                                    handlePayment={handlePayment}
                                    handlePaymentApproval={
                                      handlePaymentApproval
                                    }
                                    deleteLoader={deleteLoader}
                                    submit={submit}
                                    receipt={data?.Payment_receipt}
                                  />
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {currentLists?.length > 0 && (
                      <ReactPaginate
                        previousLabel={<MdArrowBackIos />}
                        nextLabel={<MdArrowForwardIos />}
                        breakLabel={"..."}
                        breakClassName={"break-me"}
                        pageCount={Math.ceil(
                          filteredData.length / itemsPerPage
                        )}
                        marginPagesDisplayed={1}
                        pageRangeDisplayed={4}
                        onPageChange={paginate}
                        containerClassName={"pagination"}
                        activeClassName={"active"}
                        pageLinkClassName={"pageAnchor"}
                        disabledClassName="disabledClass"
                        disabledLinkClassName="disabledClass"
                      />
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      <UploadRecieptModal
        isModalOpen={isModalOpen}
        handleCancel={handleCancel}
        loadDetails={loadDetails}
        file={file}
        imageUrl={imageUrl}
        handleDelete={handleDelete}
        fileLoader={fileLoader}
        handleChange={handleChange}
        handleSubmitReceipt={handleSubmitReceipt}
        rowId={listDetails.id}
      />
    </>
  );
};

export default ProtectedRoutes(AllList, [
  "TOFA Pay Admin",
  "Finance",
  "Agent",
  "Compliance",
  "Partner Agents",
  "Super Admin",
  "Partner",
]);
