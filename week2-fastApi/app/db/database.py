#from sqlalchemy import create_engine
from sqlalchemy.ext.asyncio import create_async_engine,AsyncSession
from sqlalchemy.orm import sessionmaker, declarative_base

DATABASE_URL = "mysql+aiomysql://root:Abhi%4013092003@localhost:3306/ecommerce_db"

engine = create_async_engine(DATABASE_URL,echo=True)

SessionLocal = sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False
) 

Base = declarative_base()