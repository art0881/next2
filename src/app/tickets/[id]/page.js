"use client"
import { PageNotFoundError } from "next/dist/shared/lib/utils";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import css from '../tickets.module.css';



export default async function TicketId({params}) {
  const router = useRouter();
  async function getTicket(id){
      const res = await fetch('http://localhost:4000/tickets/'+ id, { cache: 'no-store' });
      const data = await res.json();
      return data;
  }
  
   async function Delete(id) {
    const res = await fetch('http://localhost:4000/tickets/'+ id,{
      method:'Delete',
  });
  router.refresh();
            router.push('/tickets');
  }
  const ticket = await getTicket(params.id);
  return (
    <div className={css.block_info}>
       <div className="flex_block_info"><h2>{ticket.title}</h2><div><Link href="/tickets"><button className="button" > Назад</button></Link>
       <button className="button" onClick={()=>Delete(ticket.id)}>Удалить</button></div>
       </div>
        <h4>{ticket.user_email}</h4>
        <p>{ticket.body}</p>
        </div>
  )
}
