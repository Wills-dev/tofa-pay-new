import { useState } from "react";
import { PartnerType } from "@/types/types";
import { axiosInstance } from "@/shared-components/baseUrl";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useRegisterPartner = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const [partnerRegistrationDetails, setPartnerRegistrationDetails] =
    useState<PartnerType>({
      companyName: "",
      companyInitial: "",
      currency: "",
      phoneNumber: "",
      email: "",
      address: "",
    });

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    setPartnerRegistrationDetails({
      ...partnerRegistrationDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleValidation = (evnt: React.KeyboardEvent<HTMLInputElement>) => {
    const inputElement = evnt.target as HTMLInputElement;
    const companyInitialInputValue = inputElement.value.trim();
    const companyInitialFieldName = inputElement.name;

    //htmlFor password
    if (companyInitialFieldName === "companyInitial") {
      const uppercaseRegExp = /(?=.*?[A-Z])/;
      const lowercaseRegExp = /(?=.*?[a-z])/;
      const digitsRegExp = /(?=.*?[0-9])/;
      const specialCharRegExp = /(?=.*?[#?!@$%^&*-])/;
      const minLengthRegExp = /.{2,}/;
      const passwordLength = companyInitialInputValue.length;
      const uppercasePassword = uppercaseRegExp.test(companyInitialInputValue);
      const lowercasePassword = lowercaseRegExp.test(companyInitialInputValue);
      const digitsPassword = digitsRegExp.test(companyInitialInputValue);
      const specialCharPassword = specialCharRegExp.test(
        companyInitialInputValue
      );
      const minLengthPassword = minLengthRegExp.test(companyInitialInputValue);
      let errMsg = "";
      if (passwordLength === 0) {
        errMsg = "Company initial is empty";
      } else if (!uppercasePassword) {
        errMsg = " All letters must be uppercase";
      } else if (lowercasePassword) {
        errMsg = " Company initial cannot have lowercase letter";
      } else if (digitsPassword) {
        errMsg = " Company initial cannot have number";
      } else if (specialCharPassword) {
        errMsg = "  Company initial cannot have special character (!@#$%^&*)";
      } else if (!minLengthPassword) {
        errMsg = " Company initial must not be less than 2 letters long";
      } else {
        errMsg = "";
      }
      setError(errMsg);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      partnerRegistrationDetails.currency === "selected" ||
      !partnerRegistrationDetails.currency
    ) {
      toast.error(`Please select currency`, {
        duration: 4000,
        style: {
          background: "#353434",
          color: "#fff",
        },
      });
    } else if (error) {
      toast.error(`${error}`, {
        duration: 4000,
        style: {
          background: "#353434",
          color: "#fff",
        },
      });
    } else {
      setLoading(true);
      try {
        const registerPartner = {
          companyName: partnerRegistrationDetails.companyName,
          companyInitial: partnerRegistrationDetails.companyInitial,
          currency: partnerRegistrationDetails.currency,
          phoneNumber: partnerRegistrationDetails.phoneNumber,
          email: partnerRegistrationDetails.email,
          address: partnerRegistrationDetails.address,
        };
        await axiosInstance.post(`/company/signup`, registerPartner);

        toast.success(
          "You have successfully registered this partner company.",
          {
            duration: 4000,
            style: {
              background: "#353434",
              color: "#fff",
            },
          }
        );
        setLoading(false);
        setPartnerRegistrationDetails({
          companyName: "",
          companyInitial: "",
          currency: "",
          phoneNumber: "",
          email: "",
          address: "",
        });
        setTimeout(() => {
          navigate(`/partners`);
        }, 4000);
      } catch (error: any) {
        console.log(error);
        setLoading(false);
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
    loading,
    handleChange,
    partnerRegistrationDetails,
    handleSubmit,
    error,
    handleValidation,
  };
};
