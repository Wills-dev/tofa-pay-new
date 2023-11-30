import { useRegisterPartner } from "@/hooks/useRegisterPartner";
import { ProtectedRoutes } from "@/utils/ProtectedRoutes";
import { Spin } from "antd";
import { Toaster } from "react-hot-toast";
import { MdDangerous } from "react-icons/md";
import { Link } from "react-router-dom";

const RegisterPartner = () => {
  const {
    loading,
    handleChange,
    partnerRegistrationDetails,
    handleSubmit,
    error,
    handleValidation,
  } = useRegisterPartner();

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
          <div className="flex justify-center items-center  lg:h-full">
            <div className=" h-full w-full max-w-[500px] flex justify-center flex-col  max-sm:px-6">
              <h1 className="text-secondary-color text-4xl font-medium max-md:text-2xl capitalize mt-6">
                Register Partner
              </h1>
              <form
                action=""
                className="flex flex-col gap-6 w-full mt-10"
                onSubmit={handleSubmit}
              >
                <div className="flex flex-col gap-2">
                  <input
                    type="text"
                    name="companyName"
                    value={partnerRegistrationDetails.companyName}
                    onChange={handleChange}
                    id="companyName"
                    className=" h-14 max-sm:h-12 border-1 border-gray-300 rounded-lg focus:border-primary-color outline-none px-3 text-gray-600"
                    placeholder=" Company Name"
                    required
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <input
                    type="text"
                    name="companyInitial"
                    value={partnerRegistrationDetails.companyInitial}
                    onChange={handleChange}
                    className=" h-14 max-sm:h-12 border-1 border-gray-300 rounded-lg focus:border-primary-color outline-none px-3 text-gray-600"
                    placeholder="Company Initial"
                    onKeyUp={handleValidation}
                    required
                  />
                  {error && (
                    <p className="text-red-600 text-xs flex items-center ">
                      <MdDangerous />
                      {error}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <input
                    type="number"
                    name="phoneNumber"
                    value={partnerRegistrationDetails.phoneNumber}
                    onChange={handleChange}
                    id="phone"
                    className=" h-14 max-sm:h-12 border-1 border-gray-300 rounded-lg focus:border-primary-color outline-none px-3 text-gray-600"
                    placeholder="Phone Number"
                    required
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <input
                    type="email"
                    name="email"
                    value={partnerRegistrationDetails.email}
                    onChange={handleChange}
                    id="email"
                    className=" h-14 max-sm:h-12 border-1 border-gray-300 rounded-lg focus:border-primary-color outline-none px-3 text-gray-600"
                    placeholder="Email"
                    required
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <input
                    type="text"
                    name="address"
                    id="address"
                    value={partnerRegistrationDetails.address}
                    onChange={handleChange}
                    className=" h-14 max-sm:h-12 border-1 border-gray-300 rounded-lg focus:border-primary-color outline-none px-3 text-gray-600"
                    placeholder="Address"
                    required
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <select
                    name="currency"
                    id="currency"
                    value={partnerRegistrationDetails.currency}
                    onChange={handleChange}
                    className=" h-14 max-sm:h-12 border-1 border-gray-300 rounded-lg focus:border-primary-color outline-none px-3 text-gray-600"
                  >
                    <option value="selected">Select currency</option>
                    <option value="NGN">NGN</option>
                    <option value="USD">USD</option>
                    <option value="XOF">XOF</option>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                    <option value="GHS">GHS</option>
                  </select>
                </div>

                {loading ? (
                  <button
                    type="button"
                    className="bg-disabled h-14 max-sm:h-12 rounded-lg text-color-dark-font font-semibold cursor-not-allowed"
                  >
                    <Spin wrapperClassName="spinner" />
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
        </div>
      </div>
    </main>
  );
};

export default ProtectedRoutes(RegisterPartner, [
  "TOFA Pay Admin",
  "Super Admin",
]);
