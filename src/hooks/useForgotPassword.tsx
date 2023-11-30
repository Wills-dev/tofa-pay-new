import { axiosInstance } from "@/shared-components/baseUrl";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useForgotPassword = () => {
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) {
      toast.error(`Please enter your email address`, {
        duration: 4000,
        style: {
          background: "#353434",
          color: "#fff",
        },
      });
    } else {
      setLoading(true);

      try {
        const forgotPassword = {
          email: email,
        };
        const data = await axiosInstance.post(
          `/user/forgot-password`,
          forgotPassword
        );

        localStorage.setItem("email", email);
        localStorage.setItem("userId", data.data.id);
        localStorage.setItem("token", data.data.token);
        toast.success(
          `We've just sent a password reset link to ${email}. Please check your email to proceed with resetting your password.`,
          {
            duration: 4000,
            style: {
              background: "#353434",
              color: "#fff",
            },
          }
        );

        setEmail("");

        setTimeout(() => {
          navigate(`/forgot-password/otp`);
        }, 4800);
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
    }
  };
  return {
    handleSubmit,
    handleEmail,
    email,
    loading,
  };
};
