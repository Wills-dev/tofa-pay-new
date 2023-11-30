import { convertDateFormat } from "@/helpers/helperFunctions";
import { useGetAllDispute } from "@/hooks/useGetAllDispute";
import DashboardNavBar from "@/shared-components/DashboardNavBar";
import Header from "@/shared-components/Header";
import { Sidebar } from "@/shared-components/Sidebar";
import ListLoader from "@/shared-components/SkeletonLoader/ListLoader";
import { AppContext } from "@/utils/AppState";
import { useContext, useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { AiOutlineFolderView } from "react-icons/ai";
import { BsSearch, BsThreeDotsVertical } from "react-icons/bs";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import ReactPaginate from "react-paginate";
import { DisputeType } from "@/types/types";
import DisputeDetailsModal from "@/shared-components/Modals/DisputeDetailsModal";
import CreateDisputeModal from "@/shared-components/Modals/CreateDisputeModal";
import { ProtectedRoutes } from "@/utils/ProtectedRoutes";

const Dispute = () => {
  const { activeMenu } = useContext(AppContext);
  const [active, setActive] = useState(false);
  const [show, setShow] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [createDisputeModal, setCreateDisputeModal] = useState<boolean>(false);
  const {
    currentItems,
    itemsPerPage,
    isLoading,
    allDispute,
    currentPage,
    setNoMatch,
    filterData,
    filteredData,
    paginate,
    user,
  } = useGetAllDispute();

  const handleCancelCreateModal = () => {
    setCreateDisputeModal(false);
  };

  const showCreateDisputeModal = () => {
    setCreateDisputeModal(true);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleShowUserActions = (id: string) => {
    setShow(id);
    setActive((current) => !current);
  };

  useEffect(() => {
    if (filteredData?.length < 1) {
      setNoMatch(true);
    } else if (filteredData?.length > 0) {
      setNoMatch(false);
    } else {
      setNoMatch(false);
    }
  }, [filteredData]);

  return (
    <div className={` bg-main-bg min-h-screen  flex-1 w-full`}>
      <Toaster />
      <div className={`${activeMenu ? ` md:ml-72 ` : `flex-2`}`}>
        <div className="fixed md:static bg-main-bg navbar w-full">
          <DashboardNavBar />
        </div>
        <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl pt-20 max-sm:mt-0">
          <Header category="Dispute" title="All disputes" />
          {isLoading ? (
            <ListLoader />
          ) : (
            <>
              <div className="flex justify-between items-center flex-wrap gap-5">
                <form className="flex items-center gap-2 border shadow-md rounded-lg w-80 h-12 px-2 focus-within:border-primary-color">
                  <div className="text-primary-color text">
                    <BsSearch />
                  </div>
                  <input type="search" className="outline-none h-full flex-1" />
                </form>
                <button
                  className="bg-primary-color text-color-dark-font py-2 px-4 rounded hover:bg-secondary-color whitespace-nowrap"
                  onClick={showCreateDisputeModal}
                >
                  Create dispute
                </button>
                <CreateDisputeModal
                  isModalOpen={createDisputeModal}
                  handleCancel={handleCancelCreateModal}
                />
              </div>
              <div className="mt-12 ">
                <div
                  className={` max-w-full w-full relative  overflow-x-auto pb-5 bg-white max-h-[85vh] `}
                >
                  <table className=" rounded-xl border-collapse w-full">
                    <thead>
                      <tr className="max-sm:text-sm">
                        <th className="bg-gray-100 border-b text-center px-4 py-4 rounded-tl-xl whitespace-nowrap z-50 left-0 font-semibold  ">
                          S/N
                        </th>
                        <th className="bg-gray-100 border-b text-left px-4 py-4 whitespace-nowrap font-semibold z-10">
                          Date joined
                        </th>
                        <th className="bg-gray-100 border-b text-left px-4 py-4 whitespace-nowrap font-semibold z-10">
                          Name
                        </th>
                        <th className="bg-gray-100 border-b text-left px-4 py-4 whitespace-nowrap font-semibold z-10">
                          Email
                        </th>
                        <th className="bg-gray-100 border-b text-center px-4 py-4 whitespace-nowrap font-semibold z-10">
                            Company
                        </th>
                        <th className="bg-gray-100 border-b text-center px-4 py-4 whitespace-nowrap font-semibold z-10">
                          Role
                        </th>
                        <th className="bg-gray-100 border-b text-center px-4 py-4 whitespace-nowrap font-semibold z-10">
                          Subject
                        </th>
                        <th className="bg-gray-100 border-b text-center px-4 py-4 whitespace-nowrap font-semibold z-10">
                          Status
                        </th>
                        <th className="bg-gray-100 border-b text-center px-4 py-4 whitespace-nowrap rounded-tr-xl font-semibold max-sm:sticky max-sm:right-0 max-sm:z-50 ">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentItems?.map((dispute: DisputeType, index) => (
                        <tr
                          className="hover:bg-gray-50 focus:bg-gray-300 active:bg-red-200  text-sm"
                          tabIndex={0}
                          key={index}
                        >
                          <td className="text-center border-b px-4 py-4 whitespace-nowrap sticky left-0 bg-white border-r max-sm:hidden">
                            {index + 1}
                          </td>
                          <td className="border-b px-4 py-4 whitespace-nowrap text-gray-500">
                            {convertDateFormat(dispute?.createdAt) &&
                              convertDateFormat(dispute?.createdAt)}
                          </td>
                          <td className="border-b px-4 py-4 whitespace-nowrap text-gray-500">
                            {dispute.user
                              ? dispute.user.firstName
                              : user.firstName}{" "}
                            {dispute.user
                              ? dispute.user.lastName
                              : user.lastName}
                          </td>

                          <td className="border-b px-4 py-4 whitespace-nowrap text-gray-500 text-center">
                            {dispute.user ? dispute.user.email : user.email}
                          </td>
                          <td className="border-b px-4 py-4 whitespace-nowrap text-gray-500 text-center">
                            {dispute.user?.companyName
                              ? dispute.user.companyName
                              : "TOFA"}
                          </td>
                          <td className="border-b px-4 py-4 whitespace-nowrap text-gray-500 text-center">
                            {dispute.user ? dispute.user.role : user.role}
                          </td>
                          <td className="border-b px-4 py-4 whitespace-nowrap text-gray-500 text-center">
                            {dispute?.complaint}
                          </td>
                          <td
                            className={`border-b px-4 py-4 whitespace-nowrap text-gray-500 text-center     ${
                              dispute.status === "Unresolved"
                                ? "bg-[#facbc5] text-[#e46a76]"
                                : "bg-[#d6f9e3] text-[#03d754]"
                            }`}
                          >
                            {dispute?.status}
                          </td>
                          <td className="border-b  py-4 whitespace-nowrap max-sm:sticky max-sm:right-0   border-r bg-white ">
                            <div className="h-full flex justify-center items-center relative ">
                              <button
                                onClick={() =>
                                  handleShowUserActions(dispute.id)
                                }
                                className="px-4"
                              >
                                <BsThreeDotsVertical />
                              </button>

                              <div
                                className={`absolute rounded-md right-12   bg-white border-gray-200 border-1 shadow-lg ${
                                  dispute?.id === show && active
                                    ? "block"
                                    : "hidden"
                                }  "top-0"
                                `}
                              >
                                {/* <div className="relative flex flex-col py-3 bg-white">
                                  <button
                                    className="items-center flex gap-1 text-xs px-2 hover:bg-gray-100 py-1 text-gray-600 "
                                    onClick={showModal}
                                  >
                                    <span className="text-sm text-[#2095F2]">
                                      <AiOutlineFolderView />
                                    </span>
                                    <span>View dispute details</span>
                                  </button>
                                </div> */}
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <ReactPaginate
                  previousLabel={<MdArrowBackIos />}
                  nextLabel={<MdArrowForwardIos />}
                  breakLabel={"..."}
                  breakClassName={"break-me"}
                  pageCount={Math.ceil(filteredData?.length / itemsPerPage)}
                  marginPagesDisplayed={1}
                  pageRangeDisplayed={4}
                  onPageChange={paginate}
                  containerClassName={"pagination"}
                  activeClassName={"active"}
                  pageLinkClassName={"pageAnchor"}
                  disabledClassName="disabledClass"
                  disabledLinkClassName="disabledClass"
                />
              </div>
            </>
          )}
        </div>
      </div>
      <DisputeDetailsModal
        isModalOpen={isModalOpen}
        handleCancel={handleCancel}
      />
    </div>
  );
};

export default ProtectedRoutes(Dispute, [
  "TOFA Pay Admin",
  "Finance",
  "Agent",
  "Partner Agents",
  "Super Admin",
  "Partner",
]);
