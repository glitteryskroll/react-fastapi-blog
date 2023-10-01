import psycopg2
from configurations import db_user, db_name, db_host, db_password
from sqlalchemy.orm import sessionmaker, joinedload
from db import User, Comment, engine, db_name, Session, Post, get_db
from sqlalchemy import desc
from .user_repository import get_user_by_email
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


# Функция для получения данных поста по его ID
def get_post(db, post_id: int):
    post = db.query(Post).filter(Post.post_id == post_id).first()
    return post

def add_post(email, post_header, post_text):
    db = next(get_db())
    user_id = get_user_by_email(email).user_id
    new_post = Post(
        user_id=user_id,
        post_header=post_header,
        post_text=post_text
    )
    db.add(new_post)
    db.commit()

# Функция для получения данных постов
def get_posts(offset: int):
    connection = psycopg2.connect(
        host=db_host,
        database=db_name,
        user=db_user,
        password=db_password,
        cursor_factory = psycopg2.extras.RealDictCursor
    )

    cursor = connection.cursor()

    sql_query = f'''SELECT post_id, post_date, post_header, post_text, user_id, first_name, last_name, avatar, email FROM posts NATURAL JOIN users OFFSET {offset} LIMIT 10; '''
    cursor.execute(sql_query)
    posts = cursor.fetchall()

    return posts


# Функция для удаления поста по его ID
def delete_post(db, post_id: int):
    post = db.query(Post).filter(Post.post_id == post_id).first()
    post_comments = db.query(Comment).filter(Comment.post_id == post_id).all()
    if post_comments:
        for comment in post_comments:
            db.delete(comment)
            db.commit()
    if post:
        db.delete(post)
        db.commit()
        return True
    return False

# Функция для редактирования поста по его ID
def edit_post(db, post_id: int, post: object):
    existing_post = db.query(Post).filter(Post.post_id == post_id).first()
    if existing_post:
        existing_post.post_text = post.post_text
        existing_post.post_images_json = post.post_images
        db.commit()
        db.refresh(existing_post)
        return existing_post
    return None