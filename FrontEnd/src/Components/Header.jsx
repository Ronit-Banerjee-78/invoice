import React, { useContext } from 'react'
import { BiSolidCircleThreeQuarter } from "react-icons/bi";
import { FaMoon } from "react-icons/fa";
import { PiSunFill } from "react-icons/pi";
import { ThemeContext } from '../App';
import User from '../assets/Images/User.jpg'
import { Flex, Spacer } from '@chakra-ui/react';
import { Box } from '@mui/material';

const Header = () => {
    const themeData = useContext(ThemeContext)
    const { theme, toggleTheme } = themeData;

    return (
        <Flex 
        direction={{base : "row" , lg : "column"}} 
        justifyContent="space-between" 
        alignItems="center"
        minH={{base : "2em" , lg: "100vh"}}
        >
            <Box
            minWidth="sm"
            px="2.5em"
            py="1.5em"
              className="logo">
                <BiSolidCircleThreeQuarter
                 size={36} className='rotate-45 text-white' />
            </Box>
            <Flex 
            as="nav" 
            direction={{base: "row" , lg: "column"}}
            mr={{base : "1em" , lg: "0em"}}
            mb={{base : "0em" , lg: "1em"}}
            className="profile">
                {theme === 'light' ? (
                    <button className='m-4' onClick={toggleTheme}>
                        <FaMoon size={20} className='text-gray-200' />
                    </button>
                ) : (
                    <button className='m-4' onClick={toggleTheme}>
                        <PiSunFill size={20} className='text-gray-200' />
                    </button>
                )}
                    <img src={User} className='rounded-full border-2 border-solid border-slate-400 w-12 h-12 object-cover' alt="User" />
            </Flex>
        </Flex>
    )
}

export default Header
