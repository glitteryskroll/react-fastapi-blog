# Используем официальный образ Python
FROM python:3.11

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем зависимости
COPY requirements.txt /app/

# Устанавливаем зависимости
RUN pip install --no-cache-dir -r requirements.txt

# Копируем исходный код FastAPI приложения
COPY . /app/

# Указываем порт, на котором будет работать FastAPI
EXPOSE 8000

# Команда для запуска FastAPI приложения
CMD ["sh", "-c", "python db.py && uvicorn main:app --host 0.0.0.0 --port 8000"]
