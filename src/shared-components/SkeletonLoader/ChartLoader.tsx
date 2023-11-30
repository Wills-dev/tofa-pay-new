import { Skeleton, Space } from "antd";

const ChartLoader = () => {
  return (
    <div className="w-full">
      <Skeleton avatar={{ size: 300, shape: "square" }} />
    </div>
  );
};

export default ChartLoader;
