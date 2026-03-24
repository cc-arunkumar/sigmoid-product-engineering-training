# from sqlalchemy import create_engine


# from sqlalchemy.ext.asyncio import create_async_engine,AsyncSession

# from sqlalchemy.orm import sessionmaker, declarative_base


# # DATABASE_URL= "mysql+pymysql://root:Iamforyou1%40@localhost:3306/ecommerce_db"

# #Async library
# DATABASE_URL= "mysql+aiomysql://root:Iamforyou1%40@localhost:3306/ecommerce_db"

# engine = create_async_engine(DATABASE_URL , echo=True)

# SessionLocal = sessionmaker (
#     #autocommit = False,
#     #autoflush = False,
#     bind = engine,
#     class = Asyncsession,
#     expire_on_commit=False

# )

# Base= declarative_base()

from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker, declarative_base

# Async MySQL URL
DATABASE_URL = "mysql+aiomysql://root:Iamforyou1%40@localhost:3306/ecommerce_db"

# Create async engine
engine = create_async_engine(
    DATABASE_URL,
    echo=True
)

# Create session factory
SessionLocal = sessionmaker(
    bind=engine,
    class_=AsyncSession,   # ✅ FIXED (class_ not class, AsyncSession capital S)
    expire_on_commit=False
)

# Base class for models
Base = declarative_base()