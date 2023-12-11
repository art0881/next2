import { Rubik } from 'next/font/google'
import './globals.css'
import Navbar from "./comps/Navbar"
import Footer from "./comps/Footer"

const rubik = Rubik({ subsets: ['latin'] })

export const metadata = {
  title: 'Home',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
      <link rel="icon" href='/red_logo.png' />
      </head>
      <body className={rubik.className}>
        <div className='main'>
        <Navbar/>
        <div className='flex-center block' >{children}</div>
        <Footer/>
        </div>
        </body>
    </html>
  )
}
