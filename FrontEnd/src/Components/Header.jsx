import React, { useContext } from "react";
import { BiSolidCircleThreeQuarter } from "react-icons/bi";
import { FaMoon } from "react-icons/fa";
import { PiSunFill } from "react-icons/pi";
import { ThemeContext } from "../App";
import { Flex } from "@chakra-ui/react";
import { Box } from "@mui/material";
import { useLogoutUserMutation } from "../Redux/UserApi";
import { useDispatch, useSelector } from "react-redux";
import { IoMdLogOut } from "react-icons/io";
import { logout } from "../Redux/UserSlice";
import { useToast } from "@chakra-ui/react";
import { checkLogoutUser } from "../../Utils.js/AuthUtils";

const Header = () => {
  const themeData = useContext(ThemeContext);
  const { theme, toggleTheme } = themeData;
  const [logoutUser] = useLogoutUserMutation();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const toast = useToast();

  const handleLogout = async () => {
    try {
      // Call the backend to clear the cookie
      const response = await logoutUser().unwrap();
      // Dispatch the logout action to reset Redux state
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
        {isAuthenticated && (
          <button
            onClick={handleLogout}
            className="text-gray-200 tracking-wider border-2 border-solid border-gray-200 rounded-full px-1 py-1 font-semibold"
          >
            <IoMdLogOut size={24} />
          </button>
        )}
      </Flex>
    </Flex>
  );
};

export default Header;
