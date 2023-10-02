from fastapi import Depends
from sqlalchemy.orm import Session
from api.crud.user_repository import create_user, get_user_by_email, get_db, get_user_by_id, check_admin
from api.crud.publications_repository import get_posts, get_post, delete_post, edit_post, add_post
from middlewares import token_middleware, token_and_body_middleware

from db import User, Comment, Post, engine, db_name, get_db as get_database
from pydantic import BaseModel
from fastapi import HTTPException, APIRouter
from typing import List

router =  APIRouter()

@router.post("/add-post")
async def create_post(data: dict = Depends(token_and_body_middleware)):
    email = data['token_data']
    post_header = data['body']['post_header']
    post_text = data['body']['post_text']
    add_post(email, post_header, post_text)
    return {"message": "Post added successfully"}


# # Модель для данных поста
class EditPost(BaseModel):
    post_header: str
    post_text: str


# Маршрут для удаления поста
@router.post("/delete/{post_id}")
async def delete_post_route(post_id: int, data: dict = Depends(token_middleware)):
    print(check_admin(data))
    post = get_post(post_id)
    if post is None:
        raise HTTPException(status_code=404, detail="Пост не найден")

    if check_admin(data):
        delete_post(post_id)
        return {"message": "Пост успешно удален"}
    else:
        raise HTTPException(status_code=401, detail="Not admin")


# Маршрут для получения данных поста для редактирования
@router.get("/get-post/{post_id}")
async def get_post_for_edit_route(post_id: int):
    db = next(get_db())
    post = get_post(post_id)
    comments = len(db.query(Comment).filter(Comment.post_id == post_id).all())
    post['comm_count'] = comments
    if post is None:
        raise HTTPException(status_code=404, detail="Пост не найден")

    return post


# Маршрут для редактирования поста
@router.put("/update/{post_id}")
async def edit_post_route(post_id: int, data: dict = Depends(token_and_body_middleware), db: Session = Depends(get_db)):
    post = EditPost.parse_obj(data['body'])
    existing_post = get_post(post_id)
    if existing_post is None:
        raise HTTPException(status_code=404, detail="Пост не найден")

    # Здесь выполните логику редактирования поста в базе данных
    edit_post(post_id, post)

    return {"message": "Пост успешно отредактирован"}


# Маршрут для получения информации о постах
@router.post("/get-posts/{offset}")
async def get_posts_route(offset: int, data: dict = Depends(token_middleware)):
    posts, counter = get_posts(offset)
    for post in posts:
        post_id = post['post_id']
        db = next(get_database())
        comments = db.query(Comment).filter(Comment.post_id == post_id).all()
        for comment in comments:
            user = get_user_by_id(comment.user_id)
            comment.avatar = user['avatar']
            comment.first_name = user['first_name']
            comment.last_name = user['last_name']
        post['comm_count'] = len(comments)
        post['comments'] = comments
    return posts, counter

# Комментарии
# Маршрут для создания комментария
@router.post("/set-comment")
async def create_comment(data: dict = Depends(token_and_body_middleware), db: Session = Depends(get_db)):
    comment_text = data['body']['comment_text']
    user_id = get_user_by_email(data['token_data']).user_id
    post_id = data['body']['post_id']
    new_comment = Comment(
        comment_text=comment_text,
        user_id=user_id,
        post_id=post_id
    )
    db.add(new_comment)
    db.commit()
    db.refresh(new_comment)
    return new_comment


# Маршрут для получения комментариев к определенному посту
@router.post("/load-comments")
async def get_comments_for_post(data: dict = Depends(token_and_body_middleware), db: Session = Depends(get_db)):
    post_id = data['body']['post_id']
    comments = db.query(Comment).filter(Comment.post_id == post_id).all()
    for comment in comments:
        user = get_user_by_id(comment.user_id)
        comment.avatar = user['avatar']
        comment.first_name = user['first_name']
        comment.last_name = user['last_name']
        comment.email = user['email']
    if not comments:
        raise HTTPException(status_code=404, detail="No comments found for this post")
    return comments