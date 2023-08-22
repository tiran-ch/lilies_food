import React, {useEffect, useState} from "react";
import Modal from "react-modal";
import "./Profile.css";

export default function Profile() {
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [modalAnimation, setModalAnimation] = useState(1);
    const [modalWorking, setModalWorking] = useState();

    useEffect(() => {
        if (modalAnimation <= 45){
            setModalAnimation(modalAnimation + 1);
        }
    }, [modalWorking, modalAnimation]);


    const customStyles = {
        overlay: {
            backgroundColor: "rgba(196, 196, 196, 0.42)"
        },
        content: {
            top: '50%',
            left: '77%',
            right: 'auto',
            bottom: 'auto',
            width: `${modalAnimation}%`,
            height: '100%',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };

    function openModal() {
        setModalWorking(true);
        if(modalAnimation === true){
            setModalWorking(false);
            setModalAnimation(1)

        }else {
            setModalWorking(true);
            setModalAnimation(1)
        }
        setIsOpen(true);
    }


    function closeModal() {
        setIsOpen(false);
    }

    function profileForm(event) {
        event.preventDefault();

    }

  return(
      <div className="profile">
          <Modal
              isOpen={modalIsOpen}
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
          <button onClick={openModal}>profile Module</button>
      </div>
  )
}