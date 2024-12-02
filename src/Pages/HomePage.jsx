import React, { useEffect, useState } from "react";
import CustomModal from "../Components/CustomModal";
import Header from "../Components/Header";
import CustomTable from "../Components/CustomTable";

const HomePage = () => {
  const [showCount, setShowCount] = useState(false);
  const [searchKey, setSearchKey] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [deleteKey, setDeleteKey] = useState("");
  const [selectedCommentId, setSelectedCommentId] = useState(null);
  const [editComment, setEditComment] = useState({});
  const [comments, setComments] = useState([]);
  const [allComments, setAllComments] = useState([]);

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setDeleteKey("");
    setSelectedCommentId(null);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const getAllComments = async () => {
    try {
      const storedComments = localStorage.getItem("comments");
  
      if (storedComments) {
        const parsedComments = JSON.parse(storedComments);
        setComments(parsedComments);
        setAllComments(parsedComments);
        setShowCount(false);
      } else {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/comments"
        );
        const json = await response.json();
        setComments(json);
        setAllComments(json);
        setShowCount(false);
        localStorage.setItem("comments", JSON.stringify(json));
      }
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
      setAllComments(updatedComments);
      localStorage.setItem("comments", JSON.stringify(updatedComments));
      closeDeleteModal();
    }
  };

  const openDeleteModal = (id) => {
    setSelectedCommentId(id);
    setIsDeleteModalOpen(true);
  };

  const openEditModal = (id) => {
    setSelectedCommentId(id);
    const selectedComment = allComments.find((comment) => comment?.id === id);
    setEditComment(selectedComment);
    setIsEditModalOpen(true);
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

  const handleFieldChange = (e, id) => {
    const { name, value } = e.target;
    setEditComment((prevComment) => ({ ...prevComment, [name]: value }));

    const updatedComments = comments.map((comment) =>
      comment.id === id ? { ...comment, [name]: value } : comment
    );
    setComments(updatedComments);
  };

  const saveUpdatedComment = () => {
    localStorage.setItem("comments", JSON.stringify(comments));
    closeEditModal();
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
          openEditModal={openEditModal}
        />
      </div>

      {/* Confirm modal for deletion */}
      <CustomModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        title="Confirm Delete"
        submitButton={
          <button
            onClick={deleteComment}
            disabled={deleteKey !== "Delete"}
            className={`${
              deleteKey === "Delete" ? "btn-enabled" : "btn-disabled"
            }`}
          >
            Delete
          </button>
        }
        submitHandler={deleteComment}
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
          </div>
        </div>
      </CustomModal>

      {/* Modal for edit comment */}
      <CustomModal
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        title="Edit Comment"
        submitButton={
          <button className="save-button" onClick={saveUpdatedComment}>
            Save
          </button>
        }
      >
        <div className="edit-modal-wrapper">
          <div>
            <h2>Id:</h2>
            <input
              type="text"
              readOnly
              value={editComment?.id}
              className="disabled-field"
            />
          </div>
          <div>
            <h2>Name:</h2>
            <input
              type="text"
              name="name"
              value={editComment?.name || ""}
              onChange={(e) => handleFieldChange(e, editComment?.id)}
            />
          </div>
          <div>
            <h2>Email:</h2>
            <input
              type="text"
              name="email"
              value={editComment?.email || ""}
              onChange={(e) => handleFieldChange(e, editComment?.id)}
            />
          </div>
          <div>
            <h2>Comment:</h2>
            <input
              type="text"
              name="body"
              value={editComment?.body || ""}
              onChange={(e) => handleFieldChange(e, editComment?.id)}
            />
          </div>
        </div>
      </CustomModal>
    </>
  );
};

export default HomePage;
