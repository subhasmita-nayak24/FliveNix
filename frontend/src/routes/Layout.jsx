import React from 'react'
import {HelmetProvider} from 'react-helmet-async'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import { ToastContainer } from 'react-toastify'

function Layout() {
  return (
    <HelmetProvider>
      <ToastContainer/>
      <main className='min-h-screen '>
       <Outlet/>
       </main>
      <Footer/>
    </HelmetProvider>
  )
}

export default Layout