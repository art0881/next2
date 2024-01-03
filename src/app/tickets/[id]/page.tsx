"use client"
import Link from "next/link";
import { useRouter } from 'next/navigation';
import css from '../tickets.module.css';
import { useEffect, useState } from "react";
import Loading from '../../loading'
import { Ticket, TicketIdProps } from '../../interface/tickets';


const TicketId: React.FC<TicketIdProps>=({ params })=> {
  const router = useRouter();
  const [ticket, setTicket] = useState(null);
  const { id } = params;
  const [isLoading, setIsLoading] = useState(true); 
  useEffect(() => {
    fetch(`http://localhost:4000/tickets/${id}`)
      .then(res => res.json())
      .then(json => {setTicket(json);
        setIsLoading(false);
      });
  }, [id]);

  const deleteTicket = () => {
    fetch(`http://localhost:4000/tickets/${ticket.id}`, { method: 'DELETE' })
  
        router.push('/tickets');
  };
  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
    
      {ticket && (
        <div className={css.block_info}>
          <div className="flex_block_info">
            <h2>{ticket.title}</h2>
            <div>
              <Link href="/tickets">
                <button className="button"> Назад</button>
              </Link>
              <button className="button" onClick={deleteTicket}>Удалить</button>
            </div>
          </div>
          <h4>{ticket.user_email}</h4>
          <p>{ticket.body}</p>
        </div>
      )}
    </>
  );
}
export default TicketId;
