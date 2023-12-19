'use client'
import React from 'react'
import css from './Header.module.css'
import Link from 'next/link'
import '../globals.css'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
const Navbar = () => {
   const pathname = usePathname()
  return (
    <header >
      <div className= {css.flexNavbar}> 
        <div>Лого</div>
        <div><Link className={`${pathname === '/' ? 'active' : ''}`} href='/' >Главная</Link>
        <Link className={` ${pathname === '/tickets' ? 'active' : ''}`} href='/tickets'>Посты</Link>
        </div></div>
    </header>
  )
}

export default Navbar