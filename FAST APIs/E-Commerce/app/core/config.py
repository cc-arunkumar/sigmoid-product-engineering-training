from sqlalchemy.ext.asyncio import AsyncSession
from app.db.database import SessionLocal

async def get_db():
    async with SessionLocal() as session:
        yield session

# This function creates a database session for each request and safely closes it