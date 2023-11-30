import { GlobalContext } from "@/utils/GlobalState";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { LoginDetailsType } from "@/types/types";
import { axiosInstance } from "@/shared-components/baseUrl";

export const useLogin = () => {
  const [passwordInputType, setPasswordInputType] = useState<
    "password" | "text"
  >("password");
  const { setUser } = useContext(GlobalContext);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [loginDetail, setLoginDetail] = useState<LoginDetailsType>({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginDetail({ ...loginDetail, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    try {
      const loginDetails = {
        email: loginDetail.email,
        password: loginDetail.password,
      };
      const data = await axiosInstance.post("/user/user-login", loginDetails);
      setUser(data.data.User);
      localStorage.setItem("token", data.data.signature);
      localStorage.setItem("user", JSON.stringify(true));
      navigate("/overview");
      setLoading(false);
    } catch (err: any) {
      setLoading(false);
      if (!err.response.data.Error) {
        toast.error("Network Error! Please try again", {
          duration: 4000,
          style: {
            background: "#353434",
            color: "#fff",
          },
        });
      }
      if (err) {
        setError(err.response.data.Error);
        console.log(err);
      }
    }
  };
  return {
    handleSubmit,
    error,
    passwordInputType,
    setPasswordInputType,
    loginDetail,
    loading,
    handleChange,
  };
};
