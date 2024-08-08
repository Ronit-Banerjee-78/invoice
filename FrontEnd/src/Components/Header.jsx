import React, { useContext } from 'react'
import { BiSolidCircleThreeQuarter } from "react-icons/bi";
import { FaMoon } from "react-icons/fa";
import { PiSunFill } from "react-icons/pi";
import { ThemeContext } from '../App';
import User from '../assets/Images/User.jpg'

const Header = () => {
    const themeData = useContext(ThemeContext)
    const { theme, toggleTheme } = themeData;

    return (
        <section className='header bg-[#393E46] w-full md:w-auto h-full md:min-h-screen flex justify-between items-center md:flex-col md:justify-between md:items-start md:rounded-tr-xl md:rounded-br-xl'>
            <div className="logo w-fit p-5 rounded-tr-xl rounded-br-xl">
                <BiSolidCircleThreeQuarter size={36} className='rotate-45 text-white' />
            </div>
            <nav className="profile flex items-center h-full md:w-full md:flex-col">
                {theme === 'light' ? (
                    <button className='m-4' onClick={toggleTheme}>
                        <FaMoon size={20} className='text-gray-200' />
                    </button>
                ) : (
                    <button className='m-4' onClick={toggleTheme}>
                        <PiSunFill size={20} className='text-gray-200' />
                    </button>
                )}
                <div className="user px-4 border-l-2 md:border-l-0 md:border-t-2 md:py-4 md:px-0 border-solid border-gray-500">
                    <img src={User} className='rounded-full border-2 border-solid border-slate-400 w-12 h-12 object-cover' alt="User" />
                </div>
            </nav>
        </section>
    )
}

export default Header
