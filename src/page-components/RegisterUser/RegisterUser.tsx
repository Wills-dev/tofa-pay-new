import { useGetAllPartner } from "@/hooks/useGetAllPartner";
import { useRegisterUser } from "@/hooks/useRegisterUser";
import { Spin } from "antd";
import { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import { PartnerType } from "@/types/types";
import { ProtectedRoutes } from "@/utils/ProtectedRoutes";

const RegisterUser = () => {
  const { registerDetail, handleSubmit, handleChange, successMsg, loading } =
    useRegisterUser();
  const { allPartner } = useGetAllPartner();

  return (
    <main className="w-full h-screen ">
      <Toaster />
      <div className="flex w-full h-screen">
        <div className="flex-1 h-full w-full bg-auth-banner bg-center bg-cover bg-no-repeat max-lg:hidden">
          <Link to="/">
            <img src="/images/logo.jpg" alt="tofa logo" className="ml-4" />
          </Link>
        </div>
        <div className="flex-1 h-full w-full ">
          <Link to="/" className=" lg:hidden">
            <img src="/images/logo.jpg" alt="tofa logo" className="ml-4" />
          </Link>
          {successMsg ? (
            <div className="mt-6 w-full">
              <div className="flex items-center justify-center flex-col gap-4  h-[80vh]">
                <h4 className="text-2xl font-semibold text-center">
                  Congratulations!
                </h4>
                <p className="text-gray-500 max-w-[550px] text-center">
                  {" "}
                  {registerDetail.firstName} {registerDetail.lastName} has been
                  successfully registered. Kindly inform them to check their
                  email ({registerDetail.email}) for verification. Thank you for
                  your assistance!
                </p>
                <Link
                  to="/overview"
                  className="bg-primary-color  text-color-dark-font px-5 py-2 rounded hover:bg-secondary-color whitespace-nowrap"
                >
                  Return to Dashboard
                </Link>
              </div>
            </div>
          ) : (
            <div className="flex justify-center items-center  lg:h-full">
              <div className=" h-full w-full max-w-[500px] flex justify-center flex-col  max-sm:px-6">
                <h1 className="text-secondary-color text-4xl font-medium max-md:text-2xl capitalize mt-6">
                  Register User
                </h1>
                <form
                  action=""
                  className="flex flex-col gap-6 w-full mt-10"
                  onSubmit={handleSubmit}
                >
                  <div className="flex flex-col gap-2">
                    <input
                      type="text"
                      name="firstName"
                      value={registerDetail.firstName}
                      onChange={handleChange}
                      className=" h-14 max-sm:h-12 border-1 border-gray-300 rounded-lg focus:border-primary-color outline-none px-3 text-gray-600"
                      placeholder=" First Name"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <input
                      type="text"
                      name="lastName"
                      value={registerDetail.lastName}
                      onChange={handleChange}
                      className=" h-14 max-sm:h-12 border-1 border-gray-300 rounded-lg focus:border-primary-color outline-none px-3 text-gray-600"
                      placeholder="Last Name"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <input
                      type="number"
                      name="phoneNumber"
                      value={registerDetail.phoneNumber}
                      onChange={handleChange}
                      className=" h-14 max-sm:h-12 border-1 border-gray-300 rounded-lg focus:border-primary-color outline-none px-3 text-gray-600"
                      placeholder="Phone Number"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <input
                      type="email"
                      name="email"
                      value={registerDetail.email}
                      onChange={handleChange}
                      className=" h-14 max-sm:h-12 border-1 border-gray-300 rounded-lg focus:border-primary-color outline-none px-3 text-gray-600"
                      placeholder="Email"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <input
                      type="text"
                      name="country"
                      value={registerDetail.country}
                      onChange={handleChange}
                      className=" h-14 max-sm:h-12 border-1 border-gray-300 rounded-lg focus:border-primary-color outline-none px-3 text-gray-600"
                      placeholder="Country"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <select
                      name="role"
                      value={registerDetail.role}
                      onChange={handleChange}
                      className=" h-14 max-sm:h-12 border-1 border-gray-300 rounded-lg focus:border-primary-color outline-none px-3 text-gray-600"
                    >
                      <option defaultValue="selected">Select User Role</option>
                      <option value="Super Admin">Super Admin</option>
                      <option value="TOFA Pay Admin">TOFA Admin</option>
                      <option value="Finance">TOFA Finance</option>
                      <option value="Agent">TOFA Agent</option>
                      <option value="Partner">Partner</option>
                      <option value="Partner Agents">Partner Agent</option>
                      <option value="Compliance">Compliance</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    {registerDetail.role === "Partner" ||
                    registerDetail.role === "Partner Agents" ? (
                      <select
                        name="company"
                        value={registerDetail.company}
                        onChange={handleChange}
                        className=" h-14 max-sm:h-12 border-1 border-gray-300 rounded-lg focus:border-primary-color outline-none px-3 text-gray-600"
                      >
                        <option defaultValue="selected">Select Company</option>
                        {allPartner?.map(
                          (partner: PartnerType, index: number) => (
                            <option
                              key={index}
                              value={
                                partner?.companyInitial &&
                                partner?.companyInitial
                              }
                            >
                              {partner?.companyInitial &&
                                partner?.companyInitial}
                            </option>
                          )
                        )}
                      </select>
                    ) : (
                      <select
                        name="company"
                        value={registerDetail.company}
                        onChange={handleChange}
                        className=" h-14 max-sm:h-12 border-1 border-gray-300 rounded-lg focus:border-primary-color outline-none px-3 text-gray-600"
                      >
                        <option defaultValue="selected">Select Company</option>
                        <option value="TOFA">TOFA</option>
                      </select>
                    )}
                  </div>

                  {loading ? (
                    <button className="bg-disabled h-14 max-sm:h-12 rounded-lg text-color-dark-font font-semibold cursor-not-allowed">
                      <Spin />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="bg-primary-color h-14 max-sm:h-12 rounded-lg text-color-dark-font font-semibold hover:bg-secondary-color"
                    >
                      Register
                    </button>
                  )}
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default ProtectedRoutes(RegisterUser, ["TOFA Pay Admin", "Super Admin"]);
