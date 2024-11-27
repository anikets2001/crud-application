import "./App.css";
import { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { MdEdit, MdDelete } from "react-icons/md";

function App() {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const getAllComments = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/comments"
        );
        const json = await response.json();
        setComments(json); // Update the state
        localStorage.setItem("comments", JSON.stringify(json));
      } catch (error) {
        console.error(error);
      }
    };

    getAllComments();
  }, []);

  const deleteAllComments = () => {
    localStorage.clear();
    setComments([]);
  };

  const deleteComment = (id) => {
    const updatedComments = comments.filter((comment) => comment.id !== id);
    setComments(updatedComments);
    localStorage.setItem("comments", JSON.stringify(updatedComments));
  };

  return (
    <div className="container">
      <div className="header">
        <button onClick={deleteAllComments}>Delete all comments</button>
      </div>
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
                  <button onClick={() => deleteComment(comment?.id)}>
                    <MdDelete className="delete" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
