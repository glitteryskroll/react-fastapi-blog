import React, { useContext, useEffect, useState } from 'react';
import Blog from './Blog'
import { Context } from '..';
import { fetchPosts } from '../api/PostApi';

const BlogsFeed = () => {
  const {postStore} = useContext(Context);
  const [loading, setLoading] = useState(false)
  const [posts, addPosts] = useState([])
  async function setPosts() {
    const data = await fetchPosts();
    postStore.setPosts(data);
    addPosts(data);
    console.log(postStore.posts);
    setLoading(true);
  }
  useEffect(() => {
    setPosts();
  }, []);

  useEffect(()=>{
    console.log(posts)
  }, [posts])

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
        <Blog post={post} key={index} />
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