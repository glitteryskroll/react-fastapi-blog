import React from 'react';
import { getAvatarUrl } from '../api/UserApi';
import { formatDate } from '../utils/functions';

const Comment = (props) => {
    const comment = props.comment;
    const avatarUrl = getAvatarUrl(comment.email);
    return (
        <div className="comment-item">
            <div className="user-info-comment">
                <div className="user-name">
                    <div className="user-img">
                        <img src={avatarUrl} alt="" />
                    </div>
                    <span>{comment.first_name} {comment.last_name}</span>    
                </div>
                <div className="date-message">
                    {formatDate(comment.comment_date)}
                </div>
            </div>
            <div className="user-info-adaptive">
                <div className="user-img">
                    <img src={avatarUrl} alt="" />
                </div>
                <div className="user-name-adaptive">
                    <span>{comment.first_name} {comment.last_name}</span>
                    <div className="date-message">
                    {formatDate(comment.comment_date)}
                    </div>
                </div>
            </div>
            <div className="comment-message">
                {comment.comment_text}
            </div>
        </div>
    );
};

export default Comment;