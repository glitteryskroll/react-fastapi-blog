import React, { useContext, useState } from 'react';
import { getAvatarUrl } from '../api/UserApi';
import { formatDate } from '../utils/functions';
import { Link } from 'react-router-dom';
import { AUTH_ROUTE, EDIT_POST } from '../utils/consts';
import { deletePost } from '../api/PostApi';
import { Context } from '../index';



const Blog = (props) => {
    const post = props.post;
    const admin = props.admin;
    const update = props.update;
    const avatarUrl = getAvatarUrl(post.email);
    const linkToPost = '/post/' + post.post_id
    const editPost = '/editpost/' + post.post_id
    
    const removePost = async (event) =>{
        event.preventDefault();
        await openSettings(event);
        await deletePost(post.post_id);
        
        update(1);
    }

    const openSettings = async (event) =>{
        event.preventDefault();
        document.getElementById('settings-post-container-' + post.post_id).classList.toggle("active")
    }
  return (
    <Link to={linkToPost}>
    <div className="feed-item-container">
        <div className="feed-item" >
            <div className="feed-item-info">
                <div className="feed-item-content">
                    <h1>{post.post_header}</h1>
                    <span>{post.post_text}</span>
                </div>
                <div className="feed-item-user-info">
                    <div className="user-img">
                        {avatarUrl ? 
                            <img src={avatarUrl} alt="" />
                                    :
                            <img src="./img/nophoto.png"/>
                        }
                    </div>
                    <div className="user-info">
                        {admin ? 
                            <div className="settings-post-btn" id={'open-settings-post-btn-' + post.post_id} onClick={openSettings}><img src="./img/settings-feed.svg" alt="settings" /></div>
                            :
                            <></>
                        }   
                        <span>{post.first_name} {post.last_name}</span>
                        <span className="date-message">{formatDate(post.post_date)}</span>
                    </div>
                </div>
            </div>
            <div className="feed-item-comments">
                <img src="./img/comments.svg" alt="" />
                <span>{post.comm_count}</span>
            </div>
        </div>
        {admin ?
            <div className="settings-post" id={'settings-post-container-' + post.post_id}>
                <Link to={editPost}className='edit'><span >Редактировать</span></Link>
                <button className="delete" onClick={removePost}>Удалить</button>
            </div>
            :
            ''
        }
        
    </div>
    </Link>
  );
};

export default Blog;