"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Loading from '../loading'
import css from "./tickets.module.css";

const TicketList = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const postsPerPage = 3;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetch("http://localhost:4000/tickets")
      .then(res => res.json())
      .then(json => {
        setIsLoading(false);
        const sortedData = json.sort((a, b) => new Date(b.date) - new Date(a.date));
        setData(sortedData.reverse()); // Изменяем порядок записей на обратный
      });
  }, []);
  useEffect(() => {
    const results = data.filter(postData =>
      postData.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
    setCurrentPage(1); // Reset page when search results change
  }, [searchTerm, data]);

  const len = searchResults.length > 0 ? searchResults.length : data.length;
  const totalPages = Math.ceil(len / postsPerPage);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  let currentPosts = searchResults.length > 0 ? searchResults.slice(indexOfFirstPost, indexOfLastPost) : data.slice(indexOfFirstPost, indexOfLastPost);

  // Display new posts first, if no search results and first page
  if (searchResults.length === 0 && currentPage === 1) {
    currentPosts = data.slice(0, postsPerPage);
  }

  function getBlogWordEnding(len) {
    if (len === 1) {
      return "блог";
    } else if (len > 1 && len < 5) {
      return "блога";
    } else {
      return "блогов";
    }
  }

  function getResultWordEnding(count) {
    if (count === 1) {
      return "пост";
    } else if (count > 1 && count < 5) {
      return "поста";
    } else {
      return "постов";
    }
  }

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const [deletedPost, setDeletedPost] = useState(null);

  const deletePost = (id) => {
    if (!id) {
      console.error("ID не указан");
      return;
    }
  
    fetch(`http://localhost:4000/tickets/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          setDeletedPost(id);
          setData(data.filter(post => post.id !== id));
          setDeletedPost(null);
        } else {
          throw new Error('Failed to delete the post');
        }
      })
      .catch((error) => {
        console.error('Error deleting post:', error.message);
      });
  };
  

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : data.length === 0 ? (
        <div className="flex-none">
          <h3>Нет блогов</h3>
          <Link href="tickets/create">
            <button className="button">Создать пост</button>
          </Link>
        </div>
      ) : (
        <>
          <div className={css.post_block}>
            <h3>
              {searchResults.length === 0
                ? "Нет постов"
                : `${len} ${getBlogWordEnding(len)}`}
            </h3>{" "}
          <input
            type="text"
            placeholder="Поиск по заголовку"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
            <h3>
              <Link className={css.color_white} href="tickets/create">
                Создать пост
              </Link>
            </h3>
           
          </div>
          
          {searchResults.length === 0 ? (
            <h3 className="tx-center">Посты не найдены</h3>
          ) : (
            <>
              {currentPosts.map((postData) => (
                <div className="block_info" key={postData.id}>
                  <div className={css.post_title}>
                   <h3>{deletedPost === postData.id ? 'Запись удалена' : postData.title}</h3>
                   {deletedPost !== postData.id && ( <button className="button" onClick={() => deletePost(postData.id)}>Удалить</button>)}
                  </div>
                  {deletedPost !== postData.id && (
                    <>
                      <p>{postData.body.slice(0, 150)}</p>
                      <Link href={`/tickets/${postData.id}`} ><button className={css.button}>Читать дальше</button></Link>
                      
                    </>
                  )}
                </div>
              ))}
              {totalPages > 1 && (
                <div style={{textAlign:"center",margin:"20px 0 10px 0"}}>
                  {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                    (pageNumber) => (
                      <span
                        key={pageNumber}
                        onClick={() => handlePageClick(pageNumber)}
                        style={{
                          cursor: "pointer",
                          margin: "0 2px",
                          backgroundColor: "#d4e0f7",
                          padding:"5px",
                          borderRadius:"5px",
                          fontWeight: pageNumber === currentPage ? "bold" : "normal",
                        }}
                      >
                        {pageNumber}
                      </span>
                    )
                  )}
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default TicketList;

