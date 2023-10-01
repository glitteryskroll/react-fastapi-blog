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
    </section>
  );
};

export default BlogsFeed;