import { useCreateDispute } from "@/hooks/useCreateDispute";
import { Modal, Spin } from "antd";

type Props = {
  isModalOpen: boolean | undefined;
  handleCancel: () => void;
};

const CreateDisputeModal = ({ isModalOpen, handleCancel }: Props) => {
  const {
    complaint,
    handleChange,
    resolutions,
    handleChangeResolution,
    handleSubmit,
    loading,
  } = useCreateDispute();

  return (
    <Modal open={isModalOpen} onCancel={handleCancel} width={600}>
      <div className="">
        <h2 className="text-2xl font-semibold max-sm:text-xl">
          Create a dispute
        </h2>
        <p className="text-gray-500">
          {" "}
          Tell us what problem you have and we will resolve it as soon as
          possible
        </p>
        <form className="gap-6 flex flex-col mt-8" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <label className="subject">Subject</label>
            <input
              type="text"
              name="complaint"
              value={complaint}
              onChange={handleChange}
              id="subject"
              className=" h-14 max-sm:h-12 border-1 border-gray-300 rounded-lg focus:border-primary-color outline-none px-2 text-gray-600"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="subject">Description</label>
            <textarea
              rows={7}
              name="resolute"
              value={resolutions}
              onChange={handleChangeResolution}
              id="subject"
              className=" border-1 border-gray-300 rounded-lg focus:border-primary-color outline-none p-2 text-gray-600"
            ></textarea>
          </div>
          {loading ? (
            <button
              type="button"
              className="bg-disabled h-14 max-sm:h-12 rounded-lg text-color-dark-font font-semibold cursor-not-allowed"
            >
              <Spin wrapperClassName="spinner" />
            </button>
          ) : (
            <button
              type="submit"
              className="bg-primary-color h-14 max-sm:h-12 rounded-lg text-color-dark-font font-semibold hover:bg-secondary-color"
            >
              Submit
            </button>
          )}
        </form>
      </div>
    </Modal>
  );
};

export default CreateDisputeModal;
