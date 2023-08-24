import React from "react";
import Modal from "react-modal";
import {foodData} from "../../../utils/utils";

export default function Orders({openOrdersModal, setOpenOrdersModal}) {

    const customStyles = {
        overlay: {
            backgroundColor: "rgba(196, 196, 196, 0.42)"
        },
        content: {
            top: '50%',
            left: '75.1%',
            right: 'auto',
            bottom: 'auto',
            width: `50%`,
            height: '100%',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };

    function closeModal() {
        setOpenOrdersModal(false);
    }

    return(
        <div className="orders">
            <div className="profile">
                <Modal
                    isOpen={openOrdersModal}
                    onRequestClose={closeModal}
                    style={customStyles}
                    ariaHideApp={false}
                    contentLabel="Example Modal"
                >
                    <h1>Orders</h1>
                </Modal>
            </div>
        </div>
    )
}