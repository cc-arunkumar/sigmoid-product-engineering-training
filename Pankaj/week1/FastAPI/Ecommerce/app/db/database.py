from sqlalchemy.engine import URL
from sqlalchemy.orm import sessionmaker, declarative_base
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession

DATABASE_URL = URL.create(
    drivername="mysql+aiomysql",
    username="root",
    password="Playstore@123",
    host="localhost",
    port=3306,
    database="ecommerce_db"
)

engine = create_async_engine(DATABASE_URL)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine,
    class_=AsyncSession
)

Base = declarative_base()

