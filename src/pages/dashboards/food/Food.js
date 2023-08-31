import React, {useEffect, useState} from "react";
import Modal from 'react-modal';
import "./Food.css";
import {useSelector, useDispatch} from "react-redux";
import {setDoc, collection, getDoc, doc, updateDoc, query, where, getDocs} from "firebase/firestore";
import { db } from "../../../fireabase/Firebase";


export default function Food({OpenFoodModal, closeFoodModal}) {
    const FoodItem = useSelector((state) => state.Food.food.food);
    const [quantity, setQuantity] = useState(1);

    const customStyles = {
        overlay: {
            backgroundColor: "rgba(196, 196, 196, 0.42)"
        },
        content: {
            top: '50%',
            left: '80%',
            right: 'auto',
            bottom: 'auto',
            width: `40%`,
            height: '100%',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };


    useEffect( ()=>{
        setQuantity(1)
    },[OpenFoodModal]);

    const addToCart = async (foodId)=>{
        const userId = localStorage.getItem("userId");
        setQuantity(1);
        try {
            // Check if the product ID exists in the cart collection
            const cartQuery = query(collection(db, 'cart'), where('productId', '==', foodId));
            const cartQuerySnapshot = await getDocs(cartQuery);
            if (cartQuerySnapshot.empty) {
                // Product ID doesn't exist in the cart, so add it
                const newDocRef = doc(collection(db, 'cart'));
                await setDoc(newDocRef, {
                    productId: foodId,
                    quantity: quantity,
                    uId: JSON.parse(userId),
                });

                console.log('Item added to cart successfully.');
            }else {

                const cartItemDocRef = cartQuerySnapshot.docs[0].ref;
                const cartItemData = cartQuerySnapshot.docs[0].data().quantity;
                await updateDoc(cartItemDocRef, {
                    quantity: cartItemData + quantity,
                });

            }
        } catch (error) {
            console.error('Error adding to cart:', error);
        }
    };


    const increment = async (foodId)=>{
        setQuantity(quantity + 1);
    };

    const decrement = async (foodId)=> {
        if(quantity > 1){
            setQuantity(quantity - 1);
        }
    };

    return (
        <div>
            <Modal
                isOpen={OpenFoodModal}
                onRequestClose={closeFoodModal}
                style={customStyles}
                ariaHideApp={false}
                contentLabel="Example Modal"
            >
                {
                    FoodItem !== undefined &&
                    <div className="container-fluid food-modal">
                        <img src={FoodItem.img} alt=""/>
                        <div className="food-data text-center">
                            <h3>{FoodItem.title}</h3>
                            <p>{FoodItem.about}</p>
                        </div>
                        <div className="food-making">
                            <h3>{FoodItem.make}</h3>
                            <h3>{FoodItem.makeTime}</h3>
                            <h3>{FoodItem.Quantity}</h3>
                        </div>
                        <div className="cart-and-qty">
                            <div className="food-quantity">
                                <button onClick={()=> decrement(FoodItem.id)}>-</button>
                                <p>{quantity}</p>
                                <button onClick={()=> increment(FoodItem.id)}>+</button>
                            </div>
                            <div className="add-to-cart">
                                <button type="button" className="btn btn-success" onClick={()=>addToCart(FoodItem.id)}>Add to cart</button>
                            </div>

                        </div>

                    </div>
                }
            </Modal>
        </div>
    )
}