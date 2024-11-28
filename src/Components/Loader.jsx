import { LiaCommentSlashSolid } from "react-icons/lia";

const Loader = () => {
  return (
    <div className="loader-container">
      <LiaCommentSlashSolid className="comments-icons" />
      <p>No comments Found</p>
    </div>
  );
};

export default Loader;
