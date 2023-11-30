import { Spin } from "antd";

type titleType = {
  title: string;
};

const TableEmptyState = ({ title }: titleType) => {
  return (
    <div className="max-w-full w-full h-[40vh] flex justify-center items-center flex-col gap-4">
      <h4 className="text-gray-400">{title}</h4>
      <div className="spinner-2">
        <Spin />
      </div>
    </div>
  );
};

export default TableEmptyState;
