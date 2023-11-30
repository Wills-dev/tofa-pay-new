import { Link } from "react-router-dom";
import { useContext, useState } from "react";

import { useGetAllUsers } from "@/hooks/useGetAllUsers";
import DashboardNavBar from "@/shared-components/DashboardNavBar";
import Header from "@/shared-components/Header";
import ListLoader from "@/shared-components/SkeletonLoader/ListLoader";
import TableEmptyState from "@/shared-components/TableEmptyState";
import { AppContext } from "@/utils/AppState";
import { userDetaillsType } from "@/types/types";
import { Capitalize } from "@/helpers/helperFunctions";

import { Toaster } from "react-hot-toast";
import { BiPlus } from "react-icons/bi";
import { BsSearch, BsThreeDotsVertical } from "react-icons/bs";
import {
  MdArrowBackIos,
  MdArrowForwardIos,
  MdCancel,
  MdDelete,
} from "react-icons/md";
import ReactPaginate from "react-paginate";
import { ProtectedRoutes } from "@/utils/ProtectedRoutes";

const Users = () => {
  const { activeMenu } = useContext(AppContext);
  const [active, setActive] = useState(false);
  const [show, setShow] = useState<string>("");

  const {
    currentUsers,
    itemsPerPage,
    paginate,
    loading,
    searchQuery,
    allUsers,
    filterData,
    filteredData,
  } = useGetAllUsers();

  const handleShowUserActions = (id: string) => {
    setShow(id);
    setActive((current) => !current);
  };

  return (
    <div className={` bg-main-bg min-h-screen  flex-1 w-full`}>
      {" "}
      <Toaster />
      <div className={`${activeMenu ? ` md:ml-72 ` : `flex-2`}`}>
        <div className="fixed md:static bg-main-bg navbar w-full">
          <DashboardNavBar />
        </div>
        <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl pt-20 max-sm:mt-0">
          <Header category="users" title="All Users" />

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
                    className="outline-none h-full flex-1"
                    value={searchQuery}
                    onChange={(e) => filterData(e.target.value)}
                  />
                </form>
                <Link
                  to="/register/user"
                  className="bg-primary-color text-color-dark-font py-2 px-4 rounded hover:bg-secondary-color whitespace-nowrap flex items-center"
                >
                  <span className="text-2xl">
                    {" "}
                    <BiPlus />
                  </span>
                  Add New User
                </Link>
              </div>

              {currentUsers?.length < 1 && filteredData?.length < 1 ? (
                <TableEmptyState title="No user matched your search. Try searching again" />
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
                            First Name
                          </th>
                          <th className="bg-gray-100 border-b text-left px-4 py-4 whitespace-nowrap font-semibold z-10">
                            Last Name
                          </th>
                          <th className="bg-gray-100 border-b text-left px-4 py-4 whitespace-nowrap font-semibold z-10">
                            Company
                          </th>
                          <th className="bg-gray-100 border-b text-center px-4 py-4 whitespace-nowrap font-semibold z-10">
                              Phone Number
                          </th>
                          <th className="bg-gray-100 border-b  px-4 py-4 whitespace-nowrap font-semibold z-10 text-left">
                            Email
                          </th>
                          <th className="bg-gray-100 border-b text-center px-4 py-4 whitespace-nowrap font-semibold z-10">
                            Role
                          </th>
                          <th className="bg-gray-100 border-b text-center px-4 py-4 whitespace-nowrap rounded-tr-xl font-semibold max-sm:sticky max-sm:right-0 max-sm:z-50 ">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentUsers?.map(
                          (user: userDetaillsType, index: number) => (
                            <tr
                              className="hover:bg-gray-50 focus:bg-gray-300 active:bg-red-200  text-sm"
                              tabIndex={0}
                              key={index}
                            >
                              <td className="text-center border-b px-4 py-4 whitespace-nowrap sticky left-0 bg-white border-r max-sm:hidden">
                                {index + 1}
                              </td>
                              <td className="border-b px-4 py-4 whitespace-nowrap text-gray-500">
                                {user?.firstName && Capitalize(user?.firstName)}
                              </td>
                              <td className="border-b px-4 py-4 whitespace-nowrap text-gray-500">
                                {user?.lastName && Capitalize(user?.lastName)}
                              </td>

                              <td className="border-b px-4 py-4 whitespace-nowrap text-gray-500 text-center">
                                {user?.companyName}
                              </td>
                              <td className="border-b px-4 py-4 whitespace-nowrap text-gray-500 text-center">
                                {user?.phone}
                              </td>
                              <td className="border-b px-4 py-4 whitespace-nowrap text-gray-500 ">
                                {user?.email?.toLowerCase()}
                              </td>
                              <td className="border-b px-4 py-4 whitespace-nowrap text-gray-500 text-center">
                                {user.role}
                              </td>
                              <td className="border-b  py-4 whitespace-nowrap max-sm:sticky max-sm:right-0   border-r bg-white ">
                                <div className="h-full flex justify-center items-center relative ">
                                  <button
                                    onClick={(e) =>
                                      handleShowUserActions(user?.id)
                                    }
                                    className="px-4"
                                  >
                                    <BsThreeDotsVertical />
                                  </button>

                                  <div
                                    className={`absolute rounded-md right-12   bg-white border-gray-200 border-1 shadow-lg top-0 ${
                                      user?.id === show && active
                                        ? "block"
                                        : "hidden"
                                    }  
                            `}
                                  >
                                    <div className="relative flex flex-col py-3 bg-white">
                                      <button className="items-center flex gap-1 text-xs px-2 hover:bg-gray-100 py-1 text-gray-600 ">
                                        <span className="text-sm text-red-500">
                                          <MdCancel />
                                        </span>
                                        <span>Suspend</span>
                                      </button>
                                      <button className="items-center flex gap-1 text-xs px-2 hover:bg-gray-100 py-1 text-red-500 ">
                                        <span className="text-sm">
                                          <MdDelete />
                                        </span>
                                        <span>delete</span>
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </td>
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
    </div>
  );
};

export default ProtectedRoutes(Users, ["TOFA Pay Admin", "Super Admin"]);
