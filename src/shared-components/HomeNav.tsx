import { homePageLinks } from "@/constants";
import { IsActiveType } from "@/types/types";
import { GlobalContext } from "@/utils/GlobalState";
import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";

const HomeNav = () => {
  const { user } = useContext(GlobalContext);

  return (
    <nav className="w-full flex justify-between items-center padding-x shadow-md fixed z-20  bg-main-bg ">
      <div className="">
        <Link to="/">
          <img src="/images/logo.jpg" />
        </Link>
      </div>
      <ul className="flex items-center gap-8">
        {homePageLinks.map((item, index) => (
          <li
            className="font-[500] capitalize hover:text-primary-color text-color-font  max-md:hidden"
            key={index}
          >
            <NavLink
              className={({ isActive }: IsActiveType) =>
                isActive && "text-primary-color"
              }
              to={item.url}
            >
              {item.title}
            </NavLink>
          </li>
        ))}

        <li className="font-[500] capitalize hover:text-primary-color text-color-font max-md:hidden">
          <a href="#contact-us">Contact</a>
        </li>
        {user ? (
          <li className="font-[500] capitalize hover:text-primary-color text-color-font">
            <Link to="/overview">Dashboard</Link>
          </li>
        ) : (
          <li className="font-[500] capitalize hover:text-primary-color text-color-font">
            <Link to="/login">Login</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default HomeNav;
