import React from "react";
import { MdDelete } from "react-icons/md";

const Header = ({
  comments,
  showCount,
  handleGlobalSearch,
  deleteAllComments,
  getAllComments,
  searchKey,
}) => {
  return (
    <div className="header">
      <div className="search-wrapper">
        {comments.length > 0 && (
          <input
            type="search"
            placeholder="Search here..."
            value={searchKey}
            onChange={(e) => handleGlobalSearch(e)}
            className="global-search"
          />
        )}
        {showCount && (
          <h2>
            Total {comments.length} item{comments.length > 1 && "s"} found!
          </h2>
        )}
      </div>

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
  );
};

export default Header;
