import DashboardNavBar from "@/shared-components/DashboardNavBar";
import Header from "@/shared-components/Header";
import { Sidebar } from "@/shared-components/Sidebar";
import { AppContext } from "@/utils/AppState";
import { useContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { ListDetailsDataType } from "@/types/types";
import { axiosInstance } from "@/shared-components/baseUrl";
import ListDetailsLoader from "@/shared-components/SkeletonLoader/ListDetailsLoader";
import { Spin } from "antd";
import { ProtectedRoutes } from "@/utils/ProtectedRoutes";

const ListEditDetails = () => {
  const { activeMenu } = useContext(AppContext);
  const listId = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [editLoad, setEditLoad] = useState<boolean>(false);

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setListDetails({
      ...listDetails,
      [e.target.name]: e.target.value,
    });
  };

  const editList = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEditLoad(true);
    try {
      const updateListDetails = {
        Amount_to_be_paid_to_Supplier:
          listDetails.Amount_to_be_paid_to_Supplier,
        Cash_will_be_collected_by: listDetails.Cash_will_be_collected_by,
        Contact_No: listDetails.Contact_No,
        Damage_bags_cost: listDetails.Damage_bags_cost
          ? listDetails.Damage_bags_cost
          : "",
        Date_of_delivery: listDetails.Date_of_delivery,
        Identity_no_and_type: listDetails.Identity_no_and_type,
        Location: listDetails.Location,
        Mode_of_payment: listDetails.Mode_of_payment,
        Price: listDetails.Price,
        Product_supplied: listDetails.Product_supplied,
        Quantity_supplied: listDetails.Quantity_supplied,
        Supplier_invoice_No: listDetails.Supplier_invoice_No
          ? listDetails.Supplier_invoice_No
          : "",
        Supplier_name: listDetails.Supplier_name,
        Total_amount_payable:
          listDetails.Total_amount_payable & listDetails.Total_amount_payable,
        Transaction_No:
          listDetails.Transaction_No && listDetails.Transaction_No,
        Type_of_transaction:
          listDetails.Type_of_transaction && listDetails.Type_of_transaction,
      };
      await axiosInstance.put(`/update-list/${listId.id}`, updateListDetails);
      setEditLoad(false);
      toast.success(`You have successfully updated this list row`, {
        duration: 4000,
        style: {
          background: "#353434",
          color: "#fff",
        },
      });
      setTimeout(() => {
        navigate(`/list/details/${listId.id}`);
      }, 2500);
    } catch (error: any) {
      setEditLoad(false);
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

  console.log(listDetails);
  useEffect(() => {
    getListDetails();
  }, [listId]);

  return (
    <div className={` bg-main-bg min-h-screen  flex-1 w-full`}>
      <Toaster />
      <div className={`${activeMenu ? ` md:ml-72 ` : `flex-2`}`}>
        <div className="fixed md:static bg-main-bg navbar w-full">
          <DashboardNavBar />
        </div>
        <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl pt-20 max-sm:mt-0">
          <Header category="List" title="Edit List details" />

          {loading ? (
            <ListDetailsLoader />
          ) : (
            <>
              <div className="mt-12 shadow-md p-6 ">
                <form className="grid grid-cols-2 gap-4" onSubmit={editList}>
                  <div className=" col-span-1 max-md:col-span-2 flex flex-col  gap-2">
                    <h6 className="font-semibold">Transaction type:</h6>
                    <input
                      type="text"
                      className="text-gray-400 border-1 border-gray-300 px-2 outline-none focus:border-gray-400 h-10 rounded-md w-full"
                      id="transactionType"
                      name="Type_of_transaction"
                      value={
                        listDetails.Type_of_transaction &&
                        listDetails.Type_of_transaction
                      }
                      onChange={handleChange}
                    />{" "}
                  </div>
                  <div className=" col-span-1 max-md:col-span-2 flex flex-col  gap-2">
                    <h6 className="font-semibold">Location:</h6>
                    <input
                      type="text"
                      className="text-gray-400 border-1 border-gray-300 px-2 outline-none focus:border-gray-400 h-10 rounded-md w-full"
                      id="Location"
                      name="Location"
                      value={listDetails.Location && listDetails.Location}
                      onChange={handleChange}
                    />{" "}
                  </div>
                  <div className=" col-span-1 max-md:col-span-2 flex flex-col  gap-2">
                    <h6 className="font-semibold">Transaction No:</h6>
                    <input
                      type="text"
                      className="text-gray-400 border-1 border-gray-300 px-2 outline-none focus:border-gray-400 h-10 rounded-md w-full"
                      id="Transaction_No"
                      name="Transaction_No"
                      value={
                        listDetails.Transaction_No && listDetails.Transaction_No
                      }
                      onChange={handleChange}
                    />{" "}
                  </div>
                  <div className=" col-span-1 max-md:col-span-2 flex flex-col  gap-2">
                    <h6 className="font-semibold">Mode of payment:</h6>
                    <input
                      type="text"
                      className="text-gray-400 border-1 border-gray-300 px-2 outline-none focus:border-gray-400 h-10 rounded-md w-full"
                      id="Mode_of_payment"
                      name="Mode_of_payment"
                      value={
                        listDetails.Mode_of_payment &&
                        listDetails.Mode_of_payment
                      }
                      onChange={handleChange}
                    />{" "}
                  </div>
                  <div className=" col-span-1 max-md:col-span-2 flex-col flex  gap-2">
                    <h6 className="font-semibold ">Contact No:</h6>
                    <input
                      type="text"
                      className="text-gray-400 border-1 border-gray-300 px-2 outline-none focus:border-gray-400 h-10 rounded-md w-full"
                      id="Contact_No"
                      name="Contact_No"
                      value={listDetails.Contact_No && listDetails.Contact_No}
                      onChange={handleChange}
                    />{" "}
                  </div>
                  <div className=" col-span-1 max-md:col-span-2 flex flex-col  gap-2">
                    <h6 className="font-semibold">Identity No. / Type:</h6>
                    <input
                      type="text"
                      className="text-gray-400 border-1 border-gray-300 px-2 outline-none focus:border-gray-400 h-10 rounded-md w-full"
                      id="Identity_no_and_type"
                      name="Identity_no_and_type"
                      value={
                        listDetails.Identity_no_and_type &&
                        listDetails.Identity_no_and_type
                      }
                      onChange={handleChange}
                    />{" "}
                  </div>
                  <div className=" col-span-1 max-md:col-span-2 flex flex-col  gap-2">
                    <h6 className="font-semibold">Supplier Name:</h6>
                    <input
                      type="text"
                      className="text-gray-400 border-1 border-gray-300 px-2 outline-none focus:border-gray-400 h-10 rounded-md w-full"
                      id="Supplier_name"
                      name="Supplier_name"
                      value={
                        listDetails.Supplier_name && listDetails.Supplier_name
                      }
                      onChange={handleChange}
                    />{" "}
                  </div>
                  <div className=" col-span-1 max-md:col-span-2 flex flex-col  gap-2">
                    <h6 className="font-semibold">Supplier Invoice No:</h6>
                    <input
                      type="text"
                      className="text-gray-400 border-1 border-gray-300 px-2 outline-none focus:border-gray-400 h-10 rounded-md w-full"
                      id="Supplier_invoice_No"
                      name="Supplier_invoice_No"
                      value={
                        listDetails.Supplier_invoice_No &&
                        listDetails.Supplier_invoice_No
                      }
                      onChange={handleChange}
                    />{" "}
                  </div>
                  <div className=" col-span-1 max-md:col-span-2 flex flex-col  gap-2">
                    <h6 className="font-semibold">Quantity Supplied:</h6>
                    <input
                      type="number"
                      className="text-gray-400 border-1 border-gray-300 px-2 outline-none focus:border-gray-400 h-10 rounded-md w-full"
                      id="Quantity_supplied"
                      name="Quantity_supplied"
                      value={
                        listDetails.Quantity_supplied &&
                        listDetails.Quantity_supplied
                      }
                      onChange={handleChange}
                    />{" "}
                  </div>
                  <div className=" col-span-1 max-md:col-span-2 flex flex-col  gap-2">
                    <h6 className="font-semibold">Price</h6>
                    <input
                      type="number"
                      className="text-gray-400 border-1 border-gray-300 px-2 outline-none focus:border-gray-400 h-10 rounded-md w-full"
                      id="Price"
                      name="Price"
                      value={listDetails.Price && listDetails.Price}
                      onChange={handleChange}
                    />{" "}
                  </div>
                  <div className=" col-span-1 max-md:col-span-2 flex flex-col  gap-2">
                    <h6 className="font-semibold">Total amount payable:</h6>
                    <input
                      type="number"
                      className="text-gray-400 border-1 border-gray-300 px-2 outline-none focus:border-gray-400 h-10 rounded-md w-full"
                      id="Total_amount_payable"
                      name="Total_amount_payable"
                      value={
                        listDetails.Total_amount_payable &&
                        listDetails.Total_amount_payable
                      }
                      onChange={handleChange}
                    />{" "}
                  </div>
                  <div className=" col-span-1 max-md:col-span-2 flex flex-col  gap-2">
                    <h6 className="font-semibold">Supplier Amount</h6>
                    <input
                      type="number"
                      className="text-gray-400 border-1 border-gray-300 px-2 outline-none focus:border-gray-400 h-10 rounded-md w-full"
                      id="Amount_to_be_paid_to_Supplier"
                      name="Amount_to_be_paid_to_Supplier"
                      value={
                        listDetails.Amount_to_be_paid_to_Supplier &&
                        listDetails.Amount_to_be_paid_to_Supplier
                      }
                      onChange={handleChange}
                    />{" "}
                  </div>
                  <div className=" col-span-1 max-md:col-span-2 flex flex-col  gap-2">
                    <h6 className="font-semibold">cost of damaged bags:</h6>
                    <input
                      type="text"
                      className="text-gray-400 border-1 border-gray-300 px-2 outline-none focus:border-gray-400 h-10 rounded-md w-full"
                      id="Damage_bags_cost"
                      name="Damage_bags_cost"
                      value={
                        listDetails.Damage_bags_cost &&
                        listDetails.Damage_bags_cost
                      }
                      onChange={handleChange}
                    />{" "}
                  </div>
                  <div className=" col-span-1 max-md:col-span-2 flex flex-col  gap-2">
                    <h6 className="font-semibold">
                      Cash will be collected by:
                    </h6>
                    <input
                      type="text"
                      className="text-gray-400 border-1 border-gray-300 px-2 outline-none focus:border-gray-400 h-10 rounded-md w-full"
                      id="Cash_will_be_collected_by"
                      name="Cash_will_be_collected_by"
                      value={
                        listDetails.Cash_will_be_collected_by &&
                        listDetails.Cash_will_be_collected_by
                      }
                      onChange={handleChange}
                    />{" "}
                  </div>
                  {listDetails.Approve_status === "Pending" && (
                    <>
                      {editLoad ? (
                        <button className="bg-primary-color text-color-dark-font w-32 h-11 mt-5 whitespace-nowrap rounded-lg">
                          <Spin />
                        </button>
                      ) : (
                        <button
                          type="submit"
                          className="bg-primary-color text-color-dark-font w-32 h-11 mt-5 whitespace-nowrap rounded-lg"
                        >
                          Save changes
                        </button>
                      )}
                    </>
                  )}
                </form>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProtectedRoutes(ListEditDetails, ["Super Admin", "Partner"]);
