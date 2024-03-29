import React, {useEffect, useRef, useState} from "react";
import "./Dashboard.css";
import logo from "../../../images/header-logo.png";
import icon1 from "../../../images/icon1.png";
import icon2 from "../../../images/icon2.png";
import icon3 from "../../../images/icon3.png";
import icon4 from "../../../images/icon4.png";
import user from "../../../images/user-image.png";
import Cart from "../cart/Cart";
import {useDispatch} from "react-redux";
import {foodData} from "../../../utils/utils";
import Food from "../food/Food";
import {db} from "../../../fireabase/Firebase";
import {collection, doc, setDoc, getDocs, query, where} from "firebase/firestore";
import Orders from "../orders/Orders";
import { getStorage, ref, uploadBytes, getDownloadURL} from "firebase/storage";

export default function Dashboard() {
    const storage = getStorage();
    const [userImages, getUserImages] = useState();
    const dispatch = useDispatch();
    const [modalIsOpenCart, setIsOpenCart] = useState(false);
    const [OpenFoodModal, setIsOpenFoodModal] = useState(false);
    const [yourCartLength, setYourCartLength] = useState();
    const [openOrdersModal, setOpenOrdersModal] = useState(false);
    const [userName, getUserName] = useState();

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
        const userId = localStorage.getItem("userId");

        try {
            const cartQuery = query(collection(db, 'cart'), where('productId', '==', productIdToAdd));
            const cartQuerySnapshot = await getDocs(cartQuery);
            if (cartQuerySnapshot.empty || userId !== cartQuerySnapshot.docs[0].data().uId) {
                const newDocRef = doc(collection(db, 'cart'));
                await setDoc(newDocRef, {
                    productId: productIdToAdd,
                    quantity: 1,
                    uId: JSON.parse(userId)
                });
            }
        } catch (error) {
            console.error('Error adding to cart:', error);
        }
    };

    const cartLength = (length)=>{
        setYourCartLength(length)
    };


    let getUserData = async ()=>{
        let userId = localStorage.getItem("userId");
        const cartQuery = query(collection(db, 'users'), where('uid', '==', JSON.parse(userId)));
        const cartQuerySnapshot = await getDocs(cartQuery);
        getUserName(cartQuerySnapshot.docs[0].data().userFullName);
        const cartItemDocRef = cartQuerySnapshot.docs[0].ref;
    };

    useEffect(()=>{
        getUserData()
    },[]);


    const openOrder = ()=>{
        setOpenOrdersModal(true)
    };

    function handleSubmit(e) {
        e.preventDefault();

    }

    const addUserImage =(e)=>{
            getUserImages(URL.createObjectURL(e.target.files[0]))
    };


    return(
        <>
            <Food closeFoodModal={closeFoodModal}  OpenFoodModal={OpenFoodModal} />
            <Cart closeCartModal={closeCartModal} cartLength={cartLength} setIsOpenCart={setIsOpenCart} modalIsOpenCart={modalIsOpenCart}/>
            <Orders openOrdersModal={openOrdersModal} setOpenOrdersModal={setOpenOrdersModal}/>

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
                            <li className="list-item  border-0 d-flex justify-content-between align-items-center" onClick={()=>openOrder()}>
                                <a href="#"><img src={icon3} alt=""/>Orders</a>
                                <span className="badge text-black bg-success">0</span>
                            </li>
                            <li className="list-item  border-0 d-flex justify-content-between align-items-center"  onClick={openCartModal}>
                                <a href="#"><img src={icon4} alt=""/>Your Cart</a>
                                <span className="badge text-black bg-warning">{yourCartLength}</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="user-and-foods container-fluid" >
                    <div className="row user-and-foods-block d-flex justify-content-between w-100">
                        <div className="col user-dara">
                            <h2>Good morning, {userName}!</h2>
                            <p>What delicious meal are you craving today?</p>
                        </div>
                        <div className="col d-flex align-items-center justify-content-end">
                           <div className="user-image">
                               <img src={userImages} alt=""/>
                               <input type="file"  onChange={(e)=>addUserImage(e)}/>
                           </div>
                        </div>
                    </div>
                    <div className="row dashboard-foods">
                        {
                            foodData !== undefined &&
                                foodData.map((data)=> (
                            <div key={data.food.id} className="col-xl-3 dashboard-food text-center" id={data.food.id} onClick={()=>foodModal(data.food.id)}>
                            <img src={data.food.img} alt=""/>
                            <h3>{data.food.img.title}</h3>
                            <p className="about-food">The in-house pasta and chicken by chef Moose</p>
                            <p className="food-price">N {data.food.price}<a href="#/" onClick={e=> addToCart(e)}>Add to cart</a></p>
                            </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    )
}