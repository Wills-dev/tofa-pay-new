import { createContext, useState } from "react";

export const AppContext = createContext<any>(null);

type Props = {
  children: React.ReactNode;
};

const AppState = ({ children }: Props) => {
  const [user, setUser] = useState("");
  const [userLoading, setUserLoading] = useState(true);
  const [activeMenu, setActiveMenu] = useState(true);
  const [screenSize, setScreenSize] = useState(undefined);

  const value = {
    user,
    userLoading,
    setUser,
    setUserLoading,
    activeMenu,
    setActiveMenu,
    screenSize,
    setScreenSize,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppState;
