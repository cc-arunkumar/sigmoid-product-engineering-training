#from sqlalchemy import create_engine

from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker, declarative_base

DATABASE_URL = "mysql+aiomysql://root:Neha%40Sid@localhost/ecommerce_db"

engine = create_async_engine(DATABASE_URL, echo=True)
SessionLocal = sessionmaker(
    bind = engine,
    class_ = AsyncSession,
    expire_on_commit = False # recommended for async
)

Base = declarative_base()