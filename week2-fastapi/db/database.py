
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

#details of db
DATABASE_URL = "mysql+pymysql://root:My%24ecure%40123@localhost:3306/ecommerce_db"

engine = create_engine(DATABASE_URL)


SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

Base = declarative_base()