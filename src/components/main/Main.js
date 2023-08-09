import React from "react";
import "./Main.css";
import AppStore from "../../images/AppStore.png";
import PlayMarket from "../../images/PlayMarket.png";
import orderFood from "../../images/order-food.png";
import specialMeals1 from "../../images/specialMeals1.png"
import specialMeals2 from "../../images/specialMeals2.png"
import specialMeals3 from "../../images/specialMeals3.png"


export default function Main() {
    return (
        <main>
        <div className="container">
            <div className="row">
                <div className="col-md orderFood-text">
                    <h1>Order food anytime, anywhere</h1>
                    <p>Browse from our list of specials to place your order and have
                        food delivered to you in no time. Affordable, tasty and fast!</p>
                    <div className="d-flex gap-2">
                        <img src={PlayMarket} alt=""/>
                        <img src={AppStore} alt=""/>
                    </div>
                </div>
                <div className="col-md mt-5 orderFood-image justify-content-start">
                    <img src={orderFood} alt=""/>
                </div>
            </div>
        </div>
            <div className="special-meals ">
               <div className="specialMeals-text">
                   <h3>Special Meals of the day!</h3>
                   <p>Check our sepecials of the day and get discounts on all our meals
                       and swift delivery to what ever location within Ilorin.</p>
               </div>
                <div className="container">
                    <div className="row specialMeals-foods">
                        <div className="col-md specialMeals-food text-center mb-5">
                            <img src={specialMeals2} alt=""/>
                            <h4>Stir fry Pasta</h4>
                            <p>Stir fry pasta yada yada yada because of Sesan</p>
                        </div>
                        <div className="col-md specialMeals-food text-center">
                            <img src={specialMeals1} alt=""/>
                            <h4>Stir fry Pasta</h4>
                            <p>Stir fry pasta yada yada yada because of Sesan</p>
                        </div>
                        <div className="col-md specialMeals-food text-center">
                            <img src={specialMeals2} alt=""/>
                            <h4>Stir fry Pasta</h4>
                            <p>Stir fry pasta yada yada yada because of Sesan</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container get-update">
                <div className="row getUpdate-datas">
                    <div className="col-lg getUpdate-text">
                        <h3>Get notified when we update!</h3>
                        <p>Get notified when we add new items to our specials menu, update our price list of have promos!</p>
                    </div>
                    <div className="col-lg">
                        <div className="d-flex mb-3 gap-2 getUpdate-form">
                            <input type="text" className="form-control" placeholder="gregphillips@gmail.com"
                                  aria-describedby="basic-addon2"/>
                                <div className="input-group-append">
                                    <button type="button" className="btn btn-secondary">Get notified</button>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}