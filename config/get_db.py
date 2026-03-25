# # config/get_db.py
# from db.database import sessionLocal 

# def get_db():
#     db = sessionLocal()              
#     try:
#         yield db 
#     finally: 
#         db.close()

from sqlalchemy.ext.asyncio import AsyncSession 

from db.database import sessionLocal 


async def get_db():
    async with sessionLocal() as session : 
        yield session