import { dashboardLinks } from "@/constants";
import { AppContext } from "@/utils/AppState";
import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";

import { MdOutlineCancel } from "react-icons/md";
import { BiLogOut } from "react-icons/bi";
import { useSignOut } from "@/hooks/useSignOut";

export const Sidebar = () => {
  const { activeMenu, setActiveMenu, screenSize, currentColor } =
    useContext(AppContext);
  const { handleSignOut } = useSignOut();

  const handleCloseSideBar = () => {
    if (activeMenu && screenSize <= 900) {
      setActiveMenu(false);
    }
  };

  const activeLink = `flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-white text-md m-2  bg-primary-color`;

  const normalLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-gray-700 text-md dark:hover:text-black hover:bg-light-gray m-2";

  return (
    <>
      <div
        className={` w-72 fixed sidebar bg-white  ${
          activeMenu ? "translate-x-0" : "-translate-x-72"
        }`}
      >
        <div className=" ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10">
          {activeMenu && (
            <>
              <div className="flex justify-between items-center">
                <Link
                  to="/"
                  onClick={handleCloseSideBar}
                  className={`first-letter:first-line:items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight `}
                >
                  <>TOFAPAY</>
                </Link>
                {/* <TooltipComponent content="Menu" position="BottomCenter"> */}
                <button
                  type="button"
                  onClick={() => setActiveMenu((prev: any) => !prev)}
                  className="text-xl rounded-full hover:bg-light-gray mt-4 mr-2 block md:hidden"
                >
                  <MdOutlineCancel />
                </button>
                {/* </TooltipComponent> */}
              </div>
              <div className="mt-10">
                {dashboardLinks.map((items, index) => (
                  <div key={index}>
                    <p className="text-gray-400 m-3 mt-4 ">{items.title}</p>
                    {items.links.map((link) => (
                      <NavLink
                        to={`/${link.link}`}
                        key={link.name}
                        onClick={handleCloseSideBar}
                        style={({ isActive }) => ({
                          backgroundColor: isActive && currentColor,
                        })}
                        className={({ isActive }) =>
                          isActive ? activeLink : normalLink
                        }
                      >
                        {link.icon}
                        <span className="capitalize">{link.name}</span>
                      </NavLink>
                    ))}
                  </div>
                ))}
                <div className="mt-8 ">
                  <button
                    onClick={handleSignOut}
                    className=" text-red-400 mx-2 mt-4 flex items-center w-full  hover:bg-light-gray  pt-3 pb-2.5 pl-4 rounded-lg "
                  >
                    <BiLogOut />
                    <span className="ml-2">Logout</span>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};
