import Link from "next/link";
import Tickets from "./page";
import {cache} from 'react';
export async function getTicket(){
    const res = await fetch('http://localhost:4000/tickets', { cache: 'no-store' });
    const data = await res.json();
    
    return data;
}


const TicketList = async (id) => {
    const data = await getTicket();
    
  return (
    <div >
    {data.map((data)=>(
       <Link key={data.id.toString()} href={`/tickets/${data.id}`}><div className="block_info" >
           <div><h3>{data.title}</h3></div>
           <p>{data.body.slice(0, 150)}</p>
           </div>
           </Link>
    ))} 
   </div>
  )
}

export default TicketList