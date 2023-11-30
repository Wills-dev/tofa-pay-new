import { Modal } from "antd";

type Props = {
  isModalOpen: boolean | undefined;
  handleCancel: () => void;
};

const DisputeDetailsModal = ({ isModalOpen, handleCancel }: Props) => {
  return (
    <Modal
      title="Dispute details"
      open={isModalOpen}
      onCancel={handleCancel}
      width={500}
    >
      <div className="flex flex-col gap-3 mt-6">
        <div className="grid grid-cols-3  gap-2">
          <h6 className="font-semibold col-span-1">Date Joined:</h6>
          <p className="text-gray-500 col-span-2">24 Jan, 2023</p>
        </div>
        <div className="grid grid-cols-3  gap-2">
          <h6 className="font-semibold col-span-1">Company name:</h6>
          <p className="text-gray-500 col-span-2">SIPI</p>
        </div>
        <div className="grid grid-cols-3  gap-2">
          <h6 className="font-semibold col-span-1">Company initial:</h6>
          <p className="text-gray-500 col-span-2">SIPI</p>
        </div>
        <div className="grid grid-cols-3  gap-2">
          <h6 className="font-semibold col-span-1">Currency:</h6>
          <p className="text-gray-500 col-span-2">NGN</p>
        </div>
        <div className="grid grid-cols-3  gap-2">
          <h6 className="font-semibold col-span-1">Phone number:</h6>
          <p className="text-gray-500 col-span-2">+234909987777</p>
        </div>
        <div className="grid grid-cols-3  gap-2">
          <h6 className="font-semibold col-span-1">Email:</h6>
          <p className="text-gray-500 col-span-2">admin@sipi.com</p>
        </div>
        <div className="grid grid-cols-3  gap-2">
          <h6 className="font-semibold col-span-1">Address:</h6>
          <p className="text-gray-500 col-span-2">
            +Lorem ipsum dolor, sit amet consectetur adipisicing elit. Natus est
            earum exercitationem placeat minus eaque porro. Distinctio
            asperiores id sint, quaerat velit, laboriosam sit nostrum eveniet
            cumque vitae, dolorum natus?
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default DisputeDetailsModal;
