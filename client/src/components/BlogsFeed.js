import React, { useContext, useEffect, useState } from 'react';
import Blog from './Blog'
import { Context } from '..';
import { fetchPosts } from '../api/PostApi';
import Pagination from './Pagination';
import { observable } from 'mobx';

const deleted = observable({
    count: 0
})

const BlogsFeed = (props) => {
  const [loading, setLoading] = useState(false)
  const [posts, addPosts] = useState([])
  const admin = props.admin;
  const {postStore} = useContext(Context)
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [update, setUpdate] = useState(0)
  const handlePageChange = pageNumber => {
    setCurrentPage(pageNumber);
    // Здесь можно обновить данные, например, загрузить новую порцию данных для выбранной страницы
  };

  async function setPosts() {
    const data = await fetchPosts(currentPage);
    postStore.setPosts(data[0]);
    setTotalPages(Math.ceil(data[1].count / 10));
    addPosts(data[0]);
    setLoading(true);
  }

  const handleNotifyParent = (number) => {
      setUpdate(update + number)
  };

  useEffect(() => {
    setPosts(currentPage);
  }, [currentPage, update]);

  return (
    <section className="feed-container">
      
      
      <ul className="pagination-container">
        <div>
          Страница {currentPage}
        </div>
        <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      </ul>
      <div className="feed-item-list">
      {loading ? 
      <>
      {posts.map((post, index) =>(
        <Blog update={handleNotifyParent} deleted={deleted} admin={admin} post={post} key={index} />
      )
      )}
      </>
      :
      <div></div>
      }
      </div>      
    </section>
  );
};

export default BlogsFeed;