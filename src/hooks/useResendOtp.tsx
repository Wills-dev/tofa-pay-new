import { axiosInstance } from "@/shared-components/baseUrl";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useResendOtp = () => {
  const [loadingOtp, setLoadingOtp] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleResendOtp = async (
    e: React.MouseEvent<HTMLButtonElement>,
    email: string | null
  ) => {
    e.preventDefault();
    setLoadingOtp(true);
    try {
      await axiosInstance.post(
        `/user/resend-otp
            `,
        {
          email: email,
        }
      );
      toast.success(
        `A new OTP has been resent to ${email}. Please check your email for the latest verification code.`,
        {
          duration: 4000,
          style: {
            background: "#353434",
            color: "#fff",
          },
        }
      );
      setLoadingOtp(false);
    } catch (error: any) {
      setLoadingOtp(false);
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
  return { loadingOtp, handleResendOtp };
};
