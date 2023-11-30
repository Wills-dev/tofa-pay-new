import { axiosInstance } from "@/shared-components/baseUrl";
import { ContactUsType } from "@/types/types";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const usePostContactMessage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [contactUs, setContactUs] = useState<ContactUsType>({
    email: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    message: "",
  });

  const navigate = useNavigate();

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setContactUs({ ...contactUs, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!contactUs.firstName) {
      toast.error(`Please enter first name`, {
        duration: 4000,
        style: {
          background: "#353434",
          color: "#fff",
        },
      });
    } else if (!contactUs.lastName) {
      toast.error(`Please enter last name`, {
        duration: 4000,
        style: {
          background: "#353434",
          color: "#fff",
        },
      });
    } else if (!contactUs.email) {
      toast.error(`Please enter your email address`, {
        duration: 4000,
        style: {
          background: "#353434",
          color: "#fff",
        },
      });
    } else if (!contactUs.phoneNumber) {
      toast.error(`Please enter phone number`, {
        duration: 4000,
        style: {
          background: "#353434",
          color: "#fff",
        },
      });
    } else if (!contactUs.message) {
      toast.error(`Please enter a message`, {
        duration: 4000,
        style: {
          background: "#353434",
          color: "#fff",
        },
      });
    } else {
      setLoading(true);
      try {
        const contactDetails = {
          firstName: contactUs.firstName,
          lastName: contactUs.lastName,
          phoneNumber: contactUs.phoneNumber,
          email: contactUs.email,
          message: contactUs.message,
        };
        await axiosInstance.post(`/contact-us`, contactDetails);
        setContactUs({
          email: "",
          firstName: "",
          lastName: "",
          phoneNumber: "",
          message: "",
        });
        setLoading(false);
        toast.success(
          "Thank you for reaching out to us. We will get back to you shortly.",
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
    handleChange,
    handleSubmit,
    contactUs,
    loading,
  };
};
