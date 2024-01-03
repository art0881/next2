'use client'
import React,{FC} from 'react'
import css from './Header.module.css'
import Link from 'next/link'
import '../globals.css'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

const Navbar:FC = () => {
   const pathname = usePathname()
  return (
    <header className='header'>
      <div className= {css.flexNavbar}> 
        <div><Image alt='логотип' width={50} height={50} src='/logo.png'></Image></div>
        <div><Link className={`${pathname === '/' ? 'active' : ''}`} href='/' >Главная</Link>
        <Link className={` ${pathname === '/tickets' ? 'active' : ''}`} href='/tickets'>Посты</Link>
        </div></div>
    </header>
  )
}

export default Navbar