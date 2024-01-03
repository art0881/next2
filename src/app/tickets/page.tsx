import React, { Suspense } from 'react'
import TicketList from './TicketList'
import Loading from '../loading'
import Link from 'next/link'

const Tickets:React.FC = () => {
  return (
    <div style={{width: "85%"}}>
      <h1 className='tx-center'>Посты</h1>
        <TicketList/>
    </div>
  )
}

export default Tickets