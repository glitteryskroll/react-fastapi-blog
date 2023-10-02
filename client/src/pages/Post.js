import React, {useContext, useEffect, useState} from 'react';
import axios from 'axios';
import { Link, useParams, useRouteLoaderData } from 'react-router-dom';
import { getAvatarUrl, profile } from '../api/UserApi';
import {Context} from '../index'
import Header from '../components/Header';
import BlogsFeed from '../components/BlogsFeed';
import Comment from '../components/Comments';
import '../styles/css/style.css'; // Ensure the correct path to your CSS file
import { addComment, fetchPost, loadComments } from '../api/PostApi';
import { formatDate } from '../utils/functions';
import { FEED_ROUTE } from '../utils/consts';
const Post = (props) => {
  const apiUrl = props.apiUrl;
  const {userStore} = useContext(Context);
  const [userData, setUserData] = useState();
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [post, addPost ]  = useState({});
  const avatarUrl = getAvatarUrl(post.email);
  const [commentText, setCommentText] = useState();
  const [comments, setComments] = useState([]);
  const [update, setUpdate] = useState(0);
  const setPost = async () => {
    console.log('start');
    const data = await fetchPost(id);
    addPost(data);
    getComments();
    setLoading(false);
  };
  
  const setComment = async (e) =>{
    e.preventDefault();
    await addComment(commentText, id);
    await getComments();
    setUpdate(update + 1);
  };

  const getComments = async () =>{
    const data = await loadComments(id);
    setComments(data);
  }

  useEffect(() => {
    setPost();
    getComments();
  }, [update]);



  return (
    <div>
        {loading ? 
        <div>Загрузка</div>
        :
        <div>
          <Header>
          </Header>
          <div className="back-btn">
                <Link to="#" onClick={() => window.history.back()}>Назад</Link>
          </div>
          <section className="post-section">
            <div className="post-container">
                <div className="user-info">
                    <div className="user-img">
                        <img src={avatarUrl} alt="" />
                    </div>
                    <div className="user-name">
                        <span>{post.first_name} {post.last_name}</span>
                    </div>
                    <div className="date-message">
                        {formatDate(post.post_date)}
                    </div>
                </div>
                <div className="post-title-container">
                    <h1>{post.post_header}</h1>
                </div>
                <div className="post-content-container">
                    {post.post_text}
                </div>
                <div className="post-comments-info">
                    <img src="/img/comments.svg" alt="" />
                    <span>{post.comm_count}</span>
                </div>
                <div className="post-comments-container">
                    <h1>Комментарии</h1>

                    <form action="" onSubmit={setComment} className="comment-textarea">
                        <textarea onChange={e=> setCommentText(e.target.value)} name="comments" id="" cols="30" rows="10" placeholder="Написать комментарий..." required>{commentText}</textarea>
                        <button className="comment-btn" type="submit">
                            Отправить
                        </button>
                    </form>
                </div>
                <div className='post-comments-all'>
                    {comments ? 
                    <>
                    {comments.map((comm, index)=>(
                        <Comment comment={comm} index={index}></Comment>
                    ))}
                    </>
                    :
                    ''
                    }
                    
                </div>
            </div>
            </section>
        </div>
        }
        
    </div>
  );
};

export default Post;