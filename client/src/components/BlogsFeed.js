import React, { useContext, useEffect, useState } from 'react';
import Blog from './Blog'
import { Context } from '..';
import { fetchPosts } from '../api/PostApi';

const BlogsFeed = (props) => {
  const {postStore} = useContext(Context);
  const [loading, setLoading] = useState(false)
  const [posts, addPosts] = useState([])
  const admin = props.admin;
  async function setPosts() {
    const data = await fetchPosts();
    postStore.setPosts(data);
    addPosts(data);
    setLoading(true);
  }
  useEffect(() => {
    setPosts();
  }, []);

  return (
    <section className="feed-container">
      <ul class="pagination-container">
                <a href="">1</a>
                <a href="">2</a>
                <a href="">3</a>
                <a href="">...</a>
                <a href="">1000</a>

      </ul>
      <div className="feed-item-list">
      {loading ? 
      <>
      {posts.map((post, index) =>(
        <Blog admin={admin} post={post} key={index} />
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