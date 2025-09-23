import React, { Suspense } from 'react'
import Header from '../components/Header.jsx'
import { Outlet } from 'react-router-dom'
import Loading from '../Loading.jsx'

const RootLayout = () => {
  return (
    <div>
        <Header/>
        <Suspense fallback={<Loading/>}>
        <Outlet/>
        </Suspense>
    </div>
  )
}

export default RootLayout