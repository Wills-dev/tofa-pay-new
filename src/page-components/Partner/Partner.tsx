import { useGetAllPartner } from "@/hooks/useGetAllPartner";
import DashboardNavBar from "@/shared-components/DashboardNavBar";
import Header from "@/shared-components/Header";
import PartnerDetailsModal from "@/shared-components/Modals/PartnerDetailsModal";
import { Sidebar } from "@/shared-components/Sidebar";
import ListLoader from "@/shared-components/SkeletonLoader/ListLoader";
import TableEmptyState from "@/shared-components/TableEmptyState";
import { AppContext } from "@/utils/AppState";
import { useContext, useState } from "react";
import { Toaster } from "react-hot-toast";
import { AiOutlineFolderView } from "react-icons/ai";
import { BsSearch, BsThreeDotsVertical } from "react-icons/bs";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import { PartnerType } from "@/types/types";
import { Capitalize } from "@/helpers/helperFunctions";
import { ProtectedRoutes } from "@/utils/ProtectedRoutes";

const Partner = () => {
  const { activeMenu } = useContext(AppContext);
  // const [active, setActive] = useState(false);
  // const [show, setShow] = useState<string>("");
  // const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    filterData,
    filteredData,
    currentPartnerTables,
    loading,
    searchQuery,
    paginate,
    itemsPerPage,
  } = useGetAllPartner();

  // const showModal = () => {
  //   setIsModalOpen(true);
  // };

  // const handleCancel = () => {
  //   setIsModalOpen(false);
  // };

  // const handleShowUserActions = (id: string) => {
  //   setShow(id);
  //   setActive((current) => !current);
  // };

  return (
    <div className={` bg-main-bg min-h-screen  flex-1 w-full`}>
      {" "}
      <Toaster />
      <div className={`${activeMenu ? ` md:ml-72 ` : `flex-2`}`}>
        <div className="fixed md:static bg-main-bg navbar w-full">
          <DashboardNavBar />
        </div>
        <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl pt-20 max-sm:mt-0">
          <Header category="users" title="All Partners" />

          {loading ? (
            <ListLoader />
          ) : (
            <>
              <div className="flex justify-between items-center flex-wrap gap-5">
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
                <Link
                  to="/register/partner"
                  className="bg-primary-color text-color-dark-font py-2 px-4 rounded hover:bg-secondary-color whitespace-nowrap"
                >
                  Register New Partner
                </Link>
              </div>

              {currentPartnerTables?.length < 1 ? (
                <>
                  {filteredData?.length < 1 ? (
                    <TableEmptyState
                      title="No partner comapny matched your search. Try searching for something
                    else"
                    />
                  ) : (
                    <TableEmptyState title="Monitor all partner details here" />
                  )}
                </>
              ) : (
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
                            Company name
                          </th>
                          <th className="bg-gray-100 border-b text-left px-4 py-4 whitespace-nowrap font-semibold z-10">
                            Company initial
                          </th>
                          <th className="bg-gray-100 border-b text-center px-4 py-4 whitespace-nowrap font-semibold z-10">
                              Currency
                          </th>
                          <th className="bg-gray-100 border-b text-center px-4 py-4 whitespace-nowrap font-semibold z-10">
                            Phone number
                          </th>
                          <th className="bg-gray-100 border-b text-center px-4 py-4 whitespace-nowrap font-semibold z-10">
                             Email
                          </th>
                          <th className="bg-gray-100 border-b px-4 py-4  w-80 font-semibold z-10 rounded-tr-xl">
                            Address
                          </th>
                          {/* <th className="bg-gray-100 border-b text-center px-4 py-4 whitespace-nowrap rounded-tr-xl font-semibold sticky right-0 z-50 ">
                              Action
                            </th> */}
                        </tr>
                      </thead>
                      <tbody>
                        {currentPartnerTables?.map(
                          (partner: PartnerType, index: number) => (
                            <tr
                              className="hover:bg-gray-50 focus:bg-gray-300 active:bg-red-200  text-sm"
                              tabIndex={0}
                            >
                              <td className="text-center border-b px-4 py-4 whitespace-nowrap sticky left-0 bg-white border-r max-sm:hidden">
                                {index + 1}
                              </td>
                              <td className="border-b px-4 py-4 whitespace-nowrap text-gray-500">
                                {partner?.companyName &&
                                  Capitalize(partner?.companyName)}
                              </td>

                              <td className="border-b px-4 py-4 whitespace-nowrap text-gray-500 text-center">
                                {partner?.companyInitial &&
                                  partner?.companyInitial}
                              </td>
                              <td className="border-b px-4 py-4 whitespace-nowrap text-gray-500 text-center">
                                {partner?.currency && partner?.currency}
                              </td>
                              <td className="border-b px-4 py-4 whitespace-nowrap text-gray-500 text-center">
                                {partner?.phoneNumber && partner?.phoneNumber}
                              </td>
                              <td className="border-b px-4 py-4 whitespace-nowrap text-gray-500 text-center">
                                {partner?.email?.toLowerCase()}
                              </td>
                              <td className="border-b px-4 py-4 w-64 min-w-64 text-gray-500  whitespace-nowrap">
                                {partner?.address && partner?.address}
                              </td>
                              {/* <td className="border-b  py-4 whitespace-nowrap sticky right-0   border-r bg-white ">
                                  <div className="h-full flex justify-center items-center relative ">
                                    <button
                                      onClick={(e) =>
                                        handleShowUserActions("1")
                                      }
                                      className="px-4"
                                    >
                                      <BsThreeDotsVertical />
                                    </button>

                                    <div
                                      className={`absolute rounded-md right-12   bg-white border-gray-200 border-1 shadow-lg ${
                                        active ? "block" : "hidden"
                                      }  "top-0"
     `}
                                    >
                                      <div className="relative flex flex-col py-3 bg-white">
                                        <button
                                          className="items-center flex gap-1 text-xs px-2 hover:bg-gray-100 py-1 text-gray-600 "
                                          onClick={showModal}
                                        >
                                          <span className="text-sm text-red-500">
                                            <AiOutlineFolderView />
                                          </span>
                                          <span>Suspend</span>
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </td> */}
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>
                  </div>

                  <ReactPaginate
                    previousLabel={<MdArrowBackIos />}
                    nextLabel={<MdArrowForwardIos />}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={Math.ceil(filteredData.length / itemsPerPage)}
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
              )}
            </>
          )}
        </div>
      </div>
      {/* <PartnerDetailsModal
        isModalOpen={isModalOpen}
        handleCancel={handleCancel}
      /> */}
    </div>
  );
};

export default ProtectedRoutes(Partner, ["TOFA Pay Admin", "Super Admin"]);
