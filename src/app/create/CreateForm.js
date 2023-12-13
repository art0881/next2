"use client"
import { useState } from 'react'
import { useRouter } from 'next/navigation';
import TicketId from '../tickets/[id]/page';
export default function CreateForm() {
    const router = useRouter();
    const [title,setTitle] = useState('');
    const [body,setBody] = useState('');
    const [after,setAfter] = useState('');
    const[loading, setLoading] = useState(false);

    const Submit = async () =>{
        e.preventDefault();
        setLoading(true);
        const form = {
         title,body,after, user_email:'ewreg@mail.ru'
        }
        const res = ('http://localhost:4000/tickets',{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(form)
        })

        if(res.status === 201){
            router.refresh();
            router.push('/tickets');
        }
    }
  return (
    <>
    <form onSubmit={Submit}>
      <h3>Напиши заголовок</h3>
      <input required type='text' value={title} onChange={(e)=>{setTitle(e.target.value)}} />
      <h3>Напиши Текс</h3>
      <input required type='text' value={body} onChange={(e)=>{setBody(e.target.value)}} />
      <h3>Автор</h3>
      <input required type='text' value={after} onChange={(e)=>{setAfter(e.target.value)}} />
      <button disabled={loading}>
        {loading && <span>Загружается...</span>}
        {!loading && <span>Отправить</span>}
        </button>
    </form>
    </>
  )
}
