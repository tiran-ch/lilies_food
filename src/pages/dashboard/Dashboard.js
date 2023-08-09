import React, {useState, useEffect} from "react";
import "./Dashboard.css";
import logo from "../../images/header-logo.png";
import icon1 from "../../images/icon1.png";
import icon2 from "../../images/icon2.png";
import icon3 from "../../images/icon3.png";
import icon4 from "../../images/icon4.png";
import user from "../../images/user-image.png";
import food1 from "../../images/food1.png";
import food2 from "../../images/food2.png";
import food3 from "../../images/food3.png";
import food4 from "../../images/food4.png";
import food5 from "../../images/food5.png";
import food6 from "../../images/food6.png";
import Modal from 'react-modal';
import Cart from "../cart/Cart";
import {useDispatch} from "react-redux";
import {foodData} from "../../utils/utils";


export default function Dashboard() {
    const dispatch = useDispatch();
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [modalAnimation, setModalAnimation] = useState(1);
    const [modalWorking, setModalWorking] = useState();


useEffect(() => {
    if (modalAnimation <= 100){
        setModalAnimation(modalAnimation + 1);
        //
        // setTimeout(()=>{
        //     // setModalAnimation(modalAnimation + 1);
        //     console.log(modalAnimation)
        // },1000)
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

    const addToCart = (event)=>{
        console.log(event)
        console.log(foodData)
        // dispatch({type: "ADD_CART_DATA", payload: })
    };

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
            {/*<Cart/>*/}
            <div className="dashboard">
                <div className="menu ">
                    <div className="menu-bar">
                        <div className="logo">
                            <img src={logo} alt=""/>
                            <h1>Lilies</h1>
                        </div>
                        <ul className="list-group ">
                            <li className="list-item border-0  d-flex justify-content-between align-items-center">
                                <a href="#"><img src={icon1} alt=""/>Dashboard</a>
                            </li>
                            <li className="list-item d-flex border-0 justify-content-between align-items-center">
                                <a href="#"><img src={icon2} alt=""/>Your Profile</a>
                            </li>
                            <li className="list-item  border-0 d-flex justify-content-between align-items-center">
                                <a href="#"><img src={icon3} alt=""/>Orders</a>
                                <span className="badge text-black bg-success">0</span>
                            </li>
                            <li className="list-item  border-0 d-flex justify-content-between align-items-center"  onClick={openModal}>
                                <a href="#"><img src={icon4} alt=""/>Your Cart</a>
                                <span className="badge text-black bg-warning">0</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="user-and-foods container-fluid">
                    <div className="row user-and-foods-block d-flex justify-content-between w-100">
                        <div className="col user-dara">
                            <h2>Good morning, Oghenevwede!</h2>
                            <p>What delicious meal are you craving today?</p>
                        </div>
                        <div className="col user-image d-flex align-items-center justify-content-end">
                            <img src={user} alt=""/>
                        </div>
                    </div>
                    <div className="row dashboard-foods">
                        <div className="col-xl-3 dashboard-food text-center">
                            <img src={food1} alt=""/>
                            <h3>Stir Fry Pasta</h3>
                            <p className="about-food">The in-house pasta and chicken by chef Moose</p>
                            <p className="food-price">N 1,000.00 <a href="#" onClick={()=> addToCart(1)}>Add to cart</a></p>
                        </div>
                        <div className="col-xl-3 dashboard-food text-center">
                            <img src={food2} alt=""/>
                            <h3>Stir Fry Pasta</h3>
                            <p className="about-food">The in-house pasta and chicken by chef Moose</p>
                            <p className="food-price">N 1,000.00 <a href="#" onClick={()=> addToCart(2)}>Add to cart</a></p>
                        </div>
                        <div className="col-xl-3 dashboard-food text-center">
                            <img src={food3} alt=""/>
                            <h3>Stir Fry Pasta</h3>
                            <p className="about-food">The in-house pasta and chicken by chef Moose</p>
                            <p className="food-price">N 1,000.00 <a href="#" onClick={()=> addToCart(3)}>Add to cart</a></p>
                        </div>
                        <div className="col-xl-3 dashboard-food text-center">
                            <img src={food4} alt=""/>
                            <h3>Stir Fry Pasta</h3>
                            <p className="about-food">The in-house pasta and chicken by chef Moose</p>
                            <p className="food-price">N 1,000.00 <a href="#" onClick={()=> addToCart(4)}>Add to cart</a></p>
                        </div>
                        <div className="col-xl-3 dashboard-food text-center">
                            <img src={food5} alt=""/>
                            <h3>Stir Fry Pasta</h3>
                            <p className="about-food">The in-house pasta and chicken by chef Moose</p>
                            <p className="food-price">N 1,000.00 <a href="#" onClick={()=> addToCart(5)}>Add to cart</a></p>
                        </div>
                        <div className="col-xl-3 dashboard-food text-center">
                            <img src={food6} alt=""/>
                            <h3>Stir Fry Pasta</h3>
                            <p className="about-food">The in-house pasta and chicken by chef Moose</p>
                            <p className="food-price">N 1,000.00 <a href="#" onClick={()=> addToCart(6)}>Add to cart</a></p>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}