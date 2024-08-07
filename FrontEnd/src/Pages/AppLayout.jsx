import React from 'react'
import Header from '../Components/Header'
import { Outlet } from 'react-router-dom'

const AppLayout = () => {
  return (
    <section className='applayout flex flex-col min-w-screen md:flex-row'>
      <Header className='header flex-shrink-0' />
      <article className="content flex-grow">
        <Outlet/>
      </article>
    </section>
  )
}

export default AppLayout
