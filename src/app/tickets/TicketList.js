'use client'
import Tickets from "./page";
import Link from "next/link";
import css from './tickets.module.css';

const TicketList = async (id) => {
  // вытаскиваем посты запросом get
  async function getTicket(){
      const res = await fetch('http://localhost:4000/tickets');
      const data = await res.json();
      
      return data;
  }
    const data = await getTicket();
    //  создаем количество постов 
    const len = data.length;
    function getBlogWordEnding(len) {
      if (len === 1) {
        return 'блог';
      } else if (len > 1 && len < 5) {
        return 'блога';
      } else {
        return 'блогов';
      }
    }
    // с
  return (
    <div >
   {data.length === 0 ? (
    <>
    <div className="flex-none">
    <h3>Нет блогов</h3>
    <Link href='tickets/create'><button className="button">Создать пост</button></Link>
    </div>
    </>
          
        ) : ( <>
        <div className={css.post_block}><h3>{len} {getBlogWordEnding(len)}</h3>  <h3><Link  className={css.color_white} href='tickets/create'>Создать пост</Link></h3></div>
        {data.map((data)=>(
       <Link key={data.id.toString()} href={`/tickets/${data.id}`}><div className="block_info" >
           <div><h3>{data.title}</h3></div>
           <p>{data.body.slice(0, 150)}</p>
           <button className={css.button}>Читать дальше</button>
           </div>
           </Link>
    ))}</> )}
   </div>
  )
}

export default TicketList