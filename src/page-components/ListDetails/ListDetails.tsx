import DashboardNavBar from "@/shared-components/DashboardNavBar";
import Header from "@/shared-components/Header";
import { Sidebar } from "@/shared-components/Sidebar";
import { axiosInstance } from "@/shared-components/baseUrl";
import { AppContext } from "@/utils/AppState";
import { GlobalContext } from "@/utils/GlobalState";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ListDetailsDataType } from "@/types/types";
import {
  Capitalize,
  convertDateFormat,
  numberWithCommas,
} from "@/helpers/helperFunctions";
import ListDetailsLoader from "@/shared-components/SkeletonLoader/ListDetailsLoader";
import { ProtectedRoutes } from "@/utils/ProtectedRoutes";

const ListDetails = () => {
  const { activeMenu } = useContext(AppContext);
  const { user } = useContext(GlobalContext);
  const listId = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [listDetails, setListDetails] = useState<ListDetailsDataType>({
    Amount_to_be_paid_to_Supplier: 0,
    Approve_payment: "",
    Approve_status: "",
    Cash_will_be_collected_by: "",
    Contact_No: "",
    Damage_bags_cost: "",
    Date_of_delivery: "",
    Identity_no_and_type: "",
    Location: "",
    Mode_of_payment: "",
    Payment_status: "",
    Price: 0,
    Product_supplied: "",
    Quantity_supplied: 0,
    Supplier_invoice_No: "",
    Supplier_name: "",
    Total_amount_payable: 0,
    Transaction_No: "",
    Type_of_transaction: "",
    createdAt: "",
    tableId: "",
    companyName: "",
    Name: "",
    Payment_receipt: "",
    companyInitial: "",
    currency: "",
  });

  const getListDetails = async () => {
    setLoading(true);
    try {
      const data = await axiosInstance.get(`/get-list/${listId.id}`);
      setListDetails(data.data.list);
      setLoading(false);
    } catch (error: any) {
      console.log(error);
      if (!error) {
        return navigate(`/no-connection`);
      }
    }
  };
  useEffect(() => {
    getListDetails();
  }, [listId]);

  return (
    <div className={` bg-main-bg min-h-screen  flex-1 w-full`}>
      <div className={`${activeMenu ? ` md:ml-72 ` : `flex-2`}`}>
        <div className="fixed md:static bg-main-bg navbar w-full">
          <DashboardNavBar />
        </div>
        <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl pt-20 max-sm:mt-0">
          <Header category="List" title="List details" />

          {loading ? (
            <ListDetailsLoader />
          ) : (
            <>
              <div className="flex justify-end items-center flex-wrap gap-5">
                {user.role === "Partner" || user.role === "Super Admin" ? (
                  <>
                    {listDetails.Approve_payment === "Pending" &&
                      listDetails.Approve_status === "Pending" && (
                        <Link
                          to={`/lists/edit/${listId.id}`}
                          className=" whitespace-nowrap px-6 py-2 bg-primary-color rounded text-color-dark-font"
                        >
                          Edit list
                        </Link>
                      )}
                  </>
                ) : null}
              </div>

              <div className="mt-12 shadow-md p-6 ">
                <div className="grid grid-cols-2 gap-4">
                  <div className=" col-span-1 max-md:col-span-2 flex items-center gap-2">
                    <h6 className="font-semibold">Date uploaded:</h6>
                    <p className="text-gray-400">
                      {" "}
                      {listDetails.createdAt &&
                        convertDateFormat(listDetails.createdAt)}
                    </p>
                  </div>
                  <div className=" col-span-1 max-md:col-span-2 flex items-center gap-2">
                    <h6 className="font-semibold">Date of delivery:</h6>
                    <p className="text-gray-400">
                      {" "}
                      {listDetails.Date_of_delivery &&
                        convertDateFormat(listDetails.Date_of_delivery)}
                    </p>
                  </div>
                  <div className=" col-span-1 max-md:col-span-2 flex items-center gap-2">
                    <h6 className="font-semibold">Transaction type:</h6>
                    <p className="text-gray-400">
                      {" "}
                      {listDetails?.Type_of_transaction}
                    </p>
                  </div>
                  <div className=" col-span-1 max-md:col-span-2 flex items-center gap-2">
                    <h6 className="font-semibold">Location:</h6>
                    <p className="text-gray-400">
                      {" "}
                      {listDetails.Location &&
                        Capitalize(listDetails?.Location)}
                    </p>
                  </div>
                  <div className=" col-span-1 max-md:col-span-2 flex items-center gap-2">
                    <h6 className="font-semibold">Transaction No:</h6>
                    <p className="text-gray-400">
                      {" "}
                      {listDetails?.Transaction_No}
                    </p>
                  </div>
                  <div className=" col-span-1 max-md:col-span-2 flex items-center gap-2">
                    <h6 className="font-semibold">Mode of payment:</h6>
                    <p className="text-gray-400">
                      {" "}
                      {listDetails.Mode_of_payment &&
                        Capitalize(listDetails?.Mode_of_payment)}
                    </p>
                  </div>
                  <div className=" col-span-1 max-md:col-span-2 flex items-center gap-2">
                    <h6 className="font-semibold">Contact No:</h6>
                    <p className="text-gray-400"> {listDetails?.Contact_No}</p>
                  </div>
                  <div className=" col-span-1 max-md:col-span-2 flex items-center gap-2">
                    <h6 className="font-semibold">Identity No. / Type:</h6>
                    <p className="text-gray-400">
                      {listDetails?.Identity_no_and_type}
                    </p>
                  </div>
                  <div className=" col-span-1 max-md:col-span-2 flex items-center gap-2">
                    <h6 className="font-semibold">Supplier Name:</h6>
                    <p className="text-gray-400">
                      {listDetails?.Supplier_name}
                    </p>
                  </div>
                  <div className=" col-span-1 max-md:col-span-2 flex items-center gap-2">
                    <h6 className="font-semibold">Supplier Invoice No:</h6>
                    <p className="text-gray-400">
                      {listDetails?.Supplier_invoice_No &&
                      listDetails?.Supplier_invoice_No !== null
                        ? listDetails?.Supplier_invoice_No
                        : "None"}
                    </p>
                  </div>
                  <div className=" col-span-1 max-md:col-span-2 flex items-center gap-2">
                    <h6 className="font-semibold">Quantity Supplied:</h6>
                    <p className="text-gray-400">
                      {listDetails?.Quantity_supplied &&
                        numberWithCommas(listDetails?.Quantity_supplied)}
                    </p>
                  </div>
                  <div className=" col-span-1 max-md:col-span-2 flex items-center gap-2">
                    <h6 className="font-semibold">Price</h6>
                    <p className="text-gray-400">
                      {listDetails?.currency && listDetails?.currency}{" "}
                      {listDetails?.Price &&
                        numberWithCommas(listDetails?.Price)}
                    </p>
                  </div>
                  <div className=" col-span-1 max-md:col-span-2 flex items-center gap-2">
                    <h6 className="font-semibold">Total amount payable:</h6>
                    <p className="text-gray-400">
                      {listDetails?.currency && listDetails?.currency}{" "}
                      {listDetails?.Total_amount_payable &&
                        numberWithCommas(listDetails?.Total_amount_payable)}
                    </p>
                  </div>
                  <div className=" col-span-1 max-md:col-span-2 flex items-center gap-2">
                    <h6 className="font-semibold">Supplier Amount</h6>
                    <p className="text-gray-400">
                      {listDetails?.currency && listDetails?.currency}{" "}
                      {listDetails?.Amount_to_be_paid_to_Supplier &&
                        numberWithCommas(
                          listDetails?.Amount_to_be_paid_to_Supplier
                        )}
                    </p>
                  </div>
                  <div className=" col-span-1 max-md:col-span-2 flex items-center gap-2">
                    <h6 className="font-semibold">cost of damaged bags:</h6>
                    <p className="text-gray-400">
                      {listDetails?.Damage_bags_cost &&
                      listDetails?.Damage_bags_cost !== null
                        ? listDetails?.Damage_bags_cost
                        : "0"}
                    </p>
                  </div>
                  <div className=" col-span-1 max-md:col-span-2 flex items-center gap-2">
                    <h6 className="font-semibold">
                      Cash will be collected by:
                    </h6>
                    <p className="text-gray-400">
                      {listDetails?.Cash_will_be_collected_by &&
                      listDetails?.Cash_will_be_collected_by !== null
                        ? listDetails?.Cash_will_be_collected_by
                        : "None"}
                    </p>
                  </div>
                  <div className=" col-span-1 max-md:col-span-2 flex items-center gap-2">
                    <h6 className="font-semibold">Company Initial:</h6>
                    <p className="text-gray-400">
                      {listDetails?.companyInitial
                        ? listDetails?.companyInitial
                        : "None"}
                    </p>
                  </div>

                  <div className=" col-span-1 max-md:col-span-2 flex items-center gap-2">
                    <h6 className="font-semibold">Status:</h6>
                    <p
                      className={`${
                        listDetails?.Approve_status === "Pending"
                          ? "bg-[#fff4e5] text-[#fec90f]"
                          : "bg-[#d6f9e3] text-[#03d754]"
                      } flex justify-center items-center w-20 h-6 text-sm rounded-full`}
                    >
                      {listDetails?.Approve_status &&
                        listDetails?.Approve_status}
                    </p>
                  </div>
                  <div className=" col-span-1 max-md:col-span-2 flex items-center gap-2">
                    <h6 className="font-semibold">Approve Payment :</h6>
                    <p
                      className={`${
                        listDetails?.Approve_payment === "Pending"
                          ? "bg-[#fff4e5] text-[#fec90f]"
                          : listDetails?.Approve_payment === "Not-Approved"
                          ? "bg-[#facbc5] text-[#e46a76]"
                          : "bg-[#d6f9e3] text-[#03d754]"
                      } flex justify-center items-center w-20 h-6 text-sm rounded-full`}
                    >
                      {listDetails?.Approve_payment &&
                        listDetails?.Approve_payment}
                    </p>
                  </div>
                  <div className=" col-span-1 max-md:col-span-2 flex items-center gap-2">
                    <h6 className="font-semibold">Payment receipt</h6>

                    {listDetails?.Payment_receipt ? (
                      <a
                        href={`${listDetails?.Payment_receipt}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 underline"
                      >
                        View receipt
                      </a>
                    ) : (
                      <p className="text-gray-400">None</p>
                    )}
                  </div>
                  <div className=" col-span-1 max-md:col-span-2 flex items-center gap-2">
                    <h6 className="font-semibold">Payment Status:</h6>
                    <p
                      className={`${
                        listDetails?.Payment_status === "Not Paid"
                          ? "border-[#e46a76]  text-[#e46a76]"
                          : "border-[#03d754] text-[#03d754]"
                      } flex justify-center items-center w-20 h-6 text-sm rounded-full border-1`}
                    >
                      {listDetails?.Payment_status &&
                        listDetails?.Payment_status}
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProtectedRoutes(ListDetails, [
  "TOFA Pay Admin",
  "Finance",
  "Agent",
  "Compliance",
  "Partner Agents",
  "Super Admin",
  "Partner",
]);
