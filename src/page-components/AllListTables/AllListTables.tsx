import { useContext, useEffect, useState } from "react";

import { Toaster } from "react-hot-toast";
import { BsSearch, BsThreeDotsVertical } from "react-icons/bs";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import ReactPaginate from "react-paginate";

import ListLoader from "@/shared-components/SkeletonLoader/ListLoader";
import TableEmptyState from "@/shared-components/TableEmptyState";
import Header from "@/shared-components/Header";

import { convertDateFormat } from "@/helpers/helperFunctions";
import { useGetAllListTables } from "@/hooks/useGetAllListTables";
import DashboardNavBar from "@/shared-components/DashboardNavBar";
import { AppContext } from "@/utils/AppState";
import { Link } from "react-router-dom";
import { AiOutlineFolderView } from "react-icons/ai";
import { ProtectedRoutes } from "@/utils/ProtectedRoutes";

const AllListTables = () => {
  const { activeMenu } = useContext(AppContext);

  const [active, setActive] = useState(false);
  const [show, setShow] = useState<string>("");

  const {
    filterData,
    filteredData,
    currentListTables,
    noMatch,
    setNoMatch,
    loading,
    searchQuery,
    paginate,
    itemsPerPage,
  } = useGetAllListTables();

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
  }, [currentListTables]);

  return (
    <div className={` bg-main-bg min-h-screen  flex-1 w-full`}>
      <Toaster />
      <div className={`${activeMenu ? ` md:ml-72 ` : `flex-2`}`}>
        <div className="fixed md:static bg-main-bg navbar w-full">
          <DashboardNavBar />
        </div>
        <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl pt-20 max-sm:mt-0">
          <Header category="List" title="All Lists Tables" />
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
              </div>
              {currentListTables?.length < 1 ? (
                <>
                  {searchQuery && filteredData?.length < 1 ? (
                    <TableEmptyState
                      title="No list table matched your search. Try searching for something
                  else"
                    />
                  ) : (
                    <TableEmptyState title="Monitor all list tables" />
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
                            Date uploaded
                          </th>
                          <th className="bg-gray-100 border-b text-left px-4 py-4 whitespace-nowrap font-semibold z-10">
                            Table ID
                          </th>
                          <th className="bg-gray-100 border-b text-center px-4 py-4 whitespace-nowrap font-semibold z-10">
                              Company
                          </th>
                          <th className="bg-gray-100 border-b text-center px-4 py-4 whitespace-nowrap rounded-tr-xl font-semibold max-sm:sticky max-sm:right-0 max-sm:z-50 ">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentListTables?.map((data, index) => (
                          <tr
                            className="hover:bg-gray-50 focus:bg-gray-300 active:bg-red-200  text-sm"
                            tabIndex={0}
                            key={index}
                          >
                            <td className="text-center border-b px-4 py-4 whitespace-nowrap sticky left-0 bg-white border-r max-sm:hidden">
                              {index + 1}
                            </td>
                            <td className="border-b px-4 py-4 whitespace-nowrap text-gray-500">
                              {data?.Date_of_delivery &&
                                convertDateFormat(data.createdAt)}
                            </td>
                            <td className="border-b px-4 py-4 whitespace-nowrap text-gray-500">
                              {data?.tableId && data?.tableId}
                            </td>

                            <td className="border-b px-4 py-4 whitespace-nowrap text-gray-500 text-center">
                              {data?.companyInitial && data.companyInitial}
                            </td>
                            <td className="border-b  py-4 whitespace-nowrap max-sm:sticky max-sm:right-0   border-r bg-white ">
                              <div className="h-full flex justify-center items-center relative ">
                                <button
                                  onClick={(e) =>
                                    handleShowUserActions(data.id)
                                  }
                                  className="px-4"
                                >
                                  <BsThreeDotsVertical />
                                </button>

                                <div
                                  className={`absolute rounded-md right-16   bg-white border-gray-200 border-1 shadow-lg ${
                                    data?.id === show && active
                                      ? "block"
                                      : "hidden"
                                  }  top-2
                                    `}
                                >
                                  <div className="relative flex flex-col py-3 bg-white">
                                    <Link
                                      to={`/all-list-tables/details/${data.tableId}`}
                                      className="items-center flex gap-1 text-xs px-2 hover:bg-gray-100 py-1 text-gray-600 "
                                    >
                                      <span className="text-sm text-[#2095F2]">
                                        <AiOutlineFolderView />
                                      </span>
                                      <span>View list details</span>
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {currentListTables?.length > 0 && (
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
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProtectedRoutes(AllListTables, [
  "TOFA Pay Admin",
  "Finance",
  "Agent",
  "Compliance",
  "Partner Agents",
  "Super Admin",
  "Partner",
]);
