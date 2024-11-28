import React, { useEffect, useState } from "react";
import CustomModal from "../Components/CustomModal";
import Header from "../Components/Header";
import CustomTable from "../Components/CustomTable";

const HomePage = () => {
  const [showCount, setShowCount] = useState(false);
  const [searchKey, setSearchKey] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteKey, setDeleteKey] = useState("");
  const [selectedCommentId, setSelectedCommentId] = useState(null);
  const [comments, setComments] = useState([]);
  const [allComments, setAllComments] = useState([]);

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
      setAllComments(json);
      setShowCount(false);
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
    setAllComments([]);
  };

  const deleteComment = () => {
    if (deleteKey === "Delete" && selectedCommentId) {
      const updatedComments = comments.filter(
        (comment) => comment.id !== selectedCommentId
      );
      setComments(updatedComments);
      setAllComments(updatedComments); // Update original comments
      localStorage.setItem("comments", JSON.stringify(updatedComments));
      closeModal();
    }
  };

  const openDeleteModal = (id) => {
    setSelectedCommentId(id);
    setIsModalOpen(true);
  };

  const handleGlobalSearch = (e) => {
    const searchValue = e.target.value;
    setSearchKey(searchValue);

    if (searchValue.trim().length > 0) {
      const filteredComments = allComments.filter(
        (comment) =>
          comment?.name.toLowerCase().includes(searchValue.toLowerCase()) ||
          comment?.email.toLowerCase().includes(searchValue.toLowerCase()) ||
          comment?.body.toLowerCase().includes(searchValue.toLowerCase())
      );
      setShowCount(true);
      setComments(filteredComments);
    } else {
      setComments(allComments);
      setShowCount(false);
    }
  };

  return (
    <>
      <div className="container">
        <Header
          comments={comments}
          showCount={showCount}
          searchKey={searchKey}
          handleGlobalSearch={handleGlobalSearch}
          deleteAllComments={deleteAllComments}
          getAllComments={getAllComments}
        />
        <CustomTable
          comments={comments}
          openDeleteModal={openDeleteModal}
          getAllComments={getAllComments}
        />
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

export default HomePage;
