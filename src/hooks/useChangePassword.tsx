import { axiosInstance } from "@/shared-components/baseUrl";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { changePasswordType } from "@/types/types";

const useChangePassword = () => {
  const [passLoader, setPassLoader] = useState(false);
  const [passwordError, setPasswordError] = useState<string>("");
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>("");
  const [inputType, setInputType] = useState<string>("password");
  const [confirmInputType, setConfirmInputType] = useState<string>("password");
  const [oldPasswordInputType, setOldPasswordInputType] =
    useState<string>("password");

  const navigate = useNavigate();

  const [editPassword, setEditPassword] = useState<changePasswordType>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditPassword({ ...editPassword, [e.target.name]: e.target.value });
  };

  const handleValidation = (evnt: React.KeyboardEvent<HTMLInputElement>) => {
    const inputElement = evnt.target as HTMLInputElement;
    const passwordInputValue = inputElement.value.trim();
    const passwordInputFieldName = inputElement.name;
    //htmlFor password
    if (passwordInputFieldName === "newPassword") {
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
      (passwordInputFieldName === "newPassword" &&
        editPassword.confirmPassword.length > 0)
    ) {
      if (editPassword.confirmPassword !== editPassword.newPassword) {
        setConfirmPasswordError("Confirm password is not match");
      } else {
        setConfirmPasswordError("");
      }
    }
  };

  const handleUserPasswordChange = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setPassLoader(true);
    try {
      const editUserPassword = {
        currentPassword: editPassword.currentPassword,
        newPassword: editPassword.newPassword,
      };
      await axiosInstance.post(`/user/change-password`, editUserPassword);
      setEditPassword({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setPassLoader(false);
      toast.success(`Your password has been successfully changed.`, {
        duration: 4000,
        style: {
          background: "#353434",
          color: "#fff",
        },
      });
    } catch (error: any) {
      setPassLoader(false);
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
    handleUserPasswordChange,
    oldPasswordInputType,
    handlePasswordChange,
    editPassword,
    setOldPasswordInputType,
    inputType,
    handleValidation,
    setInputType,
    passwordError,
    confirmInputType,
    setConfirmInputType,
    confirmPasswordError,
    passLoader,
  };
};

export default useChangePassword;
