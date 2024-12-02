import React from "react";
import { FaEye } from "react-icons/fa";
import { MdEdit, MdDelete } from "react-icons/md";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";
import { FaLongArrowAltUp } from "react-icons/fa";
import { FaLongArrowAltDown } from "react-icons/fa";

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
              <th>
                <div className="sort-wrapper">
                  <p>Id:</p>
                  <button className="sort-button">
                    <FaLongArrowAltUp />
                  </button>
                </div>
              </th>
              <th>
                <div className="sort-wrapper">
                  <p>Name:</p>
                  <button className="sort-button">
                    <FaLongArrowAltUp />
                  </button>
                </div>
              </th>
              <th>
                <div className="sort-wrapper">
                  <p>Email:</p>
                  <button className="sort-button">
                    <FaLongArrowAltUp />
                  </button>
                </div>
              </th>
              <th>
                <div className="sort-wrapper">
                  <p>Comment:</p>
                  <button className="sort-button">
                    <FaLongArrowAltUp />
                  </button>
                </div>
              </th>
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
