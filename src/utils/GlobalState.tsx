import { useEffect, useState, createContext } from "react";
import { axiosInstance } from "../shared-components/baseUrl";

export const GlobalContext = createContext<any>(null);

type Props = {
  children: React.ReactNode;
};

const GlobalState = ({ children }: Props) => {
  const [userLoading, setUserLoading] = useState<boolean>(false);
  const [user, setUser] = useState<Record<string, any> | null>({});

  const getUser = () => {
    axiosInstance
      .get(`/user/current-user`)
      .then((response: any) => {
        setUser(response.data.User);
        setUserLoading(false);
      })
      .catch((error: any) => {
        setUserLoading(false);
        setUser(null);
        localStorage.removeItem("token");
        localStorage.setItem("user", JSON.stringify(false));
      });
  };

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("user");
    if (isLoggedIn) {
      const parsedUser = JSON.parse(isLoggedIn);
      setUserLoading(true);
      setUser(parsedUser);
      getUser();
    }
  }, []);

  const value = {
    user,
    setUser,
    userLoading,
  };
  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};

export default GlobalState;
