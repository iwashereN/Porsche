import React from 'react';

const Footer = () => {
    return (
        <footer className="footer set-bg" data-setbg="img/footer-bg.jpg">
            <div className="container">
                <div className="footer__contact">
                    <div className="row">
                        <div className="col-lg-6 col-md-6">
                            <div className="footer_contact_title">
                                <h2>Contact Us Now!</h2>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                            <div className="footer_contact_option">
                                <div className="option__item"><i className="fa fa-phone"></i> (+12) 345 678 910</div>
                                <div className="option__item email"><i className="fa fa-envelope-o"></i> Porsche@gmail.com</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-4 col-md-4">
                        <div className="footer__about">
                        <div className="footer__logo">
    <a href="#"><img src="https://pngimg.com/uploads/porsche_logo/porsche_logo_PNG6.png" alt="" /></a>
</div>

                            <p>
                                Any questions? Let us know in store at 625 Gloria Union, California, United Stated or call us
                                on (+1) 96 123 8888
                            </p>
                            <div className="footer__social">
                                <a href="https://www.facebook.com/porsche/" className="facebook"><i className="fa fa-facebook"></i></a>
                                <a href="https://twitter.com/Porsche" className="twitter"><i className="fa fa-twitter"></i></a>
                                <a href="https://www.porsche.com/usa/" className="google"><i className="fa fa-google"></i></a>
                                <a href="https://www.instagram.com/porsche?igsh=MmNndTRxbDQ4dXE5" className="instagram"><i className="fa fa-instagram"></i></a>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-2 offset-lg-1 col-md-3">
                        <div className="footer__widget">
                            <h5>Infomation</h5>
                            <ul>
                                <li><a href="#"><i className="fa fa-angle-right"></i> Purchase</a></li>
                                <li><a href="#"><i className="fa fa-angle-right"></i> Payemnt</a></li>
                                <li><a href="#"><i className="fa fa-angle-right"></i> Shipping</a></li>
                                <li><a href="#"><i className="fa fa-angle-right"></i> Return</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-2 col-md-3">
                        <div className="footer__widget">
                            <h5>Infomation</h5>
                            <ul>
                                <li><a href="#"><i className="fa fa-angle-right"></i> Hatchback</a></li>
                                <li><a href="#"><i className="fa fa-angle-right"></i> Sedan</a></li>
                                <li><a href="#"><i className="fa fa-angle-right"></i> SUV</a></li>
                                <li><a href="#"><i className="fa fa-angle-right"></i> Crossover</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6"></div>
                </div>
                {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
                {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
            </div>
        </footer>
    );
}

export default Footer;