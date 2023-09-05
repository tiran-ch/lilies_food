import React, {useEffect, useState} from "react";
import Modal from "react-modal";
import {useSelector} from "react-redux";
import { foodData } from "../../../utils/utils";
import {collection, getDocs, query, where, deleteDoc} from "@firebase/firestore";
import {db} from "../../../fireabase/Firebase";
import "./Cart.css"
import Profile from "../profile/Profile";

export default function Cart({modalIsOpenCart, cartLength, closeCartModal, setIsOpenCart}) {
    const [cartDates,setCartDates] = useState([]);
    const [openProfileModal, setOpenProfileModal] = useState(false);

    const customStyles = {
        overlay: {
            backgroundColor: "rgba(196, 196, 196, 0.42)"
        },
        content: {
            top: '50%',
            left: '75%',
            right: 'auto',
            bottom: 'auto',
            width: `50%`,
            height: '100%',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };

    const consolidatedFilterResults = [];

    const yourCart = async ()=>{
        const userId = localStorage.getItem("userId");
        // const cartQuery = query(collection(db, 'cart'));
        const cartQuery = query(collection(db, 'cart'), where('uId', '==', JSON.parse(userId)));
        const cartQuerySnapshot = await getDocs(cartQuery);
        cartQuerySnapshot.forEach((doc) => {
            const data = doc.data().productId; // Get the data of the document
            const qty = doc.data().quantity; // Get the data of the document
            const filter = foodData.filter((filterFood) => filterFood.food.id == data);
            if (filter.length > 0) {
                filter[0].food.quantity = qty;
                consolidatedFilterResults.push(...filter); // Concatenate the filter results
            }
        });
        setCartDates(consolidatedFilterResults);
    };


    useEffect(()=>{
        yourCart()
    },[modalIsOpenCart, cartLength]);


    useEffect(()=>{
        cartLength(cartDates.length);
    },[cartDates]);

    const makePayment = ()=>{
        if (cartDates.length !== 0){
            setOpenProfileModal(true);
            setIsOpenCart(false)
        }
    };

    const removeFood = async (id)=>{
        const deleteData = cartDates.filter((data)=> data.food.id !== id);
        setCartDates(deleteData);
        const cartQuery = query(collection(db, 'cart'), where('productId', '==', id));
        const cartQuerySnapshot = await getDocs(cartQuery);
            const docToDelete = cartQuerySnapshot.docs[0].ref;
            await deleteDoc(docToDelete);
    };

    return(
        <>
            <Profile openProfileModal={openProfileModal} setOpenProfileModal={setOpenProfileModal}/>
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
                            <div className="col-3 pl-4 d-flex justify-content-start">
                                <p>Item</p>
                            </div>
                           <div className="about-cart-data d-flex w-100 justify-content-end">
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
                        </div>
                        <div className="col-12 mt-4 all-cart-data ">
                            {
                                cartDates.length !== 0 &&

                                cartDates.map((data)=>{
                                    const findData = foodData.find((filterFood) => filterFood.food.id == data.food.id);
                                    // console.log(findData.food.price)
                                    return(
                                        <div key={data.food.id} className="cart-data col-12 w-100 d-flex">
                                            <div className="cart-food-img col-4">
                                                <img src={data.food.img} alt=""/>
                                                <div>
                                                    <div>
                                                        <h3>{data.food.title}</h3>
                                                    </div>
                                                    <p onClick={()=>removeFood(data.food.id)}>Remove</p>
                                                </div>
                                            </div>
                                            <div className="cart-food-data col-8 d-flex justify-content-center">
                                                <h3 className="col-4 d-flex justify-content-center">{findData.food.quantity}</h3>
                                                <h3 className="col-4 d-flex justify-content-center">N {data.food.price}</h3>
                                                <h3 className="col-4 d-flex justify-content-center">N {findData.food.price * findData.food.quantity}</h3>
                                            </div>

                                        </div>
                                    )
                                })
                            }
                            <div className="Checkout">
                                <button type="button" onClick={()=>makePayment()}
                                        className="btn btn-success btn-lg btn-block">Checkout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    )
}
