import React from "react";
import PropTypes from "prop-types"; // Import prop-types for validation

const CustomModal = ({ isOpen, onClose, title, children, submitButton }) => {
  if (!isOpen) return null;

  return (
    <div className="CustomModal-overlay">
      <div className="CustomModal-container">
        <div className="CustomModal-header">
          <h2>{title}</h2>
          <button type="button" className="close-button" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="CustomModal-body">{children}</div>
        <div className="modal-footer">
          <div className="modal-actions">
            <button onClick={onClose}>Cancel</button>
            {submitButton}
          </div>
        </div>
      </div>
    </div>
  );
};

CustomModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
};

export default CustomModal;
