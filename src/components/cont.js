
import React from 'react';

const Contact = () => {
    return (
        <section className="contact spad">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 col-md-6">
                        <div className="contact__text">
                            <div className="hello">
                                <h2>Social Media Links</h2>
                                <p>
                                    To make requests for further information, contact us via our social channels.
                                    <br /><a href="https://www.facebook.com/porsche/" target="_blank" style={{ color: "black !important" }}>Visit us on Facebook</a>.
                                    <br /><a href="https://www.instagram.com/Porsche/" target="_blank" style={{ color: "black !important" }}>Visit us on Instagram</a>.
                                    <br /><a href="https://twitter.com/Porsche?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor" target="_blank" style={{ color: "black !important" }}>Visit us on Twitter</a>.
                                </p>
                            </div>
                            <ul>
                                <li><span>Phone:</span> (888) 369-9904</li>
                                <li><span>Email:</span> <a href="mailto:info@porschedrive.us">info@porschedrive.us</a></li>
                                <li><span>Hours:</span> Monday – Friday | 9:00 AM – 10:00 PM ET</li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                        <div className="contact__form">
                            <form action="#">
                                <div className="row">
                                    <div className="col-lg-6">
                                        <input type="text" placeholder="Name" />
                                    </div>
                                    <div className="col-lg-6">
                                        <input type="text" placeholder="Email" />
                                    </div>
                                </div>
                                <input type="text" placeholder="Subject" />
                                <textarea placeholder="Your Question"></textarea>
                                <button type="submit" className="site-btn">Submit Now</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Contact;