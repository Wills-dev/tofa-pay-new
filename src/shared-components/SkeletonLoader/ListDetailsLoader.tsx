import { Skeleton } from "antd";

const ListDetailsLoader = () => {
  return (
    <div className="mt-14 ">
      <div className="flex justify-end">
        <Skeleton.Input active />
      </div>

      <br />
      <br />
      <div className="flex gap-8 max-md:flex-col">
        <Skeleton.Input active block />
        <Skeleton.Input active block />
      </div>
      <br />
      <div className="flex gap-8 max-md:flex-col">
        <Skeleton.Input active block />
        <Skeleton.Input active block />
      </div>
      <br />
      <div className="flex gap-8 max-md:flex-col">
        <Skeleton.Input active block />
        <Skeleton.Input active block />
      </div>
      <br />
      <div className="flex gap-8 max-md:flex-col">
        <Skeleton.Input active block />
        <Skeleton.Input active block />
      </div>
      <br />
      <div className="flex gap-8 max-md:flex-col">
        <Skeleton.Input active block />
        <Skeleton.Input active block />
      </div>
      <br />
      <div className="flex gap-8 max-md:flex-col">
        <Skeleton.Input active block />
        <Skeleton.Input active block />
      </div>
      <br />
      <div className="flex gap-8 max-md:flex-col">
        <Skeleton.Input active block />
        <Skeleton.Input active block />
      </div>
      <br />
      <div className="flex gap-8 max-md:flex-col">
        <Skeleton.Input active block />
        <Skeleton.Input active block />
      </div>
      <br />
    </div>
  );
};

export default ListDetailsLoader;
