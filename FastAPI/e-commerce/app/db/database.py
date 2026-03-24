# from sqlalchemy import create_engine
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# DATABASE_URL = "mysql+pymysql://root:1234@localhost:3306/ecom_db"

DATABASE_URL = "mysql+aiomysql://root:1234@localhost:3306/ecom_db"

engine = create_async_engine(DATABASE_URL, echo=True)

SessionLocal = sessionmaker(
    bind = engine, 
    class_ = AsyncSession,
    expire_on_commit = False
)

Base = declarative_base()