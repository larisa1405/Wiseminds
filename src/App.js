import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { NavbarProvider } from './Components/Context/NavbarContext';
import Main from './Components/Main/Main';
import Contact from './Components/Contact/Contact';
import Navbar from './Components/Navbar/Navbar';
import AboutUs from './Components/AboutUs/AboutUs';
import Book from './Components/Book/Book';
import Footer from './Components/Footer/Footer';
import BookInfo from './Components/BookInfo/BookInfo';
import Order from './Components/Order/Order';
import Thankyou from './Components/Thankyou/Thankyou';
import LogIn from './Components/LogIn/LogIn';
import Admin from './Components/Admin/Admin';
import * as LR from "@uploadcare/blocks";
import RegisterForm from './Components/RegisterForm/RegisterForm';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: (
        <div>
            <Navbar />
            <Main />
            <Footer />
        </div>
      )
    },
    {
      path: '/contact',
      element:  (
        <div className='static-page'>
            <Navbar />
            <Contact />
            <Footer />
        </div>
      )
    },
    {
      path: '/aboutus',
      element: (
        <div className='static-page'>
            <Navbar />
            <AboutUs />
            <Footer />
        </div>
      )
    },
    {
      path: '/sales',
      element: (
        <div>
          <Navbar />
          <h1 className='h1-sales'>CHECK OUT OUR BEST SALES!</h1>
          <Book />
          <Footer />
        </div>
      )
    },
    {
      path: '/bookinfo/:id',
      element: (
        <div className='static-page'>
          <Navbar />
          <BookInfo />
          <Footer />
        </div>
      )
    },
    {
      path: '/search/:search',
      element: (
        <div className='static-page'>
          <Navbar />
          <Book />
          <Footer />
        </div>
      )
    },
    {path: '/genre/:genre',
    element: (
      <div className='static-page'>
          <Navbar />
          <Book />
          <Footer />
      </div>
    )
    },
    {path: '/allbooks',
    element: (
      <div className='static-page'>
          <Navbar />
          <Book />
          <Footer />
      </div>
    )
    },
  {
    path: '/order',
    element: (
      <div className='static-page'>
          <Navbar />
          <Order />
          <Footer />
      </div>
    )
  },
  {
    path: '/thankyou',
    element: (
      <div className='static-page'>
          <Navbar />
          <Thankyou />
          <Footer />
      </div>
    )
  },
  {
    path: '/login',
    element: (
      <div className='static-page'>
          <Navbar />
          <LogIn />
          <Footer />
      </div>
    )
  },
  {
    path: '/admin',
    element: (
      <div className='static-page'>
          <Navbar />
          <Admin />
          <Footer />
      </div>
    )
  },
  {
    path: '/admin/:id',
    element: (
      <div className='static-page'>
          <Navbar />
          <Admin />
          <Footer />
      </div>
    )
  },
  {
    path: '/register',
    element: (
      <div className='static-page'>
          <Navbar />
          <RegisterForm />
          <Footer />
      </div>
    )
  }

  ])

function App() {
  LR.registerBlocks(LR);
  return (
    <>
    <NavbarProvider>
      <div className="App">
          <RouterProvider router={router} />
      </div>
    </NavbarProvider>
    </>
  );
}

export default App;
