from sqlalchemy import create_engine, Column, Integer, String, ForeignKey, Text, DateTime
from sqlalchemy.orm import sessionmaker, relationship
from sqlalchemy.orm import declarative_base
from sqlalchemy.types import Numeric
from datetime import datetime
from configurations import db_host, db_name, db_user, db_password, admin_last_name,admin_first_name,admin_email,admin_password
from sqlalchemy.orm import Session
from passlib.context import CryptContext
DATABASE_URL = f"postgresql://{db_user}:{db_password}@{db_host}/{db_name}"
engine = create_engine(DATABASE_URL, pool_size=100000000)

Base = declarative_base()

class User(Base):
    __tablename__ = 'users'

    user_id = Column(Integer, primary_key=True)
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    email = Column(String, nullable=False)
    password_hash = Column(String, nullable=False)
    online = Column(DateTime, default=datetime.utcnow)
    avatar = Column(Text)
    level = Column(Integer, default=0)
    ban = Column(Integer, default=0)

    def as_dict(self):
        return {column.name: getattr(self, column.name) for column in self.__table__.columns}


class Post(Base):
    __tablename__ = 'posts'

    post_id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey('users.user_id'), nullable=False)
    post_header = Column(Text, nullable=False)
    post_text = Column(Text, nullable=False)
    post_date = Column(DateTime, default=datetime.utcnow)

class Comment(Base):
    __tablename__ = 'comments'

    comment_id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.user_id'), nullable=False)
    post_id = Column(Integer, ForeignKey('posts.post_id'), nullable=False)
    comment_text = Column(Text, nullable=False)
    comment_date = Column(DateTime, default=datetime.utcnow, nullable=False)

class Like(Base):
    __tablename__ = 'likes'

    like_id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.user_id'), nullable=False)
    post_id = Column(Integer, ForeignKey('posts.post_id'), nullable=False)


Base.metadata.create_all(engine)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


# Создание администратора
password = pwd_context.hash(admin_password)
db = next(get_db())
if not db.query(User).filter(User.email == admin_email).first():
    print('Admin created')
    new_user = User(
        email=admin_email,
        first_name=admin_first_name,
        last_name=admin_last_name,
        password_hash=password,
        level=1
    )
    db.add(new_user)
    db.commit()