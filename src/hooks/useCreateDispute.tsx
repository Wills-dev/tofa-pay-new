import { axiosInstance } from "@/shared-components/baseUrl";
import { GlobalContext } from "@/utils/GlobalState";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface DisputeData {
  complaint: string;
  status: string;
}

export const useCreateDispute = () => {
  const navigate = useNavigate();
  const { user } = useContext(GlobalContext);

  const [loading, setLoading] = useState<boolean>(false);
  const [resolutions, setResolutions] = useState<string>("");
  const [complaint, setComplaint] = useState<string>("");

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setComplaint(e.target.value);
  };

  const handleChangeResolution = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setResolutions(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    try {
      const disputeDetails = {
        complaint: complaint,
        resolution: resolutions,
        userId: user.id,
      };

      await axiosInstance.post(`/create-dispute`, disputeDetails);
      toast.success(`Your dispute was successfully sent`, {
        duration: 4000,
        style: {
          background: "#353434",
          color: "#fff",
        },
      });
      setComplaint("");
      setResolutions("");
      setLoading(false);
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
  };
  return {
    complaint,
    handleChange,
    resolutions,
    handleChangeResolution,
    handleSubmit,
    loading,
  };
};
