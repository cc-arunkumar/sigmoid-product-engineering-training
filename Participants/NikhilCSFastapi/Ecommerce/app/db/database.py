import os
# similar to the require("dotenv).config() of nodejs this is the library we use in python in order to process the environment variables 
#  from sqlalchemy import create_engine
from sqlalchemy.ext.asyncio  import create_async_engine,AsyncSession
from sqlalchemy.orm import sessionmaker,declarative_base
from dotenv import load_dotenv
# here i have downloadede the python-dotenv modeule globally in order to process.a .env file in order to process envronment variables tehen i load it by using below function
load_dotenv()
SQL_DB_NAME=os.getenv("SQL_DB_NAME")
SQL_PORT=os.getenv("SQL_PORT")
SQL_PASSWORD=os.getenv("SQL_PASSWORD")
SQL_USER_NAME=os.getenv("SQL_USER_NAME")
SQL_HOST_NAME=os.getenv("SQL_HOST_NAME")
# have to use f string and template literals to access actual values of variables 
# one isue with python based fastapi api endpoints for sqlalchemy is that password has to be passed in encrypted format to it for sql connection so installing the module called cryptography also becomes compulsory for this 
DATABASE_URL = f"mysql+aiomysql://{SQL_USER_NAME}:{SQL_PASSWORD}@{SQL_HOST_NAME}:{SQL_PORT}/{SQL_DB_NAME}"
engine=create_async_engine(DATABASE_URL,echo=True)
SessionLocal=sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False
)
# all the data which a person is trying to bulk insert when one insert is trying to insert multiple rows into our sql table first that data will be stored in tehe bffer and once insert is performed the entire buffer is scanned again and made sure to be emptied onto our table to ensure accuray of data and athat all data is inserted properly into the table this is called autoflushing flushing the buffer data onto the table properly if set to false maybe in bulk inserts some data fails to insert even with insert command which is problmematic but with small amount of data we wont face an issue 
Base=declarative_base()