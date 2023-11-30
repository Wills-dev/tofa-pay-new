import { Skeleton } from "antd";

const DashboardNavLoader = () => {
  return (
    <div className="flex gap-2">
      <Skeleton
        active
        avatar={{ size: "small" }}
        title={false}
        paragraph={false}
      />
      <Skeleton
        active
        avatar={{ size: "small" }}
        title={false}
        paragraph={false}
      />
      <Skeleton
        active
        avatar={{ size: "small" }}
        title={false}
        paragraph={false}
      />
      <Skeleton
        active
        avatar={{ size: "small" }}
        title={false}
        paragraph={false}
      />
      <Skeleton.Input active />
    </div>
  );
};

export default DashboardNavLoader;
