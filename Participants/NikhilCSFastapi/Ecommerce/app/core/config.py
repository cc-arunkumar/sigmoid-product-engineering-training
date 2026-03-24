from app.db.database import SessionLocal
from sqlalchemy.ext.asyncio import AsyncSession
# def get_db():
#     db=SessionLocal()
#     try:
#         yield db
#     finally:
#         db.close()
# had to install green_let also 
async def get_db():
    async_session=SessionLocal()
    async with async_session as session:
        yield session

# extra packages installed today one is cryptography for environment variable pasing password and other is greenlet for asynchronous connection spaqning in macos with python 3.11.1