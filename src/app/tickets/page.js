import React, { Suspense } from 'react'
import TicketList from './TicketList'
import Loading from '../loading'
import Link from 'next/link'

const Tickets = () => {
  return (
    <div><h1 className='tx-center'>Tickets</h1>
      <Link href='tickets/create'>Создать пост</Link>
      <Suspense fallback={<Loading/>}>
        <TicketList/>
        </Suspense>
    </div>
  )
}

export default Tickets