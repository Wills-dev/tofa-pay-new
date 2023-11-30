import { axiosInstance } from "@/shared-components/baseUrl";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { registerDetailsType } from "@/types/types";

export const useRegisterUser = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [successMsg, setSuccessMsg] = useState<boolean>(false);
  const [registerDetail, setRegisterDetail] = useState<registerDetailsType>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    country: "",
    role: "",
    company: "",
  });

  const navigate = useNavigate();

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    setRegisterDetail({ ...registerDetail, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!registerDetail.firstName) {
      toast.error(`Please enter first name`, {
        duration: 4000,
        style: {
          background: "#353434",
          color: "#fff",
        },
      });
    } else if (!registerDetail.lastName) {
      toast.error(`Please enter last name`, {
        duration: 4000,
        style: {
          background: "#353434",
          color: "#fff",
        },
      });
    } else if (!registerDetail.email) {
      toast.error(`Please enter email address`, {
        duration: 4000,
        style: {
          background: "#353434",
          color: "#fff",
        },
      });
    } else if (!registerDetail.phoneNumber) {
      toast.error(`Please enter phone number`, {
        duration: 4000,
        style: {
          background: "#353434",
          color: "#fff",
        },
      });
    } else if (!registerDetail.country) {
      toast.error(`Please enter country`, {
        duration: 4000,
        style: {
          background: "#353434",
          color: "#fff",
        },
      });
    } else if (!registerDetail.role || registerDetail.role === "selected") {
      toast.error(`Please enter user role`, {
        duration: 4000,
        style: {
          background: "#353434",
          color: "#fff",
        },
      });
    } else if (
      !registerDetail.company ||
      registerDetail.company === "selected"
    ) {
      toast.error(`Please enter user company`, {
        duration: 4000,
        style: {
          background: "#353434",
          color: "#fff",
        },
      });
    } else {
      setLoading(true);
      try {
        const userRegistration = {
          firstName: registerDetail.firstName,
          lastName: registerDetail.lastName,
          email: registerDetail.email,
          phone: registerDetail.phoneNumber,
          country: registerDetail.country,
          role: registerDetail.role,
          companyName: registerDetail.company,
          companyInitial: registerDetail.company,
        };
        await axiosInstance.post(`/user/user-signup`, userRegistration);
        setSuccessMsg(true);
        setLoading(false);
        toast.success(
          "You have successfully registered this user. A link has been sent to their email for verification.",
          {
            duration: 4000,
            style: {
              background: "#353434",
              color: "#fff",
            },
          }
        );
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
    registerDetail,
    handleSubmit,
    handleChange,
    successMsg,
    loading,
  };
};
