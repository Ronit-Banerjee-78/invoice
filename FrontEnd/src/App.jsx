import "./App.css";
import { useEffect } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AppLayout from "./Pages/AppLayout";
import Error from "./Pages/Error";
import Invoice from "./Pages/Invoice";
import Home from "./Pages/Home";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Profile from "./Pages/Profile";
import ProtectedRoute from "./Pages/ProtectedRoutes";
import { createContext, useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/en-gb";
export const ThemeContext = createContext(null);

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,

        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/profile/:id",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: "/:id",
        element: (
          <ProtectedRoute>
            <Invoice />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

function App() {
  const [theme, setTheme] = useState("light");

  // Load the theme from localStorage when the component mounts
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  // Update localStorage whenever the theme changes
  const toggleTheme = () => {
    setTheme((currentTheme) => {
      const newTheme = currentTheme === "light" ? "dark" : "light";
      localStorage.setItem("theme", newTheme);
      return newTheme;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
        <section
          className={`app ${
            theme === "light"
              ? "bg-[#F1F6F9] text-black "
              : "bg-[#131315] text-white"
          } `}
        >
          <RouterProvider router={router} />
        </section>
      </LocalizationProvider>
    </ThemeContext.Provider>
  );
}

export default App;
