import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="w-full bg-main-dark-bg padding-x py-24">
      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-3 max-lg:col-span-4 max-md:col-span-6 max-sm:col-span-12 flex flex-col gap-4">
          <Link to="/">
            <div className="flex items-center gap-2">
              <img src="/icon.png" alt="Tofa" className="" />
              <h1 className="text-color-dark-font font-bold text-xl">
                TOFA PAY
              </h1>
            </div>
          </Link>
          <p className="text-gray-400">© 2023 TOFA PAY. All Rights Reserved.</p>
        </div>
        <div className="col-span-3 max-lg:col-span-4 max-md:col-span-6 max-sm:col-span-12 flex flex-col gap-4">
          <h1 className="text-color-dark-font font-medium text-xl">Company</h1>

          <div className="flex flex-col gap-2">
            <Link to="/" className="text-gray-400 text-lg hover:text-gray-300">
              Home
            </Link>
            <Link
              to="/about-us"
              className="text-gray-400 text-lg hover:text-gray-300"
            >
              About Us
            </Link>
            <a
              href="#contact-us"
              className="text-gray-400 text-lg hover:text-gray-300"
            >
              Contact
            </a>
          </div>
        </div>
        <div className="col-span-3 max-lg:col-span-4 max-md:col-span-6 max-sm:col-span-12 flex flex-col gap-4">
          <h1 className="text-color-dark-font font-medium text-xl">
            Other Subsidaries
          </h1>

          <div className="flex flex-col gap-2">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.tradersofafrica.com/buy-commodities"
              className="text-gray-400 text-lg hover:text-gray-300"
            >
              Buyer's Hub
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://marketplase.tradersofafrica.com"
              className="text-gray-400 text-lg hover:text-gray-300"
            >
              Marketplace
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://quicklogisticshub.com"
              className="text-gray-400 text-lg hover:text-gray-300"
            >
              Quick Logistics Hub (QLH)
            </a>
          </div>
        </div>
        <div className="col-span-3 max-lg:col-span-4 max-md:col-span-6 max-sm:col-span-12 flex flex-col gap-4">
          <h1 className="text-color-dark-font font-medium text-xl">
            Contact Us
          </h1>

          <div className="flex flex-col gap-2">
            <p className="text-gray-400 text-lg hover:text-gray-300">
              7/9 Adebisi Oyenola Street, Idado Estate, Lekki Lagos
            </p>
            <p className="text-gray-400 text-lg hover:text-gray-300">
              info@tradersofafrica.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
