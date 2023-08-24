import React from "react";
import Modal from "react-modal";
import "./Profile.css";

export default function Profile({openProfileModal, setOpenProfileModal}) {

    const customStyles = {
        overlay: {
            backgroundColor: "rgba(196, 196, 196, 0.42)"
        },
        content: {
            top: '50%',
            left: '85.4%',
            right: 'auto',
            bottom: 'auto',
            width: `558px`,
            height: '100%',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };

    function closeModal() {
        setOpenProfileModal(false);
    }

    function profileForm(event) {
        event.preventDefault();
    }

  return(
      <div className="profile">
          <Modal
              isOpen={openProfileModal}
              onRequestClose={closeModal}
              style={customStyles}
              ariaHideApp={false}
              contentLabel="Example Modal"
          >
              <div className="profile-data">
                  <h3>Checkout</h3>
                  <form className="profile-form" onSubmit={profileForm}>
                      <input type="number" className="form-control" aria-describedby="emailHelp" placeholder="Card Number"/>
                      <input type="text" className="form-control" aria-describedby="emailHelp" placeholder="Exp Date"/>
                      <input type="text" className="form-control" aria-describedby="emailHelp" placeholder="CVV/CVV2"/>
                      <input type="number" className="form-control" aria-describedby="emailHelp" placeholder="Card Pin"/>
                      <button type="button" className="btn btn-success MakePayment">Make Payment</button>

                  </form>
              </div>
          </Modal>
      </div>
  )
}