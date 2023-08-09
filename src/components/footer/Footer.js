import React from "react";
import instagram from "../../images/SocialIconsIg.png";
import twiter from "../../images/SocialIconsTw.png";
import youtube from "../../images/SocialIconsYt.png";
import playMarket from "../../images/PlayMarket.png";
import appStore from "../../images/AppStore.png";

import "./Footer.css";

export default function Footer() {
    return(
            <footer className="text-center bg-black text-lg-start text-muted footer">
                <section className="about-page">
                    <div className="container text-center  text-md-start mt-5">
                        <div className="row mt-3 text-white footer-texts">
                            <div className="col-md-2 col-lg-2 col-xl-3 mx-auto mb-4 footer-text">
                                <h6 className="text-uppercase fw-bold mb-4">
                                    Company
                                </h6>
                                <p>
                                    <a href="#" className="text-reset">About Us</a>
                                </p>
                                <p>
                                    <a href="#" className="text-reset">Careers</a>
                                </p>
                                <p>
                                    <a href="#" className="text-reset">Contact Us</a>
                                </p>
                            </div>

                            <div className="col-md-2 col-lg-2 col-xl-3 mx-auto mb-4 footer-text">
                                <h6 className="text-uppercase fw-bold mb-4">
                                    Support
                                </h6>
                                <p>
                                    <a href="#" className="text-reset">Help Center</a>
                                </p>
                                <p>
                                    <a href="#" className="text-reset">Safety Center</a>
                                </p>
                            </div>

                            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4 footer-text">

                                <h6 className="text-uppercase fw-bold mb-4">
                                    Legal
                                </h6>
                                <p>
                                    <a href="#" className="text-reset">Cookies Policy</a>
                                </p>
                                <p>
                                    <a href="#" className="text-reset">Privacy Policy</a>
                                </p>
                                <p>
                                    <a href="#" className="text-reset">Terms of Service</a>
                                </p>
                                <p>
                                    <a href="#" className="text-reset">Dispute resolution</a>
                                </p>
                            </div>

                            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4 footer-text">
                                <h6 className="text-uppercase fw-bold mb-4">Install App</h6>
                                <p><img src={playMarket} alt=""/></p>
                                <p>
                                    <img src={appStore} alt=""/>
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="dataAndPages mt-3 p-4">
                    <div className="container d-flex  justify-content-center justify-content-lg-between">
                        <div className="me-5 d-none d-lg-block">
                            <span>© 2021 LILIES, All rights reserved</span>
                        </div>

                        <div>
                            <a href="#" className="me-4 text-reset">
                                <img src={instagram} alt=""/>
                            </a>
                            <a href="#" className="me-4 text-reset">
                                <img src={twiter} alt=""/>
                            </a>
                            <a href="#" className="me-4 text-reset">
                                <img src={youtube} alt=""/>
                            </a>

                        </div>
                    </div>
                </section>

            </footer>
    )
}