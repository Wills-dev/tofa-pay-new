import { axiosInstance } from "@/shared-components/baseUrl";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

type PasswordProps = {
  password: string;
  confirmPassword: string;
};

export const useResetPassword = () => {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  const [loading, setLoading] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<string>("");
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>("");
  const [inputType, setInputType] = useState<string>("password");
  const [confirmInputType, setConfirmInputType] = useState<string>("password");
  const [passwordInput, setPasswordInput] = useState<PasswordProps>({
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const handlePasswordChange = (evnt: React.ChangeEvent<HTMLInputElement>) => {
    const passwordInputValue = evnt.target.value.trim();
    const passwordInputFieldName = evnt.target.name;
    const NewPasswordInput = {
      ...passwordInput,
      [passwordInputFieldName]: passwordInputValue,
    };
    setPasswordInput(NewPasswordInput);
  };

  const handleValidation = (evnt: React.KeyboardEvent<HTMLInputElement>) => {
    const inputElement = evnt.target as HTMLInputElement;
    const passwordInputValue = inputElement.value.trim();
    const passwordInputFieldName = inputElement.name;
    //htmlFor password
    if (passwordInputFieldName === "password") {
      const uppercaseRegExp = /(?=.*?[A-Z])/;
      const lowercaseRegExp = /(?=.*?[a-z])/;
      const digitsRegExp = /(?=.*?[0-9])/;
      const specialCharRegExp = /(?=.*?[#?!@$%^&*-])/;
      const minLengthRegExp = /.{8,}/;
      const passwordLength = passwordInputValue.length;
      const uppercasePassword = uppercaseRegExp.test(passwordInputValue);
      const lowercasePassword = lowercaseRegExp.test(passwordInputValue);
      const digitsPassword = digitsRegExp.test(passwordInputValue);
      const specialCharPassword = specialCharRegExp.test(passwordInputValue);
      const minLengthPassword = minLengthRegExp.test(passwordInputValue);
      let errMsg = "";
      if (passwordLength === 0) {
        errMsg = "Password is empty";
      } else if (!uppercasePassword) {
        errMsg = " Include at least one uppercase letter";
      } else if (!lowercasePassword) {
        errMsg = " Include at least one lowercase letter";
      } else if (!digitsPassword) {
        errMsg = "    Include at least one number";
      } else if (!specialCharPassword) {
        errMsg = "  Include at least 1 special character (!@#$%^&*)";
      } else if (!minLengthPassword) {
        errMsg = " Must be at least 8 characters long";
      } else {
        errMsg = "";
      }
      setPasswordError(errMsg);
    }
    // htmlFor confirm password
    if (
      passwordInputFieldName === "confirmPassword" ||
      (passwordInputFieldName === "password" &&
        passwordInput.confirmPassword.length > 0)
    ) {
      if (passwordInput.confirmPassword !== passwordInput.password) {
        setConfirmPasswordError("Confirm password is not match");
      } else {
        setConfirmPasswordError("");
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    if (passwordInput.confirmPassword !== passwordInput.password) {
      setConfirmPasswordError("Confirm password is not a match");
    }
    try {
      const changePassword = {
        password: passwordInput.password,
        confirm_password: passwordInput.confirmPassword,
      };
      await axiosInstance.post(
        `/user/resetpassword/${userId}/${token}`,
        changePassword
      );
      setPasswordInput({
        password: "",
        confirmPassword: "",
      });

      toast.success(`Your Password has been changed successfully.`, {
        duration: 4000,
        style: {
          background: "#353434",
          color: "#fff",
        },
      });
      setLoading(false);
      localStorage.removeItem("userId");
      localStorage.removeItem("token");
      setTimeout(() => {
        navigate(`/login`);
      }, 3000);
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
    handleSubmit,
    inputType,
    passwordInput,
    handlePasswordChange,
    handleValidation,
    passwordError,
    confirmInputType,
    confirmPasswordError,
    setConfirmInputType,
    loading,
    setInputType,
  };
};
