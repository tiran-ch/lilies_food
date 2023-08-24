import React, {useState} from "react";
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
import { collection, doc, setDoc, getDocs, query, where, updateDoc} from "firebase/firestore";
import Orders from "../orders/Orders";

export default function Dashboard() {
    const dispatch = useDispatch();
    const [modalIsOpenCart, setIsOpenCart] = useState(false);
    const [OpenFoodModal, setIsOpenFoodModal] = useState(false);
    const [yourCartLength, setYourCartLength] = useState();
    const [openOrdersModal, setOpenOrdersModal] = useState(false);

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
            }
        } catch (error) {
            console.error('Error adding to cart:', error);
        }
        const food = foodData.find((foodData) => foodData.food.id == e.target.parentElement.parentElement.id);
        if(food.food.qty === undefined){
            food.food.qty = 1;
            dispatch({type: "ADD_CART_DATA", payload: food});
        }
    };

    const cartLength = (length)=>{
        setYourCartLength(length)
    };


    // const addProducts = async ()=>{
    //     const newDocRef = doc(collection(db, 'praducts'));
    //     await setDoc(newDocRef, {
    //         img: food1,
    //         price: 1000.00,
    //         title: "Stir Fry Pasta",
    //         about: "Just have a single bite of this Black Forest pastry and it will all make a proper sense to you." +
    //             " The kick of cherry and rich chocolate of this super light, airy pastry will definitely make you feel \"wow\"." +
    //             " The perfect combination of cherry cream and rich chocolate can provide the ultimate fulfillment to your dessert craving.\n",
    //         make: "NGN 2000.00",
    //         makeTime: "10-20 Mins",
    //         Quantity: "10 Pcs Avail",
    //         id: "1",
    //     });
    //     };
    //
    // useEffect(()=>{
    //     addProducts()
    // },[]);

    const openOrder = ()=>{
        setOpenOrdersModal(true)
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
                                <a href="profile"><img src={icon2} alt=""/>Your Profile</a>
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
                            <h2>Good morning, Oghenevwede!</h2>
                            <p>What delicious meal are you craving today?</p>
                        </div>
                        <div className="col user-image d-flex align-items-center justify-content-end">
                            <img src={user} alt=""/>
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