import { usePostOtp } from "@/hooks/usePostOtp";
import { useResendOtp } from "@/hooks/useResendOtp";
import { Spin } from "antd";
import { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";

const ForgotPasswordOtp = () => {
  const email = localStorage.getItem("email");
  const userId = localStorage.getItem("userId");
  const { otp, handleOtp, handleOtpSubmit, loading } = usePostOtp();
  const { loadingOtp, handleResendOtp } = useResendOtp();

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
                Please enter the OTP sent to {email}.
              </p>
              <form
                action=""
                className="flex flex-col gap-6 w-full mt-10"
                onSubmit={(e) => handleOtpSubmit(e, userId)}
              >
                <div className="flex flex-col gap-2">
                  <input
                    type="number"
                    value={otp}
                    name="otp"
                    onChange={handleOtp}
                    className=" h-14 max-sm:h-12 border-1 border-gray-300 rounded-lg focus:border-primary-color outline-none px-3 text-gray-600"
                    placeholder="Enter otp"
                  />
                  <div className="flex items-center  gap-2 text-sm">
                    <p className="text-gray-500">Didn't receive the OTP? </p>
                    {loadingOtp ? (
                      <button className="hover:underline text-disabled">
                        Click here to resend.
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="hover:underline text-primary-color"
                        onClick={(e) => handleResendOtp(e, email)}
                      >
                        Click here to resend.
                      </button>
                    )}
                  </div>
                </div>

                {loading ? (
                  <button
                    type="button"
                    className="bg-disabled  h-14 max-sm:h-12 rounded-lg text-color-dark-font  font-semibold "
                  >
                    <Spin wrapperClassName="spinner" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="bg-primary-color h-14 max-sm:h-12 rounded-lg text-color-dark-font font-semibold hover:bg-secondary-color cursor-not-allowed"
                  >
                    Submit OTP
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

export default ForgotPasswordOtp;
