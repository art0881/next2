import React, { Suspense } from 'react'
import TicketList from './TicketList'
import Loading from '../loading'
import Link from 'next/link'

const Tickets = () => {
  return (
    <div style={{width: "85%"}}><h1 className='tx-center'>Посты</h1>
      <Suspense fallback={<Loading/>}>
        <TicketList/>
        </Suspense>
    </div>
  )
}

export default Tickets