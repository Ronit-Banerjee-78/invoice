import React from 'react'
import Header from '../Components/Header'
import { Outlet } from 'react-router-dom'

const AppLayout = () => {
  return (
    <section className='applayout min-w-screen min-h-screen flex flex-col md:flex-row'>
      <Header className='header min-w-[4.75rem]' />
      <article className="content flex-grow overflow-auto">
        <Outlet />
      </article>
    </section>
  )
}

export default AppLayout
