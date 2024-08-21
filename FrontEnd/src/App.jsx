import './App.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import AppLayout from './Pages/AppLayout'
import Error from './Pages/Error'
import Invoice from './Pages/Invoice'
import Home from './Pages/Home'
import { createContext, useState } from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import 'dayjs/locale/en-gb';
export const ThemeContext = createContext(null)

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout/>,
    errorElement:<Error/>,
    children: [
      {
        index: true,
        element: <Home/>,
      },
      {
        path: '/:id',
        element: <Invoice/>,
      }
    ]
  }
])


function App() {

  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === 'light' ? 'dark' : 'light'))
  }


  return (
    <ThemeContext.Provider value={{theme, toggleTheme}}>
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='en-gb'>
      <section className='app' id={theme}>
          <RouterProvider router={router} />
      </section>
      </LocalizationProvider>
    </ThemeContext.Provider>
  )
} 

export default App
