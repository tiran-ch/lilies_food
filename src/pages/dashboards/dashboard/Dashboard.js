import React, {useEffect, useState} from "react";
import "./Dashboard.css";
import logo from "../../../images/header-logo.png";
import icon1 from "../../../images/icon1.png";
import icon2 from "../../../images/icon2.png";
import icon3 from "../../../images/icon3.png";
import icon4 from "../../../images/icon4.png";
import user from "../../../images/user-image.png";
import food1 from "../../../images/food1.png";
import food2 from "../../../images/food2.png";
import food3 from "../../../images/food3.png";
import food4 from "../../../images/food4.png";
import food5 from "../../../images/food5.png";
import food6 from "../../../images/food6.png";
import Cart from "../cart/Cart";
import {useDispatch} from "react-redux";
import {foodData} from "../../../utils/utils";
import Profile from "../profile/Profile";
import Food from "../food/Food";
import {db} from "../../../fireabase/Firebase";
import { collection, doc, setDoc, getDocs, query, where, updateDoc} from "firebase/firestore";

export default function Dashboard() {
    const dispatch = useDispatch();
    const [modalIsOpenCart, setIsOpenCart] = useState(false);
    const [OpenFoodModal, setIsOpenFoodModal] = useState(false);

    function foodModal(event) {
        setIsOpenFoodModal(true);
        if(event !== ""){
            const food = foodData.find((foodData) => foodData.food.id == event);
            dispatch({type: "ADD_FOOD", payload: food});
        }
    }

    function closeFoodModal() {
        setIsOpenFoodModal(false);
    }

    function openCartModal() {
        setIsOpenCart(true);
    }

    function closeCartModal() {
        setIsOpenCart(false)
    }

    const addToCart = async (e)=>{
        const productIdToAdd = e.target.parentElement.parentElement.id;

        try {
            const cartQuery = query(collection(db, 'cart'), where('productId', '==', productIdToAdd));
            const cartQuerySnapshot = await getDocs(cartQuery);
            if (cartQuerySnapshot.empty) {
                const newDocRef = doc(collection(db, 'cart'));
                await setDoc(newDocRef, {
                    productId: productIdToAdd,
                    quantity: 1,
                });

                console.log('Item added to cart successfully.');
            } else {
                // const cartItemDocRef = cartQuerySnapshot.docs[0].ref;
                // const cartItemData = cartQuerySnapshot.docs[0].data();
                // const existingQuantity = cartItemData.quantity;
                // await updateDoc(cartItemDocRef, {
                //     quantity: existingQuantity + 1,
                // });
                // console.log('Item quantity updated in cart.');
            }
        } catch (error) {
            console.error('Error adding to cart:', error);
        }


        console.log(e.target.parentElement.parentElement.id)
        const food = foodData.find((foodData) => foodData.food.id == e.target.parentElement.parentElement.id);
        if(food.food.qty === undefined){
            food.food.qty = 1;
            dispatch({type: "ADD_CART_DATA", payload: food});
        }

    };

    return(
        <>
            {/*<Link to="/account?name=netflix">Netflix</Link>*/}
            {/*<Link to="/account?name=zillow-group">Zillow Group</Link>*/}
            <Food closeFoodModal={closeFoodModal}  OpenFoodModal={OpenFoodModal} />
            <Cart closeCartModal={closeCartModal} modalIsOpenCart={modalIsOpenCart}/>
           <Profile/>
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
                                <a href="profile"><img src={icon2} alt=""/>Your Profile</a>
                            </li>
                            <li className="list-item  border-0 d-flex justify-content-between align-items-center">
                                <a href="#"><img src={icon3} alt=""/>Orders</a>
                                <span className="badge text-black bg-success">0</span>
                            </li>
                            <li className="list-item  border-0 d-flex justify-content-between align-items-center"  onClick={openCartModal}>
                                <a href="#"><img src={icon4} alt=""/>Your Cart</a>
                                <span className="badge text-black bg-warning">0</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="user-and-foods container-fluid" >
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
                        <div className="col-xl-3 dashboard-food text-center" id={1} onClick={()=>foodModal(1)}>
                            <img src={food1} alt=""/>
                            <h3>Stir Fry Pasta</h3>
                            <p className="about-food">The in-house pasta and chicken by chef Moose</p>
                            <p className="food-price">N 1,000.00 <a href="#/" onClick={e=> addToCart(e)}>Add to cart</a></p>
                        </div>
                        <div className="col-xl-3 dashboard-food text-center" id={2} onClick={()=>foodModal(2)}>
                            <img src={food2} alt=""/>
                            <h3>Stir Fry Pasta</h3>
                            <p className="about-food">The in-house pasta and chicken by chef Moose</p>
                            <p className="food-price">N 1,000.00 <a href="#/" onClick={e=> addToCart(e)}>Add to cart</a></p>
                        </div>
                        <div className="col-xl-3 dashboard-food text-center" id={3} onClick={()=>foodModal(3)}>
                            <img src={food3} alt=""/>
                            <h3>Stir Fry Pasta</h3>
                            <p className="about-food">The in-house pasta and chicken by chef Moose</p>
                            <p className="food-price">N 1,000.00 <a href="#/" onClick={e=> addToCart(e)}>Add to cart</a></p>
                        </div>
                        <div className="col-xl-3 dashboard-food text-center" id={4} onClick={()=>foodModal(4)}>
                            <img src={food4} alt=""/>
                            <h3>Stir Fry Pasta</h3>
                            <p className="about-food">The in-house pasta and chicken by chef Moose</p>
                            <p className="food-price">N 1,000.00 <a href="#/" onClick={e=> addToCart(e)}>Add to cart</a></p>
                        </div>
                        <div className="col-xl-3 dashboard-food text-center" id={5} onClick={()=>foodModal(5)}>
                            <img src={food5} alt=""/>
                            <h3>Stir Fry Pasta</h3>
                            <p className="about-food">The in-house pasta and chicken by chef Moose</p>
                            <p className="food-price">N 1,000.00 <a href="#/" onClick={e=> addToCart(e)}>Add to cart</a></p>
                        </div>
                        <div className="col-xl-3 dashboard-food text-center" id={6} onClick={()=>foodModal(6)}>
                            <img src={food6} alt=""/>
                            <h3>Stir Fry Pasta</h3>
                            <p className="about-food">The in-house pasta and chicken by chef Moose</p>
                            <p className="food-price">N 1,000.00 <a href="#/" onClick={e=> addToCart(e)}>Add to cart</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}