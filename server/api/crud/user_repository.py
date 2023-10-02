import psycopg2
from configurations import db_user, db_name, db_host, db_password
from sqlalchemy.orm import sessionmaker
from db import User, Comment, engine, db_name, Session, Post


SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def create_user(email:str, first_name: str, last_name: str, password_hash: str):
    db = next(get_db())
    new_user = User(
        email=email,
        first_name=first_name,
        last_name=last_name,
        password_hash=password_hash
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return 0

def get_user_by_id(user_id):
    connection = psycopg2.connect(
        host=db_host,
        database=db_name,
        user=db_user,
        password=db_password, cursor_factory=psycopg2.extras.RealDictCursor
    )

    cursor = connection.cursor()

    sql_query = f''' SELECT * FROM public.users where user_id = '{user_id}' '''

    cursor.execute(sql_query)
    user = dict(cursor.fetchone())

    return user

def get_user_by_email(email):
    db = next(get_db())

    user = db.query(User).filter(User.email == email).first()

    return user

def delete_user(email):
    db = next(get_db())
    user = db.query(User).filter(User.email == email).first()
    posts = db.query(Post).filter(Post.user_id == user.user_id).all()
    post_comments = db.query(Comment).filter(Comment.user_id == user.user_id).all()

    if post_comments:
        for comment in post_comments:
            db.delete(comment)
            db.commit()

    if posts:
        for post in posts:
            db.delete(post)
            db.commit()

    db.delete(user)
    db.commit()
    return True

def get_user_by_post(post_id):
    db = next(get_db())
    post = db.query(Post).filter(Post.post_id == post_id).first()
    user = post.user_id
    return user

def edit_user(emailA, emailB, first_name, last_name, password, avatar):
    db = next(get_db())
    user = db.query(User).filter(User.email == emailA).first()
    if not user:
        return None

    user.first_name = first_name
    user.last_name = last_name
    user.password = password
    user.email = emailB
    if avatar != '':
        user.avatar = avatar
    db.commit()
    return user

def get_user_posts(user_data):
    db = next(get_db())
    user_posts = db.query(Post).filter(Post.user_id == user_data['user_id']).all()
    for post in user_posts:
        post_id = post.post_id
        comments = db.query(Comment).filter(Comment.post_id == post_id).all()
        for comment in comments:
            user = get_user_by_id(comment.user_id)
            comment.avatar = user['avatar']
            comment.first_name = user['first_name']
            comment.last_name = user['last_name']
        post.comments = comments
    return user_posts


def check_admin(email):
    user = get_user_by_email(email)
    if user.level != 1:
        return False
    else:
        return True