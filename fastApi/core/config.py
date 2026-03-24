# from db.database import SessionLocal #sessionLocal is factory

# def get_db():
#     db = SessionLocal() #to bring all details
#     try:
#         yield db        #to bring db object
#     finally:
#         db.close()

from sqlalchemy.ext.asyncio import AsyncSession
from db.database import SessionLocal

async def get_db():
    async with SessionLocal() as session:
        yield session