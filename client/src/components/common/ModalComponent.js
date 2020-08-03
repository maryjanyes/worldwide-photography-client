import React from 'react';

const ModalComponent = ({ style, children, closeModal }) => {
    return (
        <React.Fragment>
            <button onClick={closeModal}>-</button>
            <div style={style}>
                {children}
            </div>
        </React.Fragment>
    );
};

export default ModalComponent;
