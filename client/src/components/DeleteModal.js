import { useAppcontext } from "../context/appContext";

const DeleteModal = () => {
  const { closeModal, deleteDetail, deleteId, deleteUrl, deleteGetInfo } =
    useAppcontext();
  return (
    <aside className="modal-container">
      <div className="modal">
        <h4>Are you sure you want to delete</h4>
        <div className="btn-container">
          <button
            type="button"
            className="btn confirm-btn"
            onClick={() => {
              deleteDetail(deleteId, deleteUrl, deleteGetInfo);
              closeModal();
            }}
          >
            confirm
          </button>
          <button
            type="button"
            className="btn clear-btn"
            onClick={() => closeModal()}
          >
            cancel
          </button>
        </div>
      </div>
    </aside>
  );
};
export default DeleteModal;
