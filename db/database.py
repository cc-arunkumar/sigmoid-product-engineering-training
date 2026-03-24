from sqlalchemy import create_engine 
from sqlalchemy.orm import sessionmaker , declarative_base

DATABASE_URL = "mysql+pymysql://root:12345678@localhost:3306/e_commerce_db"

engine = create_engine(DATABASE_URL)

sessionLocal = sessionmaker(
    autocommit = False , 
    autoflush=False , 
    bind= engine
)

Base = declarative_base()