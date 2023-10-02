import React, { useEffect, useState } from 'react';
import '../styles/css/style.css'; // Импортируем стили
import { editPost, fetchPost } from '../api/PostApi';
import { Link, useParams } from 'react-router-dom';
import { getAvatarUrl } from '../api/UserApi';
import Header from '../components/Header';
import { formatDate } from '../utils/functions';
import { ADMIN_PANEL } from '../utils/consts';

const EditPost = (props) => {
  const apiUrl = props.apiUrl;
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [post, addPost ]  = useState({});
  const avatarUrl = getAvatarUrl(post.email);
  const [update, setUpdate] = useState(0);
  const setPost = async () => {
    console.log('start');
    const data = await fetchPost(id);
    addPost(data);
    setPostHeader(data.post_header);
    setPostText(data.post_text);
    setLoading(false);
  };

  useEffect(() => {
    setPost();
  }, [update]);
  const [postHeader, setPostHeader] = useState(post.post_header);
  const [postText, setPostText] = useState(post.post_text);

  const changePost = async (e) =>{
    e.preventDefault()
    await editPost(id, postHeader, postText);
    window.location.reload();
  }

  const handleTitleEdit = () => {
      const postTitle = document.getElementById('post-title');
      const editPostTitle = document.getElementById('edit-post-title');
      postTitle.classList.toggle('active');
      editPostTitle.classList.toggle('active');
    };

   const handleContentEdit = () => {
      const postContent = document.getElementById('post-content');
      const postContentEdit = document.getElementById('post-content-edit');
      postContent.classList.toggle('active');
      postContentEdit.classList.toggle('active');
  };
  return (
    <div>
    {loading ? 'wait' :
    <div>
    <Header />
    <div className="back-btn">
        <Link to={ADMIN_PANEL} onClick={() => window.history.back()}>Назад</Link>
    </div>
    <section className="post-section">
      <form action="" onSubmit={changePost} className="post-container">
        <div className="user-info">
          <div className="user-img">
            <img src={avatarUrl} alt="" />
          </div>
          <div className="user-name">
            <span>{post.first_name} {post.last_name}</span>
          </div>
          <div className="date-message">{formatDate(post.post_date)}</div>
        </div>
        <div className="post-title-container">
          <h1 className="post-title active" id="post-title">
            {postHeader}
          </h1>
          <input
            type="text"
            className="edit-post-title"
            id="edit-post-title"
            value={postHeader}
            onChange={e=> setPostHeader(e.target.value)}
          />
          <div
            className="post-edit"
            id="post-title-edit-btn"
            onClick={handleTitleEdit}
          >
            <img src="/img/pencil.svg" alt="" />
          </div>
        </div>
        <div className="post-content-container">
          <span className="post-content active" id="post-content">
            {postText}
          </span>
          <textarea
            className="post-content-edit"
            id="post-content-edit"
            cols="30"
            rows="10"
            onChange={e => setPostText(e.target.value)}
          >
            {postText}
          </textarea>
          <div
            className="post-edit"
            id="edit-post-content-btn"
            onClick={handleContentEdit}
          >
            <img src="/img/pencil.svg" alt="" />
          </div>
        </div>
        <div className="edit-form-btn-container">
          <button className="edit-form-btn">Сохранить изменения</button>
        </div>
      </form>
    </section>
    </div>
    }
  </div>
  );
};

export default EditPost;