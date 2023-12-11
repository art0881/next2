import Link from "next/link";
import Tickets from "./page";

export async function getTicket(){
    const res = await fetch('http://localhost:4000/tickets');
    return res.json();
}


const TicketList = async () => {
    const data = await getTicket();
  return (
    <div >
    {data.map((data)=>(
       <Link href={`/tickets/${data.id}`}><div className="block_info" key={data.id}>
           <div><h3>{data.title}</h3></div>
           <p>{data.body.slice(0, 150)}</p>
           </div>
           </Link>
    ))} 
   </div>
  )
}

export default TicketList