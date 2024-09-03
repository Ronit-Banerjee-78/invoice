import React from "react";
import Header from "../Components/Header";
import { Outlet } from "react-router-dom";
import { Grid, GridItem } from "@chakra-ui/react";

const AppLayout = () => {
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
      <GridItem minH="100vh" colSpan={{ base: 12, md: 11 }}>
        <Outlet />
      </GridItem>
    </Grid>
  );
};

export default AppLayout;
