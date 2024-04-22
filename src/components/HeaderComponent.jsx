import React from 'react'
import { NavLink } from 'react-router-dom'
import { isUserLoggedIn, logout, getLoggedInUser } from '../services/AuthService'
import { useNavigate } from 'react-router-dom'

import './style.css'
import { faBold } from '@fortawesome/free-solid-svg-icons'



const HeaderComponent = () => {

    const isAuth = isUserLoggedIn();
    const userName = getLoggedInUser();

    const navigator = useNavigate();

    function handleLogout() {
        logout();
        navigator('/home')
    }

    return (
        <div>
            <header>
                <nav className='navbar navbar-expand-md ' style={{ height: '70px', background: '#9fcabd', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    {/* Left-aligned items */}
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <a href='http://localhost:3000/home' className='navbar-brand' style={{ color: '#40666b', marginLeft:'20px' }}>
                            Expense Tracker Application
                        </a>
                        {isAuth && (
                            <NavLink to="/invoices" className="nav-link" style={{ color: '#40666b', marginLeft: '20px' }}>Invoices</NavLink>
                        )}
                    </div>

                    
                    {isAuth && (
                        <div style={{
                            flex: 1,
                            textAlign: 'center',
                            fontFamily: 'Marker Felt, fantasy',
                            fontSize: '24px',
                            fontWeight: 'bold',
                            color: '#40666b',
                            marginRight: '250px'
                        }}>
                            Welcome {userName}
                        </div>
                    )}

                    
                    <ul className='navbar-nav'>
                        {!isAuth && (
                            <>
                                <li className='nav-item'>
                                    <NavLink to="/register" className="nav-link" style={{ color: '#40666b' }}>Register</NavLink>
                                </li>
                                <li className='nav-item'>
                                    <NavLink to="/login" className="nav-link" style={{ color: '#40666b' }}>Login</NavLink>
                                </li>
                            </>
                        )}
                        {isAuth && (
                            <li className='nav-item'>
                                <NavLink to="/home" className="nav-link" style={{ color: '#40666b', marginRight:'20px' }} onClick={handleLogout}>Logout</NavLink>
                            </li>
                        )}
                    </ul>
                </nav>
            </header>
        </div>
    );
}

export default HeaderComponent