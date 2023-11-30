import { useResetPassword } from "@/hooks/useResetPassword";
import { Spin } from "antd";
import { Toaster } from "react-hot-toast";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { MdDangerous } from "react-icons/md";
import { Link } from "react-router-dom";

const ResetPassword = () => {
  const {
    handleSubmit,
    inputType,
    passwordInput,
    handlePasswordChange,
    handleValidation,
    passwordError,
    confirmInputType,
    confirmPasswordError,
    setConfirmInputType,
    loading,
    setInputType,
  } = useResetPassword();
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
                Change Password
              </h1>
              <p className="text-gray-500 mt-2 max-sm:text-sm">
                Input your new desired password in the input fields below to
                create a new password. We strongly advise you to store it
                safely.
              </p>
              <form
                action=""
                className="flex flex-col gap-6 w-full mt-10"
                onSubmit={handleSubmit}
              >
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-base">
                    Enter new password
                  </label>
                  <div className="flex justify-between h-14 max-sm:h-12 border-1 border-gray-300 rounded-lg focus-within:border-primary-color px-3  text-gray-600 text-base items-center">
                    <input
                      type={inputType}
                      name="password"
                      value={passwordInput.password}
                      onChange={handlePasswordChange}
                      onKeyUp={handleValidation}
                      className=" outline-none  flex-1 h-full"
                    />
                    <div className="block text-2xl">
                      {inputType === "text" ? (
                        <span onClick={() => setInputType("password")}>
                          <AiFillEyeInvisible />
                        </span>
                      ) : (
                        <span onClick={() => setInputType("text")}>
                          <AiFillEye />{" "}
                        </span>
                      )}
                    </div>
                  </div>
                  {passwordError && (
                    <p className="text-red-600 text-xs flex items-center ">
                      <MdDangerous />
                      {passwordError}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-base">
                    Confirm new password
                  </label>
                  <div className="flex justify-between h-14 max-sm:h-12 border-1 border-gray-300 rounded-lg focus-within:border-primary-color px-3  text-gray-600 text-base items-center">
                    <input
                      type={confirmInputType}
                      name="confirmPassword"
                      value={passwordInput.confirmPassword}
                      onChange={handlePasswordChange}
                      onKeyUp={handleValidation}
                      className=" outline-none  flex-1 h-full"
                    />
                    <div className="block text-2xl">
                      {confirmInputType === "text" ? (
                        <span onClick={() => setConfirmInputType("password")}>
                          <AiFillEyeInvisible />
                        </span>
                      ) : (
                        <span onClick={() => setConfirmInputType("text")}>
                          <AiFillEye />{" "}
                        </span>
                      )}
                    </div>
                  </div>
                  {confirmPasswordError && (
                    <p className="text-red-600 text-xs flex items-center ">
                      <MdDangerous />
                      {confirmPasswordError}
                    </p>
                  )}
                </div>

                {loading ? (
                  <button
                    type="button"
                    className="bg-disabled h-14 max-sm:h-12 rounded-lg text-color-dark-font font-semibold "
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

export default ResetPassword;
