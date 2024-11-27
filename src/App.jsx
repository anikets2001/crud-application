import "./App.css";
import { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { MdEdit, MdDelete } from "react-icons/md";
import Loader from "./Components/Loader";
import CustomModal from "./Components/CustomModal";

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteKey, setDeleteKey] = useState("");
  const [selectedCommentId, setSelectedCommentId] = useState(null);
  const [comments, setComments] = useState([]);

  const closeModal = () => {
    setIsModalOpen(false);
    setDeleteKey("");
    setSelectedCommentId(null);
  };

  const getAllComments = async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/comments"
      );
      const json = await response.json();
      setComments(json);
      localStorage.setItem("comments", JSON.stringify(json));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllComments();
  }, []);

  const deleteAllComments = () => {
    localStorage.clear();
    setComments([]);
  };

  const deleteComment = () => {
    if (deleteKey === "Delete" && selectedCommentId) {
      const updatedComments = comments.filter(
        (comment) => comment.id !== selectedCommentId
      );
      setComments(updatedComments);
      localStorage.setItem("comments", JSON.stringify(updatedComments));
      closeModal();
    }
  };

  const openDeleteModal = (id) => {
    setSelectedCommentId(id);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="container">
        <div className="header">
          {comments.length > 0 ? (
            <button onClick={deleteAllComments} className="delete-all">
              <MdDelete className="delete" /> <p>Delete all comments</p>
            </button>
          ) : (
            <button onClick={getAllComments} className="get-all">
              Get all the comments
            </button>
          )}
        </div>
        {comments.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Email</th>
                <th>Comment</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {comments?.map((comment) => (
                <tr key={comment?.id}>
                  <td>{comment?.id}</td>
                  <td>{comment?.name}</td>
                  <td>{comment?.email}</td>
                  <td>{comment?.body}</td>
                  <td className="actions-cell">
                    <div className="actions-wrapper">
                      <button>
                        <FaEye className="view" />
                      </button>
                      <button>
                        <MdEdit className="edit" />
                      </button>
                      <button
                        type="button"
                        onClick={() => openDeleteModal(comment?.id)}
                      >
                        <MdDelete className="delete" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <Loader />
        )}
      </div>

      {/* confirm modal for deletion */}
      <CustomModal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Confirm Delete"
      >
        <div className="delete-modal">
          <p>Type 'Delete' to proceed with deleting this comment!</p>
          <div className="delete-input">
            <input
              type="text"
              value={deleteKey}
              onChange={(e) => setDeleteKey(e.target.value)}
              placeholder="Type here"
            />
            <button
              onClick={deleteComment}
              disabled={deleteKey !== "Delete"}
              className={`${
                deleteKey === "Delete" ? "btn-enabled" : "btn-disabled"
              }`}
            >
              Delete
            </button>
          </div>
        </div>
      </CustomModal>
    </>
  );
};

export default App;
