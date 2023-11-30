import { homeSlider } from "../../constants/index";

import { Carousel } from "antd";
import { MdOutlineSupervisorAccount } from "react-icons/md";
import { IoMdContacts } from "react-icons/io";
import { BsBoxSeam } from "react-icons/bs";
import { HiOutlineRefresh } from "react-icons/hi";
import { GiCash } from "react-icons/gi";
import { AiFillDollarCircle } from "react-icons/ai";
import Footer from "@/shared-components/Footer";
import HomeNav from "@/shared-components/HomeNav";
import ContactUs from "@/shared-components/ContactUs";
import { useGetAllStatistics } from "@/hooks/useGetAllStatistics";
import { numberWithCommas } from "@/helpers/helperFunctions";
import HomePageLoader from "@/shared-components/SkeletonLoader/HomePageLoader";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Home = () => {
  const { allStatistics, loading } = useGetAllStatistics();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [navigate]);

  return (
    <div className="w-full h-full bg-main-bg ">
      <HomeNav />
      <header className="h-[70vh] min-h-[70vh] w-full pt-24">
        <div className="w-full h-full rounded-2xl bg-center bg-cover bg-no-repeat duration-500">
          <Carousel autoplay dotPosition="bottom">
            {homeSlider.map((item, index) => (
              <div key={index}>
                <div
                  style={{
                    position: "relative",
                    height: "70vh",
                    width: "100%",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundImage: `url(${item.url})`,
                  }}
                >
                  <div className="absolute w-full h-full bottom-0 top-0 right-0 left-0 bg-half-transparent z-0">
                    <div className="padding-x flex justify-between items-center w-full h-full z-100">
                      <div className="flex-1">
                        <h1 className="  text-primary-color font-bold text- text-4xl max-lg:text-2xl leading-[50px]">
                          Elevate and Track <br />
                          your Payment Processes <br /> with our new system.
                        </h1>
                      </div>
                      <div className="flex-1 flex justify-end max-xl:hidden">
                        <div className="bg-main-bg p-6 w-[350px]">
                          <h4 className="text-color-font font-semibold text-center text-2xl">
                            Our business at a glance
                          </h4>
                          {loading ? (
                            <HomePageLoader />
                          ) : (
                            <div className="flex flex-col gap-4 mt-6">
                              <div className="flex items-center">
                                <button className="relative text-3xl opacity-0.9 rounded-full p-4  hover:shadow-lg ">
                                  {" "}
                                  <MdOutlineSupervisorAccount />{" "}
                                </button>
                                <div className="flex gap-3 ml-2">
                                  <p className="flex items-center text-[14px]">
                                    Partners:
                                  </p>
                                  <p className="flex items-center text-lg font-[500]">
                                    {allStatistics?.totalNumberOfSellers &&
                                      numberWithCommas(
                                        allStatistics?.totalNumberOfSellers
                                      )}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center">
                                <button className="relative text-3xl opacity-0.9 rounded-full p-4  hover:shadow-lg ">
                                  {" "}
                                  <IoMdContacts />{" "}
                                </button>
                                <div className="flex gap-3 ml-2">
                                  <p className="flex items-center text-[14px]">
                                    Farmers:
                                  </p>
                                  <p className="flex items-center text-lg font-[500]">
                                    {allStatistics?.totalNumberOfSuppliers &&
                                      numberWithCommas(
                                        allStatistics?.totalNumberOfSuppliers
                                      )}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center">
                                <button className="relative text-3xl opacity-0.9 rounded-full p-4  hover:shadow-lg ">
                                  {" "}
                                  <BsBoxSeam />{" "}
                                </button>
                                <div className="flex gap-3 ml-2">
                                  <p className="flex items-center text-[14px]">
                                    Products:
                                  </p>
                                  <p className="flex items-center text-lg font-[500]">
                                    {allStatistics?.totalNumberOfProducts &&
                                      numberWithCommas(
                                        allStatistics?.totalNumberOfProducts
                                      )}
                                  </p>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </header>
      <div className="padding-x w-full  mt-48 mb-28">
        <div className="w-full flex justify-center flex-col items-center mb-20">
          <div className="w-10 h-[2px] bg-primary-color"></div>
          <h2 className="text-color-font text-3xl left-32">What we offer</h2>
          <p className="mt-1 text-gray-500 text-base text-center">
            {" "}
            We provide an Efficient, Secure, and Seamless Payment Solutions for
            our Customers.
          </p>
        </div>
        <div className="flex flex-wrap gap-4 justify-center items-center">
          <div className=" flex flex-col items-center justify-center shadow-md py-6 hover:bg-light-gray w-[250px]">
            <button
              type="button"
              className="text-4xl opacity-0.9 rounded-full p-4 hover:shadow-xl text-primary-color"
            >
              <GiCash />
            </button>
            <p className=" text-center text-lg font-semibold mt-4 text-gray-600">
              Manage your business cashflow
            </p>
          </div>
          <div className=" flex flex-col items-center justify-center shadow-md py-6 hover:bg-light-gray w-[250px]">
            <button
              type="button"
              className="text-4xl opacity-0.9 rounded-full p-4 hover:shadow-xl text-primary-color"
            >
              <HiOutlineRefresh />
            </button>
            <p className=" text-center text-lg font-semibold mt-4 text-gray-600">
              Seamless availability of products
            </p>
          </div>
          <div className=" flex flex-col items-center justify-center shadow-md py-6 hover:bg-light-gray w-[250px]">
            <button
              type="button"
              className="text-4xl opacity-0.9 rounded-full p-4 hover:shadow-xl text-primary-color"
            >
              <AiFillDollarCircle />
            </button>
            <p className=" text-center text-lg font-semibold mt-4 text-gray-600">
              Instant <br /> payment
            </p>
          </div>
        </div>
      </div>
      <div className="padding-x py-24 xl:hidden">
        <div className="flex-1 flex justify-center">
          <div className=" bg-main-dark-bg p-6 w-[350px] max-md:px-2">
            <h4 className="text-color-dark-font font-semibold text-center text-2xl">
              Our business at a glance
            </h4>
            {loading ? (
              <HomePageLoader />
            ) : (
              <div className="flex flex-col gap-4 mt-6 max-md:items-center">
                <div className="flex items-center max-md:flex-col">
                  <button className="relative text-3xl opacity-0.9 rounded-full p-4 bg-main-bg  hover:shadow-lg ">
                    {" "}
                    <MdOutlineSupervisorAccount />{" "}
                  </button>
                  <div className="flex gap-3 ml-2">
                    <p className="flex items-center text-[14px] text-color-dark-font">
                      Partners:
                    </p>
                    <p className="flex items-center text-lg font-[500] text-color-dark-font">
                      {allStatistics?.totalNumberOfSellers &&
                        numberWithCommas(allStatistics?.totalNumberOfSellers)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center max-md:flex-col">
                  <button className="relative text-3xl opacity-0.9 rounded-full p-4  hover:shadow-lg  bg-main-bg">
                    {" "}
                    <IoMdContacts />{" "}
                  </button>
                  <div className="flex gap-3 ml-2">
                    <p className="flex items-center text-[14px] text-color-dark-font">
                      Farmers:
                    </p>
                    <p className="flex items-center text-lg font-[500] text-color-dark-font">
                      {allStatistics?.totalNumberOfSuppliers &&
                        numberWithCommas(allStatistics?.totalNumberOfSuppliers)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center max-md:flex-col">
                  <button className="relative text-3xl opacity-0.9 rounded-full p-4  hover:shadow-lg  bg-main-bg">
                    {" "}
                    <BsBoxSeam />{" "}
                  </button>
                  <div className="flex gap-3 ml-2">
                    <p className="flex items-center text-[14px] text-color-dark-font">
                      Products:
                    </p>
                    <p className="flex items-center text-lg font-[500] text-color-dark-font">
                      {allStatistics?.totalNumberOfProducts &&
                        numberWithCommas(allStatistics?.totalNumberOfProducts)}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="padding-x w-full  my-28">
        <div className="w-full flex justify-center flex-col items-center mb-20">
          <div className="w-10 h-[2px] bg-primary-color"></div>
          <h2 className="text-color-font text-3xl left-32">Our partners</h2>
        </div>
        <div className="flex items-center justify-center gap-16 flex-wrap max-sm:gap-10">
          <div className="block">
            <img
              src="/images/pia.svg"
              alt=""
              className="max-h-[50px] h-[50px]"
            />
          </div>
          <div className="block">
            <img
              src="/images/fman-logo.svg"
              alt=""
              className="max-h-[50px] h-[50px]"
            />
          </div>
          <div className="block ">
            <img
              src="/images/sipi.png"
              alt=""
              className="max-h-[50px] h-[50px]"
            />
          </div>
          <div className="block">
            <img
              src="/images/ati.png"
              alt=""
              className="max-h-[50px] h-[50px]"
            />
          </div>
          <div className="block ">
            <img
              src="/images/agg.png"
              alt=""
              className="max-h-[50px] h-[50px] w-auto"
            />
          </div>
        </div>
      </div>
      <ContactUs />
      <Footer />
    </div>
  );
};

export default Home;
