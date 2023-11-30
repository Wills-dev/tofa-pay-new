import { usePostContactMessage } from "@/hooks/usePostContactMessage";
import { Spin } from "antd";
import { Toaster } from "react-hot-toast";

const ContactUs = () => {
  const { handleChange, handleSubmit, contactUs, loading } =
    usePostContactMessage();

  return (
    <div id="contact-us" className="padding-x w-full  my-28">
      <Toaster />
      <div className="w-full flex justify-center flex-col items-center mb-20">
        <h2 className="text-color-font text-3xl left-32">Contact Us</h2>
      </div>
      <div className="w-full  flex justify-center">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col p-6 gap-6 shadow-md rounded-xl max-w-[1000px] w-[800px] "
        >
          <div className="flex max-md:flex-col gap-6">
            <input
              className="flex-1 w-full border-1 border-color px-2 py-4 rounded-md outline-none focus:border-primary-color text-color-font"
              placeholder="Enter First Name"
              name="firstName"
              value={contactUs.firstName}
              onChange={handleChange}
            />
            <input
              className="flex-1 w-full border-1 border-color px-2 py-4 rounded-md outline-none focus:border-primary-color text-color-font"
              placeholder="Enter Last Name"
              name="lastName"
              value={contactUs.lastName}
              onChange={handleChange}
            />
          </div>
          <div className="flex max-md:flex-col gap-6">
            <input
              className="flex-1 w-full border-1 border-color px-2 py-4 rounded-md outline-none focus:border-primary-color text-color-font"
              placeholder="Enter Phone Number"
              name="phoneNumber"
              value={contactUs.phoneNumber}
              onChange={handleChange}
            />
            <input
              className="flex-1 w-full border-1 border-color px-2 py-4 rounded-md outline-none focus:border-primary-color text-color-font"
              placeholder="Enter Email"
              name="email"
              value={contactUs.email}
              onChange={handleChange}
            />
          </div>
          <textarea
            className="flex-1 w-full border-1 border-color px-2 py-4 rounded-md outline-none focus:border-primary-color text-color-font"
            placeholder="Enter Message"
            rows={6}
            name="message"
            value={contactUs.message}
            onChange={handleChange}
          ></textarea>
          <div>
            {loading ? (
              <button className="w-[150px] bg-gray-300  rounded-lg py-2 cursor-not-allowed">
                <Spin wrapperClassName="spinner" />
              </button>
            ) : (
              <button
                className="w-[150px] bg-gray-500 hover:bg-slate-400 text-color-dark-font rounded-lg py-2"
                type="submit"
              >
                Send
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
