import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { store } from "./Redux/store.js";
import { Provider } from "react-redux";
import { ChakraProvider } from "@chakra-ui/react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
    // other typography settings
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <ChakraProvider>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  </ChakraProvider>
);
