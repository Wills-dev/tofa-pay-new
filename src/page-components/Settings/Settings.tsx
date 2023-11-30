import { Capitalize } from "@/helpers/helperFunctions";
import useChangePassword from "@/hooks/useChangePassword";
import DashboardNavBar from "@/shared-components/DashboardNavBar";
import Header from "@/shared-components/Header";
import { Sidebar } from "@/shared-components/Sidebar";
import { AppContext } from "@/utils/AppState";
import { GlobalContext } from "@/utils/GlobalState";
import { ProtectedRoutes } from "@/utils/ProtectedRoutes";
import { Spin } from "antd";
import { useContext, useState } from "react";
import { Toaster } from "react-hot-toast";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { MdDangerous } from "react-icons/md";

const Settings = () => {
  const { activeMenu } = useContext(AppContext);
  const { user, userLoading } = useContext(GlobalContext);
  const [active, setActive] = useState<boolean>(true);

  const {
    handleUserPasswordChange,
    oldPasswordInputType,
    handlePasswordChange,
    editPassword,
    setOldPasswordInputType,
    inputType,
    handleValidation,
    setInputType,
    passwordError,
    confirmInputType,
    setConfirmInputType,
    confirmPasswordError,
    passLoader,
  } = useChangePassword();

  return (
    <div className={` bg-main-bg min-h-screen  flex-1 w-full`}>
      {" "}
      <Toaster />
      <div className={`${activeMenu ? ` md:ml-72 ` : `flex-2`}`}>
        <div className="fixed md:static bg-main-bg navbar w-full">
          <DashboardNavBar />
        </div>
        <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl pt-20 max-sm:mt-0">
          <Header category="My Profile" title="Settings" />
          <>
            <div className="mt-16 ">
              <div className="flex items-center gap-3">
                <h4
                  className={`text-gray-500 font-medium capitalize text-xl cursor-pointer ${
                    active && "text-primary-color"
                  }`}
                  onClick={() => setActive(true)}
                >
                  Profile details
                </h4>
                <h4
                  className={`text-gray-500 font-medium capitalize text-xl cursor-pointer ${
                    !active && "text-primary-color "
                  }`}
                  onClick={() => setActive(false)}
                >
                  Security
                </h4>
              </div>
              {!active ? (
                <div className="mt-12 shadow rounded-md max-w-[600px] p-6 max-sm:px-2">
                  <h4 className="text-gray-600 font-medium text-xl">
                    Change password
                  </h4>
                  <p className="text-gray-400 text-sm">
                    Choose a new password, something easy to remember.
                  </p>
                  <form
                    onSubmit={handleUserPasswordChange}
                    className="mt-10 flex flex-col gap-4"
                  >
                    <div className="flex flex-col gap-2">
                      <label htmlFor="password" className="text-base">
                        Old Password
                      </label>
                      <div className="flex justify-between h-14 max-sm:h-12 border-1 border-gray-300 rounded-lg focus-within:border-primary-color px-3  text-gray-600 text-base items-center">
                        <input
                          type={oldPasswordInputType}
                          name="currentPassword"
                          id="password"
                          value={editPassword.currentPassword}
                          onChange={handlePasswordChange}
                          required
                          className=" outline-none  flex-1 h-full"
                        />
                        <div className="block text-2xl">
                          {oldPasswordInputType === "text" ? (
                            <span
                              onClick={() =>
                                setOldPasswordInputType("password")
                              }
                            >
                              <AiFillEyeInvisible />
                            </span>
                          ) : (
                            <span
                              onClick={() => setOldPasswordInputType("text")}
                            >
                              <AiFillEye />{" "}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label htmlFor="email" className="text-base">
                        New Password
                      </label>
                      <div className="flex justify-between h-14 max-sm:h-12 border-1 border-gray-300 rounded-lg focus-within:border-primary-color px-3  text-gray-600 text-base items-center">
                        <input
                          type={inputType}
                          name="newPassword"
                          id="password"
                          value={editPassword.newPassword}
                          onChange={handlePasswordChange}
                          onKeyUp={handleValidation}
                          required
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
                        Confirm New Password
                      </label>
                      <div className="flex justify-between h-14 max-sm:h-12 border-1 border-gray-300 rounded-lg focus-within:border-primary-color px-3  text-gray-600 text-base items-center">
                        <input
                          type={confirmInputType}
                          name="confirmPassword"
                          id="password"
                          value={editPassword.confirmPassword}
                          onChange={handlePasswordChange}
                          onKeyUp={handleValidation}
                          required
                          className=" outline-none  flex-1 h-full"
                        />
                        <div className="block text-2xl">
                          {confirmInputType === "text" ? (
                            <span
                              onClick={() => setConfirmInputType("password")}
                            >
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
                    {passLoader ? (
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
                        Save
                      </button>
                    )}
                  </form>
                </div>
              ) : (
                <div className="mt-12 shadow rounded-md max-w-[600px] p-6 max-sm:px-2 flex flex-col gap-4">
                  <div className="  max-md:col-span-2 flex items-center gap-2">
                    <h6 className="font-semibold w-40"> First Name</h6>
                    <p className="text-gray-400 flex-1">
                      {" "}
                      {user.firstName && Capitalize(user.firstName)}
                    </p>
                  </div>
                  <div className="  max-md:col-span-2 flex items-center gap-2">
                    <h6 className="font-semibold w-40"> Last Name</h6>
                    <p className="text-gray-400 flex-1">
                      {" "}
                      {user.lastName && Capitalize(user.lastName)}
                    </p>
                  </div>
                  <div className="  max-md:col-span-2 flex items-center gap-2">
                    <h6 className="font-semibold w-40"> Phone No.</h6>
                    <p className="text-gray-400 flex-1">
                      {" "}
                      {user.phone && user.phone}
                    </p>
                  </div>
                  <div className="  max-md:col-span-2 flex items-center gap-2">
                    <h6 className="font-semibold w-40"> Email</h6>
                    <p className="text-gray-400 flex-1">
                      {" "}
                      {user.email && user.email.toLowerCase()}
                    </p>
                  </div>
                  <div className="  max-md:col-span-2 flex items-center gap-2">
                    <h6 className="font-semibold w-40">Role</h6>
                    <p className="text-gray-400 flex-1">
                      {" "}
                      {user.role && Capitalize(user.role)}
                    </p>
                  </div>
                  <div className="  max-md:col-span-2 flex items-center gap-2">
                    <h6 className="font-semibold w-40">Company Name</h6>
                    <p className="text-gray-400 flex-1">
                      {" "}
                      {user.companyName && Capitalize(user.companyName)}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </>
        </div>
      </div>
    </div>
  );
};

export default ProtectedRoutes(Settings, [
  "TOFA Pay Admin",
  "Finance",
  "Agent",
  "Compliance",
  "Partner Agents",
  "Super Admin",
  "Partner",
]);
