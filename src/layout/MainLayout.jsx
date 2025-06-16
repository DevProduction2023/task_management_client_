import Navbar from './Navbar'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { auth } from '../firebase/firebase';
import { onAuthStateChanged } from '../firebase/CheckAuth'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MainLayout() {
  const [isMobile, setIsMobile] = useState(false);
  const [user, setUser] = useState(false)
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) setUser(true)
      else setUser(false)
    })
  }, [user])

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1000); // Adjust the width as needed for your definition of mobile
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);    // Event listener for screen size change
    return () => window.removeEventListener("resize", checkScreenSize);   // Clean up event listener
  }, []);

  return (
    <>
      {isMobile ? (
        <main className="py-8 px-4 lg:px-12">
          <p className="text-lg lg:text-xl">
            This page is designed for desktop users. For the best experience, please access it from a desktop or laptop device.
          </p>
        </main>
      ) :
        <div>
          <Navbar user={user} />
          <Outlet />
          <ToastContainer />
          <Footer />
        </div>
      }
    </>
  )
}

export default MainLayout;
