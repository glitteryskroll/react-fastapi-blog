import datetime
from configurations import SECRET_KEY, ALGORITHM
from fastapi import Depends, HTTPException, Cookie, Body
from sqlalchemy.orm import sessionmaker
import jwt
from jwt.exceptions import DecodeError as JWTError
from datetime import datetime
from db import User, engine, get_db

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def token_middleware(access_token: str = Cookie(None)):
    if access_token:
        try:
            payload = jwt.decode(access_token, SECRET_KEY, algorithms=[ALGORITHM])
            email: str = payload.get("sub")

            if email is None:
                raise HTTPException(status_code=401, detail="Invalid token")

            db = next(get_db())
            user = db.query(User).filter(User.email == email).first()
            user.online = datetime.utcnow()
            db.commit()
            db.refresh(user)
            return email
        except JWTError:
            print(JWTError)
            raise HTTPException(status_code=401, detail="Invalid token")
    else:
        raise HTTPException(status_code=401, detail="Invalid token")

def token_and_body_middleware(token_data: dict = Depends(token_middleware), body: dict = Body(...)):
    return {"token_data": token_data, "body": body}