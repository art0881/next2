"use client"
import { useState } from 'react'
import { useRouter } from 'next/navigation';
import css from '../tickets.module.css';

export default function CreateForm() {
    const router = useRouter();
    const [title,setTitle] = useState('');
    const [body,setBody] = useState('');
    const[loading, setLoading] = useState(false);

    const Submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const form = {
          title,body
        }
         fetch('http://localhost:4000/tickets',{
            method:"Post",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(form)
        }).then(() => {
          router.push('/tickets');
        })
        
    }
  return (
    <>
    <div className={css.block_create}>
    <form className="tx-center" onSubmit={Submit}>
      <h3>Заголовок</h3>
      <input required type='text' value={title} onChange={(e)=>{setTitle(e.target.value)}} />
      <h3>Текст</h3>
      <input required type='text' value={body} onChange={(e)=>{setBody(e.target.value)}} /><br/><br/>
      <button className='button' disabled={loading}>
        {loading && <span>Загружается...</span>}
        {!loading && <span>Отправить</span>}
        </button>
    </form></div>
    </>
  )
}
