import { axiosInstance } from "@/shared-components/baseUrl";
import { GlobalContext } from "@/utils/GlobalState";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

export const useSignOut = () => {
  const { setUser } = useContext(GlobalContext);
  const navigate = useNavigate();

  const handleSignOut = () => {
    axiosInstance
      .get(`/user/logout`)
      .then((response) => {
        setUser(null);
        localStorage.setItem("user", JSON.stringify(false));
        localStorage.removeItem("token");
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return {
    handleSignOut,
  };
};
