from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

DATABASE_URL = "mysql+aiomysql://root:Anwesha123@localhost:3306/ecommerce_db"

# Async engine
engine = create_async_engine(
    DATABASE_URL,
    echo=True
)

# Async session factory
SessionLocal = sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False
)

# Base class for models
Base = declarative_base()