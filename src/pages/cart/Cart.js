import React, {useEffect, useState} from "react";
import Modal from "react-modal";

export default function Cart(props) {
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [modalAnimation, setModalAnimation] = useState(1);
    const [modalWorking, setModalWorking] = useState();



    useEffect(() => {
        console.log("aaaaaaa")
        if (modalAnimation <= 100){
            setModalAnimation(modalAnimation + 1);
            setTimeout(()=>{
                console.log(modalAnimation)
            },1000)
        }
    }, [modalWorking, modalAnimation]);




    const customStyles = {
        overlay: {
            backgroundColor: "rgba(196, 196, 196, 0.42)"
        },
        content: {
            top: '50%',
            left: '100%',
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


    return(
        <>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                ariaHideApp={false}
                contentLabel="Example Modal"
            >

            </Modal>
        </>
    )
}