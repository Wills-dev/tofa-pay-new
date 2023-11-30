import { Modal, Spin } from "antd";
import { AiOutlineCloudUpload } from "react-icons/ai";
import ListButtonSpinner from "../ListButtonSpinner";
import { MdDelete } from "react-icons/md";

type Props = {
  isModalOpen: boolean | undefined;
  handleCancel: () => void;
  loadDetails: boolean;
  file: File | null;
  imageUrl: string | null;
  handleDelete: () => void;
  fileLoader: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmitReceipt: (rowId: string) => Promise<void>;
  rowId: string;
};

const UploadRecieptModal = ({
  isModalOpen,
  handleCancel,
  loadDetails,
  file,
  imageUrl,
  handleDelete,
  fileLoader,
  handleChange,
  handleSubmitReceipt,
  rowId,
}: Props) => {
  return (
    <Modal
      title="Upload payment receipt"
      open={isModalOpen}
      onCancel={handleCancel}
    >
      {loadDetails ? (
        <div className="h-[30vh] justify-center items-center flex">
          <ListButtonSpinner />
        </div>
      ) : (
        <div className="h-[30vh] flex flex-col justify-center items-center gap-5">
          {file ? (
            <div className="flex bg-gray-50 h-32 w-32 justify-center  items-center rounded-full border-dashed border-1 border-[#0083d3] relative">
              {imageUrl && (
                <img
                  src={imageUrl}
                  alt="reciept"
                  className="min-w-full min-h-full rounded-full object-cover"
                />
              )}
              <button
                className="absolute bottom-0 right-2 text-red-500 text-2xl"
                onClick={handleDelete}
              >
                <MdDelete />
              </button>
            </div>
          ) : (
            <div className="flex bg-gray-50 h-32 w-32 justify-center  items-center rounded-full border-dashed border-1 border-[#0083d3]">
              <label
                htmlFor="reciept"
                className="flex flex-col items-center justify-center gap-2 cursor-pointer"
              >
                <span className="text-3xl">
                  <AiOutlineCloudUpload />
                </span>

                <span className="text-sm font-light">Upload here</span>
              </label>
              <input
                type="file"
                name="file"
                id="reciept"
                onChange={handleChange}
                className="invisible w-0 h-0"
              />
            </div>
          )}
          {file && <p> {file.name}</p>}
          {fileLoader ? (
            <button className="bg-primary-color text-color-dark-font text-base w-28 h-9 rounded-xl">
              <Spin size="small" />
            </button>
          ) : (
            <button
              className="bg-primary-color text-color-dark-font text-base w-28 h-9 rounded-xl"
              type="button"
              onClick={() => {
                handleSubmitReceipt(rowId);
              }}
            >
              Submit
            </button>
          )}
        </div>
      )}
    </Modal>
  );
};

export default UploadRecieptModal;
