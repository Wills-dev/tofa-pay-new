import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../shared-components/baseUrl";
import { AppContext } from "./AppState";
import { Spin } from "antd";

export const ProtectedRoutes = (WrappedComponent: any, roles: any) => {
  return (props: any) => {
    const navigate = useNavigate();
    const [verified, setVerified] = useState(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const { setUser, activeMenu } = useContext(AppContext);

    useEffect(() => {
      axiosInstance
        .get(`/user/current-user`)
        .then((response) => {
          const user = response?.data?.User;
          setUser(user);

          if (!roles && user) {
            setIsLoading(false);
            return setVerified(true);
          }

          const filterRoles = roles.filter((role: string) => {
            return role === user?.role;
          });

          if (filterRoles.length > 0) {
            setIsLoading(false);
            setVerified(true);
          } else {
            setVerified(false);
            navigate("/unauthorized");
          }
        })
        .catch((error) => {
          console.log(error);
          navigate("/login");
        });
    }, [setUser]);

    if (isLoading) {
      return (
        <div
          className={`${
            activeMenu && "pl-72"
          } h-screen grid place-items-center  w-screen  bg-main-bg`}
        >
          <div className="spinner-2 flex flex-col gap-2">
            <p className="text-gray-400">Loading...</p>
            <Spin />
          </div>
        </div>
      );
    }

    if (verified) {
      return <WrappedComponent {...props} />;
    } else {
      return null;
    }
  };
};
