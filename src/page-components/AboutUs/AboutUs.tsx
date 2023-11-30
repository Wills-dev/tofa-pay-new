import ContactUs from "@/shared-components/ContactUs";
import Footer from "@/shared-components/Footer";
import HomeNav from "@/shared-components/HomeNav";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AboutUs = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [navigate]);

  return (
    <div className="w-full h-full bg-main-bg ">
      <HomeNav />
      <div className="py-24 padding-x"></div>
      <ContactUs />
      <Footer />
    </div>
  );
};

export default AboutUs;
