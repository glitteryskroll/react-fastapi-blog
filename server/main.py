
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles

from api.routers.user_router import router as user_router
from api.routers.publication_router import router as pb_router
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI

# uvicorn main:app --reload

app = FastAPI()

# Настройка CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*", "http://localhost:3000"],  # Разрешить все источники, можно указать конкретные
    allow_credentials=True,
    allow_methods=["*"],  # Разрешить все методы (GET, POST, etc.)
    allow_headers=["*"],  # Разрешить все заголовки
)

templates = Jinja2Templates(directory="templates")
app.include_router(user_router, prefix="/user")
app.include_router(pb_router, prefix="/post")