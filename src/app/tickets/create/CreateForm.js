"use client"
import { useState } from 'react'
import { useRouter } from 'next/navigation';

export default function CreateForm() {
    const router = useRouter();
    const [title,setTitle] = useState('');
    const [body,setBody] = useState('');
    const [after,setAfter] = useState('');
    const[loading, setLoading] = useState(false);

    const Submit = async (e) =>{
        e.preventDefault();
        setLoading(true);
        const form = {
          title,body
        }
        const res = await fetch('http://localhost:4000/tickets',{
            method:"Post",
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
      <button disabled={loading}>
        {loading && <span>Загружается...</span>}
        {!loading && <span>Отправить</span>}
        </button>
    </form>
    </>
  )
}
