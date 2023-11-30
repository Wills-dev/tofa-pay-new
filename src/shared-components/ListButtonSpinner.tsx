import { Spin } from "antd";

const ListButtonSpinner = () => {
  return (
    <button className="items-center text-center justify-center flex spinner-2 w-full py-1">
      <Spin wrapperClassName="spinner" size="small" />
    </button>
  );
};

export default ListButtonSpinner;
