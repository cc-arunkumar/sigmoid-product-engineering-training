# from sqlalchemy import create_engine

# for asyn operation
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession

from sqlalchemy.orm import sessionmaker , declarative_base

#DATABASE_URL="mysql+pymysql://root:Ashika1234!@localhost:3306/Ecommerce_io_db"

DATABASE_URL="mysql+aiomysql://root:Ashika1234!@localhost:3306/Ecommerce_io_db"

#engine =create_engine(DATABASE_URL)

engine =create_async_engine(DATABASE_URL, echo=True)

SessionLocal=sessionmaker(
    # autocommit=False,
    # autoflush=False,
    # bind=engine

    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False
)
                       
Base=declarative_base()
