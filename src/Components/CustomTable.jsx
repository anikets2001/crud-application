import React from "react";
import { FaEye } from "react-icons/fa";
import { MdEdit, MdDelete } from "react-icons/md";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";

const CustomTable = ({
  comments,
  openDeleteModal,
  getAllComments,
  openEditModal,
}) => {
  const navigate = useNavigate();

  const handleViewComment = (id) => {
    navigate(`viewComment/${id}`);
    getAllComments(id);
  };

  return (
    <div className="table-wrapper">
      {comments?.length > 0 ? (
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
                      <FaEye
                        className="view"
                        onClick={() => handleViewComment(comment?.id)}
                      />
                    </button>
                    <button>
                      <MdEdit
                        className="edit"
                        onClick={() => openEditModal(comment?.id)}
                      />
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
  );
};

export default CustomTable;
