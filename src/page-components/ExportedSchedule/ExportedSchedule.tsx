import { convertDateFormat, formatName } from "@/helpers/helperFunctions";
import { useGetAllExportedScheduleTable } from "@/hooks/useGetAllExportedScheduleTable";
import DashboardNavBar from "@/shared-components/DashboardNavBar";
import Header from "@/shared-components/Header";
import ListLoader from "@/shared-components/SkeletonLoader/ListLoader";
import TableEmptyState from "@/shared-components/TableEmptyState";
import { AppContext } from "@/utils/AppState";
import { ProtectedRoutes } from "@/utils/ProtectedRoutes";
import { useContext, useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { AiOutlineFolderView } from "react-icons/ai";
import { BiFilter } from "react-icons/bi";
import { BsSearch, BsThreeDotsVertical } from "react-icons/bs";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";

const ExportedSchedule = () => {
  const { activeMenu } = useContext(AppContext);

  const [active, setActive] = useState(false);
  const [show, setShow] = useState<string>("");

  const {
    getAllSchedule,
    currentScheduled,
    itemsPerPage,
    searchQuery,
    filteredData,
    filterData,
    loading,
    getExportedSchedule,
    paginate,
    handleValueChange,
    selectedValue,
    setSelectedKey,
    selectedKey,
    handleResetFilter,
  } = useGetAllExportedScheduleTable();

  useEffect(() => {
    getExportedSchedule();
  }, []);

  const handleShowUserActions = (id: string) => {
    setShow(id);
    setActive((current) => !current);
  };

  return (
    <div className={` bg-main-bg min-h-screen  flex-1 w-full`}>
      <Toaster />
      <div className={`${activeMenu ? ` md:ml-72 ` : `flex-2`}`}>
        <div className="fixed md:static bg-main-bg navbar w-full">
          <DashboardNavBar />
        </div>
        <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl pt-20 max-sm:mt-0">
          <Header category="Schedule" title="Exported Scheduled Tables" />
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
                      {Object.keys(
                        (getAllSchedule && getAllSchedule[0]) ?? {}
                      ).map((key) => (
                        <option key={key} value={key}>
                          {formatName(key)}
                        </option>
                      ))}
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
                            getAllSchedule?.map(
                              (item: any) => item[selectedKey]
                            )
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
              {searchQuery && currentScheduled?.length < 1 ? (
                <>
                  {filteredData?.length < 1 ? (
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
                            Date exported
                          </th>
                          <th className="bg-gray-100 border-b text-center px-4 py-4 whitespace-nowrap font-semibold z-10">
                              Company
                          </th>
                          <th className="bg-gray-100 border-b text-left px-4 py-4 whitespace-nowrap font-semibold z-10">
                              Company email
                          </th>
                          <th className="bg-gray-100 border-b text-center px-4 py-4 whitespace-nowrap font-semibold z-10">
                            Schedule link
                          </th>
                          <th className="bg-gray-100 border-b text-center px-4 py-4 whitespace-nowrap font-semibold z-10">
                            Schedule ID
                          </th>
                          <th className="bg-gray-100 border-b text-left px-4 py-4 whitespace-nowrap font-semibold z-10">
                            Table ID
                          </th>
                          <th className="bg-gray-100 border-b text-left px-4 py-4 whitespace-nowrap font-semibold z-10">
                            List Created by
                          </th>
                          <th className="bg-gray-100 border-b text-center px-4 py-4 whitespace-nowrap rounded-tr-xl font-semibold sticky right-0 z-50 ">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentScheduled?.map((data, index) => (
                          <tr
                            className="hover:bg-gray-50 focus:bg-gray-300 active:bg-red-200  text-sm"
                            tabIndex={0}
                            key={index}
                          >
                            <td className="text-center border-b px-4 py-4 whitespace-nowrap sticky left-0 bg-white border-r max-sm:hidden">
                              {index + 1}
                            </td>
                            <td className="border-b px-4 py-4 whitespace-nowrap text-gray-500">
                              {data?.createdAt &&
                                convertDateFormat(data.createdAt)}
                            </td>
                            <td className="border-b px-4 py-4 whitespace-nowrap text-gray-500 text-center">
                              {data?.user?.companyInitial &&
                                data?.user?.companyInitial}
                            </td>
                            <td className="border-b px-4 py-4 whitespace-nowrap text-gray-500">
                              {data?.companyEmail?.email &&
                                data?.companyEmail?.email.toLowerCase()}
                            </td>
                            <td className="border-b px-4 py-4 whitespace-nowrap text-blue-500 underline">
                              <a
                                href={data?.excelFile}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                View excel
                              </a>
                            </td>
                            <td className="border-b px-4 py-4 whitespace-nowrap text-gray-500">
                              {data?.tableId && data?.tableId}
                            </td>
                            <td className="border-b px-4 py-4 whitespace-nowrap text-gray-500">
                              {data?.id && data?.id}
                            </td>
                            <td className="border-b px-4 py-4 whitespace-nowrap text-gray-500 text-center">
                              {" "}
                              {data?.user?.firstName &&
                                data.user?.firstName}{" "}
                              {data?.user?.lastName && data.user?.lastName}
                            </td>
                            <td className="border-b  py-4 whitespace-nowrap sticky right-0   border-r bg-white ">
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
                                  className={`absolute rounded-md right-20  bg-white border-gray-200 border-1 shadow-lg ${
                                    data?.id === show && active
                                      ? "block"
                                      : "hidden"
                                  }  top-1
                            `}
                                >
                                  <div className="relative flex flex-col py-3 bg-white">
                                    <Link
                                      to={`/exported-schedule/details/${data.tableId}`}
                                      className="items-center flex gap-1 text-xs px-2 hover:bg-gray-100 py-1 text-gray-600 "
                                    >
                                      <span className="text-sm text-[#2095F2]">
                                        <AiOutlineFolderView />
                                      </span>
                                      <span>View schedule details</span>
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
                  {currentScheduled?.length > 0 && (
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

export default ProtectedRoutes(ExportedSchedule, [
  "TOFA Pay Admin",
  "Finance",
  "Super Admin",
]);
