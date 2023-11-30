import { useContext } from "react";

import { SiMicrosoftexcel } from "react-icons/si";
import { Toaster } from "react-hot-toast";
import { Spin } from "antd";

import { Sidebar } from "@/shared-components/Sidebar";
import { AppContext } from "@/utils/AppState";
import DashboardNavBar from "@/shared-components/DashboardNavBar";
import Header from "@/shared-components/Header";
import { useSubmitList } from "@/hooks/useSubmitList";
import {
  Capitalize,
  convertExcelDate,
  numberWithCommas,
} from "@/helpers/helperFunctions";
import TableEmptyState from "@/shared-components/TableEmptyState";
import { ProtectedRoutes } from "@/utils/ProtectedRoutes";

const CreateList = () => {
  const { activeMenu } = useContext(AppContext);
  const {
    handleExcelFileChange,
    loading,
    handleExcelSubmit,
    excelList,
    handleDeleteRow,
  } = useSubmitList();

  return (
    <div className={` bg-main-bg min-h-screen  flex-1 w-full`}>
      <Toaster />
      <div className={` ${activeMenu ? ` md:ml-72 ` : `flex-2`}`}>
        <div className="fixed md:static bg-main-bg navbar w-full">
          <DashboardNavBar />
        </div>
        <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl pt-20 max-sm:mt-0">
          <Toaster />
          <Header category="List" title="Create List" />
          <div className="flex justify-end">
            <label
              htmlFor="excel"
              className="bg-primary-color hover:bg-secondary-color flex items-center gap-1 text-color-dark-font px-6 whitespace-nowrap h-11 rounded-lg font-semibold cursor-pointer"
            >
              <span className="text-xl">
                {" "}
                <SiMicrosoftexcel />
              </span>
              Import List
            </label>
            <input
              type="file"
              name=""
              id="excel"
              className="w-0 h-0 invisible"
              onChange={handleExcelFileChange}
            />
          </div>
          <div className="mt-12 ">
            {excelList.length < 1 ? (
              <TableEmptyState title="  Click on the import list button above to import list" />
            ) : (
              <>
                <div
                  className={` max-w-full w-full relative  overflow-x-auto pb-5 bg-white max-h-[80vh] `}
                >
                  <table className=" rounded-xl border-collapse">
                    <thead>
                      <tr className="">
                        <th className="bg-gray-100 border-b text-left px-4 py-4 rounded-tl-xl whitespace-nowrap z-10 left-0 font-semibold">
                          S/N
                        </th>
                        <th className="bg-gray-100 border-b text-left px-4 py-4 whitespace-nowrap font-semibold">
                          Date
                        </th>
                        <th className="bg-gray-100 border-b text-left px-4 py-4 whitespace-nowrap font-semibold">
                          Type of transaction
                        </th>
                        <th className="bg-gray-100 border-b text-left px-4 py-4 whitespace-nowrap font-semibold">
                          Location
                        </th>
                        <th className="bg-gray-100 border-b text-left px-4 py-4 whitespace-nowrap font-semibold">
                          Transaction No.
                        </th>
                        <th className="bg-gray-100 border-b text-left px-4 py-4 whitespace-nowrap font-semibold">
                          Mode of Payment
                        </th>
                        <th className="bg-gray-100 border-b text-left px-4 py-4 whitespace-nowrap font-semibold">
                          Contact No
                        </th>
                        <th className="bg-gray-100 border-b text-left px-4 py-4 whitespace-nowrap font-semibold">
                          Identity No. and Type
                        </th>
                        <th className="bg-gray-100 border-b text-left px-4 py-4 whitespace-nowrap font-semibold">
                          Cash Collected by
                        </th>
                        <th className="bg-gray-100 border-b text-left px-4 py-4 whitespace-nowrap font-semibold">
                           Supplier Name
                        </th>
                        <th className="bg-gray-100 border-b text-left px-4 py-4 whitespace-nowrap font-semibold">
                          Supplier Invoice No.
                        </th>
                        <th className="bg-gray-100 border-b text-left px-4 py-4 whitespace-nowrap font-semibold">
                           Product supplied
                        </th>
                        <th className="bg-gray-100 border-b text-left px-4 py-4 whitespace-nowrap font-semibold">
                           Quantity supplied
                        </th>
                        <th className="bg-gray-100 border-b text-left px-4 py-4 whitespace-nowrap font-semibold">
                            Price
                        </th>
                        <th className="bg-gray-100 border-b text-left px-4 py-4 whitespace-nowrap font-semibold">
                           Total Amount Payable
                        </th>
                        <th className="bg-gray-100 border-b text-left px-4 py-4 whitespace-nowrap font-semibold">
                          Damage bags cost
                        </th>
                        <th className="bg-gray-100 border-b text-left px-4 py-4 whitespace-nowrap font-semibold">
                          Amount to be paid to Supplier
                        </th>
                        <th className="bg-gray-100 border-b text-left px-4 py-4 whitespace-nowrap rounded-tr-xl font-semibold sticky right-0 ">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {excelList?.map((data, index) => (
                        <tr
                          className="hover:bg-gray-50 focus:bg-gray-300 active:bg-red-200 "
                          tabIndex={0}
                          key={index}
                        >
                          <td className="border-b px-4 py-4 whitespace-nowrap sticky left-0 bg-white border-r">
                            {index + 1}
                          </td>
                          <td className="border-b px-4 py-4 whitespace-nowrap text-gray-500">
                            {data?.Date_of_delivery &&
                              convertExcelDate(data.Date_of_delivery)}
                          </td>
                          <td className="border-b px-4 py-4 whitespace-nowrap text-gray-500">
                            {data?.Type_of_transaction &&
                              Capitalize(data.Type_of_transaction)}
                          </td>
                          <td className="border-b px-4 py-4 whitespace-nowrap text-gray-500">
                            {" "}
                            {data?.Location && Capitalize(data.Location)}
                          </td>
                          <td className="border-b px-4 py-4 whitespace-nowrap text-gray-500">
                            {data?.Transaction_No && data.Transaction_No}
                          </td>

                          <td className="border-b px-4 py-4 whitespace-nowrap text-gray-500">
                            {data?.Mode_of_payment && data.Mode_of_payment}
                          </td>
                          <td className="border-b px-4 py-4 whitespace-nowrap text-gray-500">
                            {data?.Contact_No && data.Contact_No}
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
                            {data?.Supplier_name && data.Supplier_name}
                          </td>
                          <td className="border-b px-4 py-4 whitespace-nowrap text-gray-500">
                            {data?.Supplier_invoice_No &&
                              data.Supplier_invoice_No}
                          </td>
                          <td className="border-b px-4 py-4 whitespace-nowrap text-gray-500">
                            {data?.Product_supplied && data.Product_supplied}
                          </td>
                          <td className="border-b px-4 py-4 whitespace-nowrap text-gray-500">
                            {data?.Quantity_supplied &&
                              numberWithCommas(data.Quantity_supplied)}
                          </td>
                          <td className="border-b px-4 py-4 whitespace-nowrap text-gray-500">
                            {data?.Price && numberWithCommas(data.Price)}
                          </td>
                          <td className="border-b px-4 py-4 whitespace-nowrap text-gray-500">
                            {data?.Total_amount_payable &&
                              numberWithCommas(data.Total_amount_payable)}
                          </td>
                          <td className="border-b px-4 py-4 whitespace-nowrap text-gray-500">
                            {" "}
                            {data?.Damage_bags_cost && data.Damage_bags_cost}
                          </td>

                          <td className="border-b px-4 py-4 whitespace-nowrap text-gray-500">
                            {data?.Amount_to_be_paid_to_Supplier &&
                              numberWithCommas(
                                data.Amount_to_be_paid_to_Supplier
                              )}
                          </td>
                          <td className="border-b px-4 py-4 whitespace-nowrap sticky right-0   border-r bg-white">
                            <span
                              className=" bg-red-500 text-color-dark-font px-2 py-1 rounded-lg w-32 text-sm border-l cursor-pointer"
                              onClick={() => handleDeleteRow(index)}
                            >
                              {" "}
                              Delete
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {loading ? (
                  <button
                    type="button"
                    className=" w-40  py-2 bg-primary-color whitespace-nowrap mt-4 rounded-lg  text-color-dark-font hover:bg-secondary-color"
                  >
                    <Spin wrapperClassName="spinner" />
                  </button>
                ) : (
                  <button
                    type="button"
                    className="w-40  py-2 bg-primary-color whitespace-nowrap mt-4 rounded-lg  text-color-dark-font hover:bg-secondary-color"
                    onClick={handleExcelSubmit}
                  >
                    Submit
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProtectedRoutes(CreateList, [
  "Partner Agents",
  "Super Admin",
  "Partner",
]);
