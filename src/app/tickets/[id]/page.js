
export async function getTicket(id){
    const res = await fetch('http://localhost:4000/tickets/'+ id);
    return res.json();
}


export default async function TicketId({params}) {
  const ticket = await getTicket(params.id);
  return (
    <div className="block_info">
        <h2>{ticket.title}</h2>
        <h4>{ticket.user_email}</h4>
        <p>{ticket.body}</p>
        </div>
  )
}
