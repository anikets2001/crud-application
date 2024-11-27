import { LiaCommentSlashSolid } from "react-icons/lia";

const Loader = () => {
  return (
    <div className="loader-container">
      <div>
        <LiaCommentSlashSolid className="comments-icons" />
      </div>
      <p>No comments Found</p>
    </div>
  );
};

export default Loader;
