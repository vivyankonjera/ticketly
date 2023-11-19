import { useState } from "react";

const ImageModal = ({ toggleImageModal, url }) => {
    return (
        <div className='modal'>
            <div className='overlay' onClick={toggleImageModal}>
                <div className='modalContent'>
                    <img className='modalImage' src={url} alt='' />
                    <button className='closeModal' onClick={toggleImageModal}>
                        X
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ImageModal;
