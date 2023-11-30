import DashboardNavBar from "@/shared-components/DashboardNavBar";
import Header from "@/shared-components/Header";
import { AppContext } from "@/utils/AppState";
import { useContext } from "react";

import { HiUserGroup } from "react-icons/hi";
import { BsBoxSeam } from "react-icons/bs";
import { FiBarChart } from "react-icons/fi";
import { HiOutlineRefresh } from "react-icons/hi";
import { GiReceiveMoney } from "react-icons/gi";
import { GiTakeMyMoney } from "react-icons/gi";
import { PiMoneyFill } from "react-icons/pi";
import MonthlyProfit from "@/shared-components/Charts/MonthlyProfit";
import MonthlyGrossProfit from "@/shared-components/Charts/MonthlyGrossProfit";
import MonthlyRevenue from "@/shared-components/Charts/MonthlyRevenue";
import MonthlyPaidFarmers from "@/shared-components/Charts/MonthlyPaidFarmers";
import { useGetAllStatistics } from "@/hooks/useGetAllStatistics";
import DashboardCardLoader from "@/shared-components/SkeletonLoader/DashboardCardLoader";
import { numberWithCommas } from "@/helpers/helperFunctions";
import { ProtectedRoutes } from "@/utils/ProtectedRoutes";
import { useGetPartnerStatistics } from "@/hooks/useGetPartnerStatistics";
import PartnerMonthlyRevenue from "@/shared-components/Charts/PartnerMonthlyRevenue";
import PartnerMonthlyPaidFarmers from "@/shared-components/Charts/PartnerMonthlyPaidFarmers";

const Overview = () => {
  const { activeMenu, user } = useContext(AppContext);
  const { allStatistics, loading } = useGetAllStatistics();
  const { allPartnerStatistics, isLoading } = useGetPartnerStatistics();

  return (
    <div
      className={` bg-main-bg min-h-screen  w-full ${
        activeMenu ? ` md:ml-72 ` : `flex-2`
      }`}
    >
      <div className="fixed  md:static bg-main-bg navbar w-full">
        <DashboardNavBar />
      </div>
      <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl pt-20 max-sm:mt-0">
        <Header category="Overview" title="Analytics" />
        {user?.role === "Partner" || user?.role === "Partner Agents" ? (
          <div className="mt-12">
            {isLoading ? (
              <DashboardCardLoader />
            ) : (
              <div className="flex flex-wrap items-center gap-4">
                <div className="bg-white rounded-2xl p-4 w-[19.5rem] shadow-md flex gap-2 py-10">
                  <button
                    type="button"
                    className="text-2xl opacity-0.9 rounded-full p-4 hover:drop-shadow-xl bg-[#fff4e5] text-[#e46a76]"
                  >
                    <FiBarChart />
                  </button>

                  <div className="">
                    <p className="">
                      <span className="text-lg font-semibold">
                        {allPartnerStatistics?.noOfList
                          ? numberWithCommas(allPartnerStatistics?.noOfList)
                          : 0}
                      </span>
                      <span className={` text-sm text-green-400 ml-2`}>
                        100%
                      </span>
                    </p>
                    <p className="text-sm text-gray-400 mt-1">
                      No of List uploaded
                    </p>
                  </div>
                </div>
                <div className="bg-white rounded-2xl p-4 w-[19.5rem] shadow-md flex gap-2 py-10">
                  <button
                    type="button"
                    className="text-2xl opacity-0.9 rounded-full p-4 hover:drop-shadow-xl bg-[#fec90f] text-[#fff4e5]"
                  >
                    <BsBoxSeam />
                  </button>
                  <div className="">
                    <p className="">
                      <span className="text-lg font-semibold">
                        {allPartnerStatistics?.noOfProducts
                          ? numberWithCommas(allPartnerStatistics?.noOfProducts)
                          : 0}{" "}
                      </span>
                      <span className={` text-sm text-green-400 ml-2`}>
                        100%
                      </span>
                    </p>
                    <p className="text-sm text-gray-400 mt-1">Products</p>
                  </div>
                </div>
                <div className="bg-white rounded-2xl p-4 w-[19.5rem] shadow-md flex gap-2 py-10">
                  <button
                    type="button"
                    className="text-2xl opacity-0.9 rounded-full p-4 hover:drop-shadow-xl text-[#03C9D7] bg-[#E5FAFB]"
                  >
                    <HiUserGroup />
                  </button>
                  <div className="">
                    <p className="">
                      <span className="text-lg font-semibold">
                        {allPartnerStatistics?.noFarmersLocation
                          ? numberWithCommas(
                              allPartnerStatistics?.noFarmersLocation
                            )
                          : 0}{" "}
                      </span>
                      <span className={` text-sm text-green-400 ml-2`}>
                        100%
                      </span>
                    </p>
                    <p className="text-sm text-gray-400 mt-1">
                      Farmers Location
                    </p>
                  </div>
                </div>
                <div className="bg-white rounded-2xl p-4 w-[19.5rem] shadow-md flex gap-2 py-10">
                  <button
                    type="button"
                    className="text-2xl opacity-0.9 rounded-full p-4 hover:drop-shadow-xl text-[#fff4e5] bg-[#e46a76]"
                  >
                    <PiMoneyFill />
                  </button>
                  <div className="">
                    <p className="">
                      <span className="text-lg font-semibold">
                        {" "}
                        {allPartnerStatistics?.totalAmountInList
                          ? numberWithCommas(
                              allPartnerStatistics?.totalAmountInList
                            )
                          : 0}{" "}
                      </span>
                      <span className="text-sm  ml-2 font-small">
                        {" "}
                        {user?.currency && user.currency}
                      </span>
                    </p>
                    <p className="text-sm text-gray-400 mt-1">
                      Amount to be Paid to Farmers
                    </p>
                  </div>
                </div>
                <div className="bg-white rounded-2xl p-4 w-[19.5rem] shadow-md flex gap-2 py-10">
                  <button
                    type="button"
                    className="text-2xl opacity-0.9 rounded-full p-4 hover:drop-shadow-xl bg-[#ebfaf2] text-[#00c292]"
                  >
                    <HiOutlineRefresh />
                  </button>
                  <div className="">
                    <p className="">
                      <span className="text-lg font-semibold">
                        {" "}
                        {allPartnerStatistics?.totalAmountPaidInList
                          ? numberWithCommas(
                              allPartnerStatistics?.totalAmountPaidInList
                            )
                          : 0}{" "}
                      </span>
                      <span className="text-sm  ml-2 font-small">
                        {" "}
                        {user?.currency && user.currency}
                      </span>
                    </p>
                    <p className="text-sm text-gray-400 mt-1">
                      Total Amount Paid to Farmers
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="mt-12">
            {loading ? (
              <DashboardCardLoader />
            ) : (
              <div className="flex flex-wrap items-center gap-4">
                <div className="bg-white rounded-2xl p-4 w-[19.5rem] shadow-md flex gap-2 py-10">
                  <button
                    type="button"
                    className="text-2xl opacity-0.9 rounded-full p-4 hover:drop-shadow-xl text-[#03C9D7] bg-[#E5FAFB]"
                  >
                    <HiUserGroup />
                  </button>
                  <div className="">
                    <p className="">
                      <span className="text-lg font-semibold">
                        {allStatistics?.totalNumberOfSellers
                          ? numberWithCommas(
                              allStatistics?.totalNumberOfSellers
                            )
                          : 0}
                      </span>
                      <span className={` text-sm text-green-400 ml-2`}>
                        100%
                      </span>
                    </p>
                    <p className="text-sm text-gray-400 mt-1">Partner</p>
                  </div>
                </div>
                <div className="bg-white rounded-2xl p-4 w-[19.5rem] shadow-md flex gap-2 py-10">
                  <button
                    type="button"
                    className="text-2xl opacity-0.9 rounded-full p-4 hover:drop-shadow-xl bg-[#fec90f] text-[#fff4e5]"
                  >
                    <BsBoxSeam />
                  </button>
                  <div className="">
                    <p className="">
                      <span className="text-lg font-semibold">
                        {allStatistics?.totalNumberOfProducts
                          ? numberWithCommas(
                              allStatistics?.totalNumberOfProducts
                            )
                          : 0}
                      </span>
                      <span className={` text-sm text-green-400 ml-2`}>
                        100%
                      </span>
                    </p>
                    <p className="text-sm text-gray-400 mt-1">Products</p>
                  </div>
                </div>
                <div className="bg-white rounded-2xl p-4 w-[19.5rem] shadow-md flex gap-2 py-10">
                  <button
                    type="button"
                    className="text-2xl opacity-0.9 rounded-full p-4 hover:drop-shadow-xl bg-[#fff4e5] text-[#e46a76]"
                  >
                    <FiBarChart />
                  </button>
                  <div className="">
                    <p className="">
                      <span className="text-lg font-semibold">
                        {allStatistics?.totalQuantitySupplied
                          ? numberWithCommas(
                              allStatistics?.totalQuantitySupplied
                            )
                          : 0}
                      </span>
                      <span className={` text-sm text-green-400 ml-2`}>
                        Tons
                      </span>
                    </p>
                    <p className="text-sm text-gray-400 mt-1">
                      Total Quantity supplied
                    </p>
                  </div>
                </div>
                <div className="bg-white rounded-2xl p-4 w-[19.5rem] shadow-md flex gap-2 py-10">
                  <button
                    type="button"
                    className="text-2xl opacity-0.9 rounded-full p-4 hover:drop-shadow-xl text-[#fff4e5] bg-[#e46a76]"
                  >
                    <PiMoneyFill />
                  </button>
                  <div className="">
                    <p className="">
                      <span className="text-lg font-semibold">
                        {" "}
                        {allStatistics?.totalNumberOfSuppliers
                          ? numberWithCommas(
                              allStatistics?.totalNumberOfSuppliers
                            )
                          : 0}
                      </span>
                      <span className={` text-sm text-green-400 ml-2`}>
                        100%
                      </span>
                    </p>
                    <p className="text-sm text-gray-400 mt-1">Paid farmers</p>
                  </div>
                </div>
                <div className="bg-white rounded-2xl p-4 w-[19.5rem] shadow-md flex gap-2 py-10">
                  <button
                    type="button"
                    className="text-2xl opacity-0.9 rounded-full p-4 hover:drop-shadow-xl bg-[#ebfaf2] text-[#00c292]"
                  >
                    <HiOutlineRefresh />
                  </button>
                  <div className="">
                    <p className="">
                      <span className="text-lg font-semibold">
                        {" "}
                        {allStatistics?.totalRevenueInNGN
                          ? numberWithCommas(allStatistics?.totalRevenueInNGN)
                          : 0}
                      </span>
                      <span className="text-sm  ml-2 font-small">NGN</span>
                    </p>
                    <p className="text-sm text-gray-400 mt-1">Revenue</p>
                  </div>
                </div>
                <div className="bg-white rounded-2xl p-4 w-[19.5rem] shadow-md flex gap-2 py-10">
                  <button
                    type="button"
                    className="text-2xl opacity-0.9 rounded-full p-4 hover:drop-shadow-xl bg-[#fff4e5] text-[#fec90f]"
                  >
                    <GiReceiveMoney />
                  </button>
                  <div className="">
                    <p className="">
                      <span className="text-lg font-semibold">
                        {" "}
                        {allStatistics?.totalPaymentsToFarmers
                          ? numberWithCommas(
                              allStatistics?.totalPaymentsToFarmers
                            )
                          : 0}
                      </span>
                      <span className="text-sm  ml-2 font-small">NGN</span>
                    </p>
                    <p className="text-sm text-gray-400 mt-1">
                      Total payment to farmers
                    </p>
                  </div>
                </div>
                <div className="bg-white rounded-2xl p-4 w-[19.5rem] shadow-md flex gap-2 py-10">
                  <button
                    type="button"
                    className="text-2xl opacity-0.9 rounded-full p-4 hover:drop-shadow-xl bg-[#03C9D7] text-[#E5FAFB]"
                  >
                    <GiTakeMyMoney />
                  </button>
                  <div className="">
                    <p className="">
                      <span className="text-lg font-semibold">
                        {" "}
                        {allStatistics?.grossProfit
                          ? numberWithCommas(allStatistics?.grossProfit)
                          : 0}
                      </span>
                      <span className="text-sm  ml-2 font-small">NGN</span>
                    </p>
                    <p className="text-sm text-gray-400 mt-1">Gross profit</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
        {user?.role === "Super Admin" && (
          <>
            {/* <div className="mt-6 max-lg:hidden">
              <MonthlyRevenue />
            </div> */}
            <div className="mt-6">
              <MonthlyProfit />
            </div>
            <div className="mt-6 ">
              <MonthlyGrossProfit />
            </div>
            <div className="mt-6  ">
              <MonthlyPaidFarmers />
            </div>
          </>
        )}

        {user.role === "Partner" || user?.role === "Partner Agents" ? (
          <>
            {" "}
            <div className="mt-6 ">
              <PartnerMonthlyRevenue />
            </div>
            <div className="mt-6 ">
              <PartnerMonthlyPaidFarmers />
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default ProtectedRoutes(Overview, [
  "TOFA Pay Admin",
  "Finance",
  "Agent",
  "Compliance",
  "Partner Agents",
  "Super Admin",
  "Partner",
]);
