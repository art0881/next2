import { PageNotFoundError } from "next/dist/shared/lib/utils";
import Link from "next/link";



export async function getTicket(id){
    const res = await fetch('http://localhost:4000/tickets/'+ id,{
        next:{
            revalidate:0
        }
    });
  
    return res.json();
}


export default async function TicketId({params}) {
  const ticket = await getTicket(params.id);
  return (
    <div className="block_info">
       <div className="flex"><h2>{ticket.title}</h2><Link href="/tickets"><button> Назад</button></Link></div>
        <h4>{ticket.user_email}</h4>
        <p>{ticket.body}</p>
        </div>
  )
}
