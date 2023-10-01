import React from 'react';
import { getAvatarUrl } from '../api/UserApi';

const Blog = (props) => {
    const post = props.post;
    const avatarUrl = getAvatarUrl(post.email);

  return (
        <div className="message-feed">
            <div className="item-feed">
                <div className="user-info">
                    <div className="user-name">
                        <div className="user-img">
                            <img src={avatarUrl} alt=""/>
                        </div>
                        <span>{post.first_name} {post.last_name}</span>    
                    </div>
                    <div className="date-message">
                        {post.post_date}
                    </div>
                </div>
                <div className="user-info-adaptive">
                    <div className="user-img">
                        <img src={avatarUrl} alt=""/>
                    </div>
                    <div className="user-name-adaptive">
                        <span>{post.first_name} {post.last_name}</span>
                        <div className="date-message">
                            {post.post_date}
                        </div>
                    </div>
                </div>
                <div className="item-feed-title">
                {post.post_header}
                </div>
                <div className="item-feed-text">
                    {post.post_text.slice(0,200)}
                </div>
                <div className="item-feed-more-btn">
                    Показать ещё
                </div>
                <div className="item-feed-comments-btn" id="open-comment-btn">
                    <span></span>
                    <img src="./img/comments.svg" alt=""/>
                </div>
            </div>
    
            <div className="item-feed-comments" id="comments-container">
                <h3>Комментарии</h3>
    
                <form action="" className="comment-textarea">
                    <textarea name="comments" id="" cols="30" rows="10" placeholder="Написать комментарий..."></textarea>
                    <button className="comment-btn" type="submit">
                        Отправить
                    </button>
                </form>
    
                <div className="comment-container">
                    <div className="comment-item">
                        <div className="user-info-comment">
                            <div className="user-name">
                                <div className="user-img">
                                    <img src="./img/IMG_5718.JPG" alt=""/>
                                </div>
                                <span>Андрей Воронцов</span>    
                            </div>
                            <div className="date-message">
                                28.09.23
                            </div>
                        </div>
                        <div className="user-info-adaptive">
                            <div className="user-img">
                                <img src="./img/IMG_5718.JPG" alt=""/>
                            </div>
                            <div className="user-name-adaptive">
                                <span>Андрей Воронцов</span>
                                <div className="date-message">
                                    28.09.23
                                </div>
                            </div>
                        </div>
                        <div className="comment-message">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Error nam earum molestiae pariatur, eius, iste natus animi dolorem, dicta doloribus ex aut. Corporis, est.
                        </div>
        
                    </div>

                    <div className="comment-item">
                        <div className="user-info-comment">
                            <div className="user-name">
                                <div className="user-img">
                                    <img src="./img/IMG_5718.JPG" alt=""/>
                                </div>
                                <span>Андрей Воронцов</span>    
                            </div>
                            <div className="date-message">
                                28.09.23
                            </div>
                        </div>
                        <div className="user-info-adaptive">
                            <div className="user-img">
                                <img src="./img/IMG_5718.JPG" alt=""/>
                            </div>
                            <div className="user-name-adaptive">
                                <span>Андрей Воронцов</span>
                                <div className="date-message">
                                    28.09.23
                                </div>
                            </div>
                        </div>
                        <div className="comment-message">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Error nam earum molestiae pariatur, eius, iste natus animi dolorem, dicta doloribus ex aut. Corporis, est.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    
  );
};

export default Blog;