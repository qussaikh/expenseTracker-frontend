import React, { useState } from 'react';
import LoginComponent from './LoginComponent';
import { isUserLoggedIn } from '../services/AuthService';
import './style.css'
import myImage from '../images/banner1.webp';


const HomeComponent = () => {
    const [showLogin, setShowLogin] = useState(false);
    const isAuth = isUserLoggedIn();

    const handleLoginButtonClick = () => {
        if (isAuth) {
            alert("Du är redan inloggad.");
        } else {
            setShowLogin(true);
        }
    };

    return (
        <div className='background-custom'>
        {showLogin ? (
            <LoginComponent />  // Show LoginComponent if showLogin is true
        ) : (
            <div>
                <div className='home'>
                    <div className="container">
                        <div className="home-information">
                            <h2 className="home-title margin-bottom">Qussai Khalil</h2>
                            <h4 className="home-info">Creative Director</h4>
                            <p className="home-desc">
                                I am a professional <span>UX Designer</span> and Front-End Developer creating modern and responsive designs to Web and Mobile. Let us work together. Thank you.
                            </p>
                            <button className="home-btn" onClick={handleLoginButtonClick}>Let's Begin</button>
                        </div>
                    </div>
                </div>
                <img src={myImage} style={{ height: '450px', width: '100%' }} className="img-fluid" alt="Descriptive Alt Text"></img>
            </div>
        )}
    </div>
);
}

export default HomeComponent;
