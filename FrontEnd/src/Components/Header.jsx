import React, { useContext } from "react";
import { BiSolidCircleThreeQuarter } from "react-icons/bi";
import { MdExitToApp } from "react-icons/md";
import { PiMoonStarsFill } from "react-icons/pi";
import { PiSunFill } from "react-icons/pi";
import { ThemeContext } from "../App";
import { Flex } from "@chakra-ui/react";
import { Box } from "@mui/material";
import { useLogoutUserMutation } from "../Redux/UserApi.js";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@chakra-ui/react";
import { checkLogoutUser } from "../../Utils.js/AuthUtils.js";
import { NavLink } from "react-router-dom";
import { LuUserSquare } from "react-icons/lu";

const Header = () => {
  const themeData = useContext(ThemeContext);
  const { theme, toggleTheme } = themeData;
  const [logoutUser] = useLogoutUserMutation();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const toast = useToast();
  const { _id } = user || {};

  const handleLogout = async () => {
    try {
      // Call the backend to clear the cookie
      await logoutUser().unwrap();
      // Call LogoutUser Utils Function
      checkLogoutUser(dispatch);
      toast({
        title: "Log out Successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    } catch (error) {
      toast({
        title: error?.data?.message,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  };

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
        align="center"
        // border="2px"
        // borderColor="white"
        // borderStyle="solid"
        // // backgroundColor="#775df7"
      >
        {theme === "light" ? (
          <button className="m-2" onClick={toggleTheme}>
            <PiMoonStarsFill
              size={24}
              className="text-gray-200 hover:text-[#775df7]"
            />
          </button>
        ) : (
          <button className="m-2" onClick={toggleTheme}>
            <PiSunFill
              size={24}
              className="text-gray-200 hover:text-[#775df7]"
            />
          </button>
        )}
        {isAuthenticated && (
          <>
            <NavLink
              className="tracking-wider m-2 text-gray-200 hover:text-[#775df7] font-semibold"
              to={`profile/${_id}`}
            >
              <LuUserSquare size={26} />
            </NavLink>
            <button
              onClick={handleLogout}
              className="m-2 text-gray-200 hover:text-[#775df7]"
            >
              <MdExitToApp size={28} />
            </button>
          </>
        )}
      </Flex>
    </Flex>
  );
};

export default Header;
