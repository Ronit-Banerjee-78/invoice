import React, { useContext } from "react";
import { BiSolidCircleThreeQuarter } from "react-icons/bi";
import { FaMoon } from "react-icons/fa";
import { PiSunFill } from "react-icons/pi";
import { ThemeContext } from "../App";
import User from "../assets/Images/User.jpg";
import { Flex } from "@chakra-ui/react";
import { Box } from "@mui/material";

const Header = () => {
  const themeData = useContext(ThemeContext);
  const { theme, toggleTheme } = themeData;

  return (
    <Flex
      direction={{ base: "row", md: "column" }}
      justify="space-between"
      alignItems="center"
      minH={{ base: "2em", md: "100%" }}
    >
      <Box
        minWidth="sm"
        px="2em"
        py="1.55em"
        className="logo text-center rounded-r-2xl md:rounded-bl-2xl md:rounded-tr-none md:rounded-br-2xl"
      >
        <BiSolidCircleThreeQuarter size={36} className="rotate-45 text-white" />
      </Box>

      <Flex
        as="nav"
        direction={{ base: "row", md: "column" }}
        mr={{ base: "1em", md: "0em" }}
        mb={{ base: "0em", md: "1em" }}
        className="profile"
      >
        {theme === "light" ? (
          <button className="m-4" onClick={toggleTheme}>
            <FaMoon size={20} className="text-gray-200" />
          </button>
        ) : (
          <button className="m-4" onClick={toggleTheme}>
            <PiSunFill size={20} className="text-gray-200" />
          </button>
        )}
        <img
          src={User}
          className="rounded-full border-2 border-solid border-slate-400 w-12 h-12 object-cover"
          alt="User"
        />
      </Flex>
    </Flex>
  );
};

export default Header;
