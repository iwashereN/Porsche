import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [isLogin, setIsLogin] = useState(true);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isLogin) {
            // Handle login form submission
            axios.post('http://localhost:2000/api/auth/login', { email, password })
                .then(response => {
                    window.location.href = '/profile.html';
                })
                .catch(error => {
                    window.alert("Incorrect email or password");
                });
        } else {
            // Handle signup form submission
            axios.post('http://localhost:2000/api/auth/signup', { name, email, password })
                .then(response => {
                    window.location.href = '/profile.html';
                })
                .catch(error => {
                    window.alert("User already exists");
                });
        }
    };

    const toggleForm = () => {
        setIsLogin(!isLogin);
    };

    return (
        <div className="form-content">
            <div className="login-form" >
                <div className="title">Login</div>
                <form >
                    <div className="input-boxes">
                        <div className="input-box">
                            <i className="fas fa-envelope"></i>
                            <input type="text" id="email" placeholder="Enter your email" value={email} onChange={handleEmailChange} required />
                        </div>
                        <div className="input-box">
                            <i className="fas fa-lock"></i>
                            <input type="password" id="password" placeholder="Enter your password" value={password} onChange={handlePasswordChange} required />
                        </div>
                        <div className="text">
                            <a href="#">Forgot password?</a>
                        </div>
                        <div className="button input-box">
                            <input type="submit" value="Submit" onClick={handleSubmit}/>
                        </div>
                        <div className="text sign-up-text">
                            Don't have an account? <label for="flip" onClick={toggleForm}>Sigup now</label>

                        </div>
                    </div>
                </form>
            </div>
            <div className="signup-form">
                <div className="title">Signup</div>
                <form >
                    <div className="input-boxes">
                        <div className="input-box">
                            <i className="fas fa-user"></i>
                            <input type="text" placeholder="Enter your name" value={name} onChange={handleNameChange} required />
                        </div>
                        <div className="input-box">
                            <i className="fas fa-envelope"></i>
                            <input type="text" placeholder="Enter your email" value={email} onChange={handleEmailChange} required />
                        </div>
                        <div className="input-box">
                            <i className="fas fa-lock"></i>
                            <input type="password" placeholder="Enter your password" value={password} onChange={handlePasswordChange} required />
                        </div>
                        <div className="button input-box">
                            <input type="submit" value="Submit" onClick={handleSubmit}/>
                        </div>
                        <div className="text sign-up-text">
                            Already have an account? <label for="flip" onClick={toggleForm}>Login now</label>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
