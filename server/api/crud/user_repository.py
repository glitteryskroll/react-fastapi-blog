import psycopg2
from configurations import db_user, db_name, db_host, db_password
from sqlalchemy.orm import sessionmaker
from db import User, engine, db_name, Session, Post


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

    connection = psycopg2.connect(
        host=db_host,
        database=db_name,
        user=db_user,
        password=db_password, cursor_factory=psycopg2.extras.DictCursor
    )

    user = db.query(User).filter(User.email == email).first()

    return user

def delete_user(email):
    db = next(get_db())
    user = db.query(User).filter(User.email == email).first()
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
    if avatar != False:
        user.avatar = avatar
    db.commit()
    return user
