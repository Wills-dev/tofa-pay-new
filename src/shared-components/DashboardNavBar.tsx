import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";

import { Tooltip, Skeleton } from "antd";
import { MdKeyboardArrowDown } from "react-icons/md";
import { RiNotification3Line } from "react-icons/ri";
import { AiOutlineMenu } from "react-icons/ai";
import { FiSettings } from "react-icons/fi";
import { BiLogOut } from "react-icons/bi";

import { AppContext } from "@/utils/AppState";
import { useSignOut } from "@/hooks/useSignOut";
import { GlobalContext } from "@/utils/GlobalState";
import DashboardNavLoader from "./SkeletonLoader/DashboardNavLoader";

const DashboardNavBar = () => {
  const { setActiveMenu, screenSize, setScreenSize } = useContext(AppContext);
  const { user, userLoading } = useContext(GlobalContext);
  const { handleSignOut } = useSignOut();

  useEffect(() => {
    const handleReSize = () => setScreenSize(window.innerWidth);

    window.addEventListener("resize", handleReSize);

    handleReSize();

    return () => window.removeEventListener("resize", handleReSize);
  }, []);

  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  return (
    <div className="flex justify-between p-2 md:mx-6 relative">
      <Tooltip title="Menu">
        <button
          type="button"
          onClick={() => setActiveMenu((prev: any) => !prev)}
          className="relative text-xl rounded-full p-3 hover:bg-light-gray hover:shadow-md"
        >
          <AiOutlineMenu />
        </button>
      </Tooltip>

      {userLoading ? (
        <DashboardNavLoader />
      ) : (
        <div className="flex">
          <Tooltip title="Chat with us">
            <a
              href="https://wa.me/+2349166417373"
              target="_blank"
              rel="noopener noreferrer"
              className="relative text-xl  rounded-full p-3 hover:bg-light-gray hover:shadow-md"
            >
              <img
                src="/images/whatsapp.png"
                alt="whatsapp logo"
                className="w-[20px]"
              />
            </a>
          </Tooltip>
          <Tooltip title="Notification">
            <button
              type="button"
              onClick={() => {}}
              className="relative text-xl rounded-full p-3 hover:bg-light-gray hover:shadow-md"
            >
              <span className="absolute inline-flex  rounded-full h-2 w-2  right-2 top-2 bg-primary-color" />
              <RiNotification3Line />
            </button>
          </Tooltip>
          <Tooltip title="Settings">
            <Link
              to="/profile"
              onClick={() => {}}
              className="relative text-xl rounded-full p-3 hover:bg-light-gray hover:shadow-md"
            >
              <FiSettings />
            </Link>
          </Tooltip>
          <Tooltip title="Logout">
            <button
              onClick={handleSignOut}
              className="relative text-xl rounded-full text-red-400  p-3 hover:bg-light-gray hover:shadow-md"
            >
              <BiLogOut />
            </button>
          </Tooltip>

          <Tooltip title="Profile">
            <Link
              to="/profile"
              className="flex items-center gap-2 cursor-pointer hover:bg-light-gray hover:shadow-md px-2 rounded-lg"
            >
              <p>
                <span className="text-gray-400 text-14">Hi,</span>{" "}
                <span className="text-gray-400 font-bold ml-1 text-14">
                  {user?.firstName}
                </span>
              </p>
              <MdKeyboardArrowDown className="text-gray-400 text-14" />
            </Link>
          </Tooltip>
        </div>
      )}
    </div>
  );
};

export default DashboardNavBar;
