import React from 'react'
import css from './Header.module.css'
import Link from 'next/link'
import Image from 'next/image'
const Navbar = () => {
  return (
    <header >
      <div className= {css.flexNavbar}> 
        <div>Лого</div>
        <div><Link href='/' >Home</Link>
        <Link href='/tickets'>Tickets</Link>
        </div></div>
    </header>
  )
}

export default Navbar