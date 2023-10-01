from fastapi.responses import HTMLResponse, RedirectResponse, JSONResponse, FileResponse, Response
from fastapi.templating import Jinja2Templates
from configurations import SECRET_KEY, ALGORITHM, ACCESS_TOKEN_EXPIRE_MINUTES
from fastapi import Depends, HTTPException, status, Request
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from sqlalchemy.orm import sessionmaker
from passlib.context import CryptContext
from datetime import timedelta, datetime
from middlewares import token_middleware, token_and_body_middleware
from api.crud.user_repository import create_user, get_user_by_email, get_db, get_user_by_id, delete_user, edit_user

import base64
import jwt
from jwt.exceptions import DecodeError as JWTError

from db import User, Post, Comment, engine, db_name, get_db as get_database
from pydantic import BaseModel
from fastapi import APIRouter

router = APIRouter()
auth_router = APIRouter()

templates = Jinja2Templates(directory="templates")
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

class UserData(BaseModel):
    username: str

class Token(BaseModel):
    access_token: str
    token_type: str

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_user(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()

def create_access_token(data: dict, expires_delta: timedelta):
    to_encode = data.copy()
    expire = datetime.utcnow() + expires_delta
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_200_OK,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_data = UserData(username=username)
    except JWTError:
        raise credentials_exception
    return token_data



def get_current_active_user(current_user: UserData = Depends(get_current_user)):
    user = get_user(db_name, current_user.email)
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user


class UserCreate(BaseModel):
    email: str
    password: str
    name: str
    family: str

class UserAuth(BaseModel):
    email: str
    password: str

class UserLogin(BaseModel):
    email: str
    password: str

@router.post("/registration")
async def user_registration(user: UserCreate):
    password_hash = pwd_context.hash(user.password)
    create_user(user.email, user.name, user.family, password_hash)
    return 0


@router.post("/login")
async def login_for_access_token(form_data: UserAuth):
    user = get_user_by_email(form_data.email).as_dict()
    print(user)
    if user['ban'] == 1 or not user or not verify_password(form_data.password, user['password_hash']):
        return HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user['email']}, expires_delta=access_token_expires

    )
    response = JSONResponse(content={"access_token": access_token, "token_type": "bearer"})
    response.set_cookie(key="access_token", value=access_token)

    return response

@router.post("/info", response_class=HTMLResponse)
async def read_root(token_data: dict = Depends(token_middleware)):
    user_data = get_user_by_email(token_data)
    user_data = user_data.as_dict()
    user_data.pop('password_hash')
    user_data.pop('online')
    response = JSONResponse(content={"user": user_data})
    return response


@router.post("/delete", response_class=HTMLResponse)
async def read_root(token_data: dict = Depends(token_middleware)):
    user_data = delete_user(token_data)
    response = JSONResponse(content={"deletedUser": user_data})
    return response

@router.get("/avatar/{email}")
async def get_image_file(email: str):
    base64_data = get_user_by_email(email).avatar
    binary_data = base64.b64decode(base64_data)

    return Response(content=binary_data, media_type="image/png")


@router.get("/profile", response_class=HTMLResponse)
async def read_root(request: Request, token_data: dict = Depends(token_middleware), db: Session = Depends(get_db)):
    user_data = get_user_by_email(token_data)
    user_posts = db.query(Post).filter(Post.user_id == user_data['user_id']).all()
    for post in user_posts:
        post_id = post.post_id
        db = next(get_database())
        comments = db.query(Comment).filter(Comment.post_id == post_id).all()
        for comment in comments:
            user = get_user_by_id(comment.user_id)
            comment.avatar = user['avatar']
            comment.first_name = user['first_name']
            comment.last_name = user['last_name']
        post.comments = comments

    return templates.TemplateResponse("profile.html",{"request": request, "user_data": user_data, "posts": user_posts})


@router.post("/edit-profile")
async def edit_profile(data: dict = Depends(token_and_body_middleware)):
    emailA = data['token_data']
    emailB = data['body']['email']
    first_name = data['body']['name']
    last_name = data['body']['last_name']
    password = pwd_context.hash(data['body']['password'])
    avatar = data['body']['avatar']
    user = edit_user(emailA, emailB, first_name, last_name, password,avatar)
    if user is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    return JSONResponse(content={"message": "Profile updated successfully"})

router.include_router(auth_router)