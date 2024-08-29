import React, { useContext } from "react";
import Header from "../Components/Header";
import { Outlet } from "react-router-dom";
import { Grid, GridItem } from "@chakra-ui/react";
import { ThemeContext } from "../App";

const AppLayout = () => {
  const themeData = useContext(ThemeContext);
  const { theme, toggleTheme } = themeData;
  return (
    <Grid templateColumns="repeat(12,1fr)">
      <GridItem
        as="aside"
        colSpan={{ base: 12, md: 1 }}
        bg="gray.800"
        minH={{ base: "2em", md: "100vh" }}
        marginBottom={{ base: "1.5em", lg: "0em" }}
      >
        <Header className="header" />
      </GridItem>
      <GridItem
        minH="100vh"
        bg={theme === "light" ? "#F1F6F9" : "#131315"}
        color={theme === "light" ? "black" : "white"}
        colSpan={{ base: 12, md: 11 }}
      >
        <Outlet />
      </GridItem>
    </Grid>
  );
};

export default AppLayout;
