import { axiosInstance } from "@/shared-components/baseUrl";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const usePostOtp = () => {
  const [otp, setOtp] = useState<any>("");
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleOtp = (e: React.ChangeEvent<HTMLInputElement>) => {
    const otpValue = parseInt(e.target.value, 10);
    setOtp(otpValue);
  };

  const handleOtpSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    userId: string | null
  ) => {
    e.preventDefault();
    setLoading(true);
    try {
      const forgotPasswordOtp = {
        otp: otp,
      };
      await axiosInstance.post(`/user/verify-otp/${userId}`, forgotPasswordOtp);
      setOtp("");
      toast.success(
        `Congratulations! Your OTP has been confirmed successfully.`,
        {
          duration: 4000,
          style: {
            background: "#353434",
            color: "#fff",
          },
        }
      );
      localStorage.removeItem("email");
      setTimeout(() => {
        navigate(`/reset-password`);
      }, 3000);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      console.log(error);
      if (error.response.data.message) {
        toast.error(`${error.response.data.message}`, {
          duration: 4000,
          style: {
            background: "#353434",
            color: "#fff",
          },
        });
      } else if (error.response.data.Error === "Kindly login") {
        navigate("/login");
      } else if (error.response.data.Error) {
        toast.error(`${error.response.data.Error}`, {
          duration: 4000,
          style: {
            background: "#353434",
            color: "#fff",
          },
        });
      } else if (error.response.data.error) {
        toast.error(`${error.response.data.error}`, {
          duration: 4000,
          style: {
            background: "#353434",
            color: "#fff",
          },
        });
      } else if (
        !error.response.data.Error ||
        !error.response.data.error ||
        !error.response.data.message
      ) {
        return navigate(`/no-connection`);
      }
    }
  };

  return {
    otp,
    handleOtp,
    handleOtpSubmit,
    loading,
  };
};
