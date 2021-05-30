import React from 'react';

const ModalComponent = ({ style, children, closeModal, modalRef }) => {
    return (
        <React.Fragment>
            <button onClick={closeModal} className="close-modal-btn" ref={modalRef}></button>
            <div style={style} className="modal-content">
                {children}
            </div>
        </React.Fragment>
    );
};

export default ModalComponent;
