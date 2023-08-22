import React, {useEffect, useState} from "react";
import Modal from "react-modal";
import {useSelector} from "react-redux";
import { foodData } from "../../../utils/utils";
import {collection, getDocs, query, where} from "@firebase/firestore";
import {db} from "../../../fireabase/Firebase";
import "./Cart.css"

export default function Cart({modalIsOpenCart, closeCartModal}) {
    const [cartDates,setCartDates] = useState([]);

    const customStyles = {
        overlay: {
            backgroundColor: "rgba(196, 196, 196, 0.42)"
        },
        content: {
            top: '50%',
            left: '70%',
            right: 'auto',
            bottom: 'auto',
            width: `60%`,
            height: '100%',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };



    const CartData = useSelector((state) => state.Cart.cart);

    const consolidatedFilterResults = [];

    const yourCart = async ()=>{
        const cartQuery = query(collection(db, 'cart'));
        const cartQuerySnapshot = await getDocs(cartQuery);

        cartQuerySnapshot.forEach((doc) => {
            const data = doc.data().productId; // Get the data of the document

            const filter = foodData.filter((filterFood) => filterFood.food.id == data);

            if (filter.length > 0) {
                consolidatedFilterResults.push(...filter); // Concatenate the filter results
                console.log("Updated consolidatedFilterResults:", consolidatedFilterResults);

            }
        });

        setCartDates(consolidatedFilterResults);
        console.log("consolidatedFilterResults length:", consolidatedFilterResults.length);

    };

    useEffect(()=>{
        // console.log(cartDates.length)
    },[cartDates]);

    useEffect(()=>{
        yourCart()
    },[modalIsOpenCart]);

    return(
        <>
            <Modal
                isOpen={modalIsOpenCart}
                onRequestClose={closeCartModal}
                style={customStyles}
                ariaHideApp={false}
                contentLabel="Example Modal"
            >
                <div className="container-fluid modal-container">
                    <div className="row">
                        <div className="col-12 cart-title">
                            <h3>Your Cart</h3>
                        </div>
                        <div className="col-12 mt-5 d-flex">
                            <div className="col-4">
                                <p>Item</p>
                            </div>
                            <div className="col-3">
                                <p>Qty</p>
                            </div>
                            <div className="col-3">
                                <p>Unit Price</p>
                            </div>
                            <div className="col-3">
                                <p>Sub-total</p>
                            </div>
                        </div>
                        <div className="col-12 mt-4 all-cart-data">
                            {
                                cartDates.length !== 0 &&
                                cartDates.map((data)=>{
                                    console.log(data);
                                    return(
                                        <div className="cart-data w-100 d-flex">
                                            <div className="cart-food-img">
                                                <img src={data.food.img} alt=""/>
                                                <div>
                                                    <h3>{data.food.title}</h3>
                                                </div>
                                            </div>
                                            <div className="cart-food-data ">
                                                <h3>3</h3>
                                                <h3>{data.food.price}</h3>
                                                <h3>N 3,000.00</h3>

                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    )
}