import React, { useState } from 'react';
import '../styles/css/style.css'; // Ensure the correct path to your CSS file
import Header from '../components/Header';
import { addPost } from '../api/PostApi';
const CreatePost = () => {
    const [postHeader, setPostHeader] = useState()
    const [postText, setPostText] = useState()
    const handleCreatePost = async (e) => {
        e.preventDefault();
        await addPost(postHeader, postText);
        window.location.reload();
  }
  return (
    <div>
      <Header />
      <h1 className="admin-title">Создание поста</h1>
      <section className="create-post-container">
        <form action="" onSubmit={handleCreatePost} className="create-post-form">
          <input onChange={(e)=> setPostHeader(e.target.value)} type="text" placeholder="Заголовок" />
          <textarea onChange={(e)=> setPostText(e.target.value)} cols="30" rows="10" placeholder="Что у вас нового?"></textarea>
          <button type="submit" className="create-post-button">Опубликовать</button>
        </form>
      </section>
    </div>
  );
};

export default CreatePost;