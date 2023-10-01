import React from 'react';
import { getAvatarUrl } from '../api/UserApi';

const Blog = (props) => {
    const post = props.post;
    const avatarUrl = getAvatarUrl(post.email);
    const formatDate = (post_date) =>{
        const date = new Date(post_date);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');

        const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        return formattedDate
    }
    const openSettings = async () =>{
        document.getElementById('settings-post-container-' + post.post_id).classList.toggle("active")
    }
  return (
    <div className="feed-item-container">
        <div className="feed-item" href="./post-page.html">
            <div className="feed-item-info">
                <div className="feed-item-content">
                    <h1>{post.post_header}</h1>
                    <span>{post.post_text}</span>
                </div>
                <div className="feed-item-user-info">
                    <div className="user-img">
                        {!avatarUrl ? 
                            <img src={avatarUrl} alt="" />
                                    :
                            <img src="./img/nophoto.png"/>
                        }
                    </div>
                    <div className="user-info">
                        <div className="settings-post-btn" id={'open-settings-post-btn-' + post.post_id} onClick={openSettings}><img src="./img/settings-feed.svg" alt="settings" /></div>

                        <span>{post.first_name} {post.last_name}</span>
                        <span className="date-message">{formatDate(post.post_date)}</span>
                    </div>
                </div>
            </div>
            <div className="feed-item-comments">
                <img src="./img/comments.svg" alt="" />
                <span>54</span>
            </div>
        </div>
        <div className="settings-post" id={'settings-post-container-' + post.post_id}>
            <span className='edit'>Редактировать</span>
            <span className="delete">Удалить</span>
        </div>
    </div>
    
  );
};

export default Blog;