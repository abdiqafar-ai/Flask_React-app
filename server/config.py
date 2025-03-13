from dotenv import load_dotenv
import os

load_dotenv()  # Load environment variables from .env

class Config:
    DATABASE_URL = os.getenv("DATABASE_URL")
    if DATABASE_URL:
        SQLALCHEMY_DATABASE_URI = DATABASE_URL.replace("postgres://", "postgresql://", 1)
    else:
        raise RuntimeError("DATABASE_URL is not set.")
    