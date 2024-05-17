import React from 'react';

const Header = () => {
    return (
        <div className="header">
            <div className="header__top">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-7">
                            <ul className="header_top_widget">
                                <li><i className="fa fa-clock-o"></i> Week day: 08:00 am to 18:00 pm</li>
                                <li><i className="fa fa-envelope-o"></i> Info.colorlib@gmail.com</li>
                            </ul>
                        </div>
                        <div className="col-lg-5">
                            <div className="header_top_right">
                                <div className="header_top_phone">
                                    <i className="fa fa-phone"></i>
                                    <span>(+12) 345 678 910</span>
                                </div>
                                <div className="header_top_social">
                                    <a href="#"><i className="fa fa-facebook"></i></a>
                                    <a href="#"><i className="fa fa-twitter"></i></a>
                                    <a href="#"><i className="fa fa-google"></i></a>
                                    <a href="#"><i className="fa fa-instagram"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-lg-2">
                        <div className="header__logo">
                            <a href="./index.html"><img src="img/logo.png" alt="" /></a>
                        </div>
                    </div>
                    <div className="col-lg-10">
                        <div className="header__nav">
                            <nav className="header__menu">
                                <ul>
                                    <li className="active"><a href="./index.html">Home</a></li>
                                    <li><a href="./about.html">About</a></li>
                                    <li><a href="./contact.html">Contact</a></li>
                                </ul>
                            </nav>
                            <div className="header_nav_widget">
                                <div className="header_navwidget_btn">
                                    <a href="#"><i className="fa fa-cart-plus"></i></a>
                                    <a href="#" className="search-switch"><i className="fa fa-search"></i></a>
                                </div>
                                <a href="#" className="primary-btn">Add Car</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="canvas__open">
                    <span className="fa fa-bars"></span>
                </div>
            </div>
        </div>
    );
}

export default Header;