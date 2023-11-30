import { useForgotPassword } from "@/hooks/useForgotPassword";
import { Spin } from "antd";
import { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const { handleSubmit, handleEmail, email, loading } = useForgotPassword();

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
                Recover password{" "}
              </h1>
              <p className="text-gray-500 mt-2 max-sm:text-sm">
                Please enter the email associated with your account, and we'll
                send you a verification code to reset your password.
              </p>
              <form
                action=""
                className="flex flex-col gap-6 w-full mt-10"
                onSubmit={handleSubmit}
              >
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-base">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    name="email"
                    onChange={handleEmail}
                    id="email"
                    className=" h-14 max-sm:h-12 border-1 border-gray-300 rounded-lg focus:border-primary-color outline-none px-3 text-gray-600"
                  />
                  <div className="flex items-center gap-2">
                    <p className="text-gray-500">Remember your password?</p>
                    <Link
                      to="/login"
                      className="hover:underline text-primary-color"
                    >
                      Login
                    </Link>
                  </div>
                </div>

                {loading ? (
                  <button
                    type="button"
                    className="bg-disabled  h-14 max-sm:h-12 rounded-lg text-color-dark-font font-semibold cursor-not-allowed"
                  >
                    <Spin wrapperClassName="spinner" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="bg-primary-color h-14 max-sm:h-12 rounded-lg text-color-dark-font font-semibold hover:bg-secondary-color"
                  >
                    Reset password
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

export default ForgotPassword;
