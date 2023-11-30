import { HeaderType } from "@/types/types";

const Header = ({ category, title }: HeaderType) => {
  return (
    <div className="mb-10">
      <p className="text-gray-400">{category}</p>
      <p className="text-3xl font-extrabold tracking-light text-slate-900 capitalize max-sm:text-2xl max-sm:font-bold ">
        {title}
      </p>
    </div>
  );
};

export default Header;
