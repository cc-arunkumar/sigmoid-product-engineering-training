from sqlalchemy.ext.asyncio import AsyncSession

from app.db.database import SessionLocal


async def get_db():
    # db= SessionLocal()

    # try:
    #     yield db
    # finally:
    #     db.close()

    async with SessionLocal() as session:
        yield session