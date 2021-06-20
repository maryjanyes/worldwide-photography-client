import React from 'react';

const ModalComponent = ({ style, children, closeModal, modalRef }) => {
    return (
        <div className="modal-container">
            <button onClick={closeModal} className="modal-close-btn" ref={modalRef}></button>
            <div style={style} className="modal-content">
                {children}
            </div>
        </div>
    );
};

export default ModalComponent;
