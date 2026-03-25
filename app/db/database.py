# from sqlalchemy import create_engine

from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker, declarative_base

# DATABASE_URL = "mysql+pymysql://root:Sigmoid_1234@localhost:3306/ecommerce_db"

DATABASE_URL = "mysql+aiomysql://root:Sigmoid_1234@localhost:3306/ecommerce_db"

engine = create_async_engine(DATABASE_URL)

# SessionLocal = sessionmaker(
#     autocommit=False,
#     autoflush=False,
#     bind=engine
# )

SessionLocal = sessionmaker(
    bind=engine,
    expire_on_commit=False,
    class_= AsyncSession
)

Base = declarative_base()