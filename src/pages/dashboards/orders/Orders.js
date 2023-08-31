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
                    <div className="row">
                        <div className="col-12 cart-title mt-5">
                            <h3>Your Orders</h3>
                        </div>
                        <div className="col-12 mt-5 d-flex">
                            <div>
                                <p>Item</p>
                            </div>
                            <div className="about-cart-data">
                                <div>
                                    <p>Qty</p>
                                </div>
                                <div>
                                    <p>Unit Price</p>
                                </div>
                                <div>
                                    <p>Sub-total</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal>
            </div>
        </div>
    )
}