# from sqlalchemy import create_engine
# from sqlalchemy.orm import sessionmaker, declarative_base

# #details of db
# DATABASE_URL = "mysql+pymysql://root:Root%40%231234@localhost:3306/ecommerce_db"

# engine = create_engine(DATABASE_URL)


# SessionLocal = sessionmaker(
#     autocommit=False,
#     autoflush=False,
#     bind=engine
# )

# Base = declarative_base()

from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker, declarative_base

DATABASE_URL = "mysql+aiomysql://root:Root%40%231234@localhost:3306/ecommerce_db"

engine = create_async_engine(
    DATABASE_URL,
    echo=True
)

SessionLocal = sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False
)

Base = declarative_base()