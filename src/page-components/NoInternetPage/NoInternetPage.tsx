import { Link } from "react-router-dom";

const NoInternetPage = () => {
  return (
    <div className="w-full h-screen flex flex-col ">
      <div className="flex w-full">
        <Link to="/">
          <img src="/images/logo.jpg" alt="TOFA logo" />
        </Link>
      </div>

      <div className="flex-1 flex  gap-6 items-center justify-center flex-col padding-x h-full w-full">
        <h1 className="text-5xl font-semibold text-center max-md:text-2xl">
          NO INTERNET CONNECTION OR SERVER DOWN
        </h1>
        <p className="text-xl items-center text-center max-md:text-base">
          Check your internet and be sure it's properly connected
        </p>
        <Link
          to="/"
          className="bg-primary-color hover:bg-secondary-color text-color-dark-font py-3 px-6 rounded-md whitespace-nowrap max-sm:py-2"
        >
          Back Home
        </Link>
      </div>
    </div>
  );
};

export default NoInternetPage;
