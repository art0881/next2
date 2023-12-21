"use client";
import Tickets from "./page";
import Link from "next/link";
import Loading from '../loading'
import css from "./tickets.module.css";
import { useEffect, useState } from "react";

const TicketList = () => {
  // вытаскиваем посты запросом get
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 

    useEffect(() => {
        fetch("http://localhost:4000/tickets")
        .then(res => res.json())
        .then(json => {;
        setIsLoading(false);
        const sortedData = json.sort((a) => new Date(a.date));
        setData(sortedData.reverse());
      });
    }, []);


  //  создаем количество постов
  const len = data.length;
  function getBlogWordEnding(len) {
    if (len === 1) {
      return "блог";
    } else if (len > 1 && len < 5) {
      return "блога";
    } else {
      return "блогов";
    }
  }
  
  return (
    <div>
      
      {isLoading ? ( // Проверяем состояние загрузки для отображения нужного контента
      <Loading/>
      ) : data.length === 0 ? (
        <>
          <div className="flex-none">
            <h3>Нет блогов</h3>
            <Link href="tickets/create">
              <button className="button">Создать пост</button>
            </Link>
          </div>
        </>
      ) : (
        <>
          <div className={css.post_block}>
            <h3>
              {len} {getBlogWordEnding(len)}
            </h3>{" "}
            <h3>
              <Link className={css.color_white} href="tickets/create">
                Создать пост
              </Link>
            </h3>
          </div>
          {data?.map((data) => (
            <Link key={data.id.toString()} href={`/tickets/${data.id}`}>
              <div className="block_info">
                <div>
                  <h3>{data.title}</h3>
                </div>
                <p>{data.body.slice(0, 150)}</p>
                <button className={css.button}>Читать дальше</button>
              </div>
            </Link>
          ))}
        </>
      )}
    </div>
  );
};

export default TicketList;
