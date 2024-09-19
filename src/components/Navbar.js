import React from 'react'
import { FaSearch } from "react-icons/fa";
import loveImage from '../assets/love.png'
import shoppingBag from '../assets/shopping-bag.png'
import userIcon from '../assets/user.png'
import carretDown from '../assets/carret-down.png'
import { useNavigate } from 'react-router-dom';

export default function Navbar({ keyword, setKeyword, actionSearch }) {
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        actionSearch();
    }
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };
    return (
        <div className='custom-navbar'>
            <form onSubmit={handleSubmit}>
                <div className="search-container">
                    <input
                        type="text"
                        id="cariproduk"
                        name="cariproduk"
                        placeholder="Cari Produk"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                    />
                    <button type='submit' className='searchicon' >
                        <FaSearch style={{ color: 'white' }} />
                    </button>
                </div>
            </form>
            <div className='navbar-icon'>
                <a href="#" style={{ marginRight: '25px' }}>
                    <img src={loveImage} width={25} height={25} alt="" />
                </a>
                <a href="#" style={{ marginRight: '25px' }}>
                    <img src={shoppingBag} width={25} height={25} alt="" />
                </a>
                <a href="#" style={{ marginRight: '25px' }} onClick={handleLogout}>
                    <img src={userIcon} width={25} height={25} alt="" />
                    <img src={carretDown} width={25} height={25} alt="" />
                </a>
            </div>
        </div>
    )
}
