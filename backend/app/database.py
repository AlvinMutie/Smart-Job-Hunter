from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import os
from app.models.models import Base

# Database URL - default to sqlite for local dev if postgre isn't ready
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./job_hunter_v3.db")

engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False} if "sqlite" in DATABASE_URL else {})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def init_db():
    Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
