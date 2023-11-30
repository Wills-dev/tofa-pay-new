import { Skeleton } from "antd";

const HomePageLoader = () => {
  return (
    <div className="flex gap-5 flex-col mt-4">
      <Skeleton.Input active block />
      <Skeleton.Input active block />
      <Skeleton.Input active block />
    </div>
  );
};

export default HomePageLoader;
