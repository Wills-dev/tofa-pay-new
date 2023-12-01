import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";

import toast, { Toaster } from "react-hot-toast";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { MdDangerous } from "react-icons/md";
import { Spin } from "antd";

import { axiosInstance } from "@/shared-components/baseUrl";
import { useLogin } from "@/hooks/useLogin";

const Login = () => {
  const { userId } = useParams();
  const {
    handleSubmit,
    error,
    passwordInputType,
    setPasswordInputType,
    loginDetail,
    loading,
    handleChange,
  } = useLogin();

  useMemo(() => {
    (async () => {
      if (userId) {
        await axiosInstance.get(`/user/user-verify/${userId}`);
        toast.success(
          "Your email was successfully verified. Login with the details provided in your email.",
          {
            duration: 4000,
            style: {
              background: "#353434",
              color: "#fff",
            },
          }
        );
      }
    })();
  }, [userId]);

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
                Welcome back!{" "}
              </h1>
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
                    name="email"
                    id="email"
                    value={loginDetail.email}
                    onChange={handleChange}
                    className=" h-14 max-sm:h-12 border-1 border-gray-300 rounded-lg focus:border-primary-color outline-none px-3 text-gray-600"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-base">
                    Password
                  </label>
                  <div className="flex justify-between h-14 max-sm:h-12 border-1 border-gray-300 rounded-lg focus-within:border-primary-color px-3  text-gray-600 text-base items-center">
                    <input
                      type={passwordInputType}
                      name="password"
                      id="password"
                      value={loginDetail.password}
                      onChange={handleChange}
                      className=" outline-none  flex-1 h-full"
                    />
                    <div className="block text-2xl">
                      {passwordInputType === "text" ? (
                        <span onClick={() => setPasswordInputType("password")}>
                          <AiFillEyeInvisible />
                        </span>
                      ) : (
                        <span onClick={() => setPasswordInputType("text")}>
                          <AiFillEye />{" "}
                        </span>
                      )}
                    </div>
                  </div>
                  {error && (
                    <p className="text-red-600 text-xs flex items-center ">
                      <MdDangerous />
                      {error}
                    </p>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name=""
                      id="remember-me"
                      className="checked:bg-blue-200 border-1 border-primary-color"
                    />
                    <label htmlFor="remember-me" className="text-base">
                      Remember me
                    </label>
                  </div>
                  <Link
                    to="/forgot-password"
                    className="underline hover:text-primary-color"
                  >
                    Forgot password?
                  </Link>
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
                    Login
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

export default Login;
