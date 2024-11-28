import React from "react";
import { FaEye } from "react-icons/fa";
import { MdEdit, MdDelete } from "react-icons/md";
import Loader from "./Loader";

const CustomTable = ({comments, openDeleteModal}) => {
  return (
    <>
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
    </>
  );
};

export default CustomTable;
