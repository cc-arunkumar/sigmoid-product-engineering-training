from fastapi import FastAPI
from app.controllers.product_controller import router as product_router
from app.db.database import engine
from app.db.base import Base

app= FastAPI()
app.include_router(product_router)
from app.db.database import engine, Base

async def create_tables():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
# Base.metadata.create_all(bind=engine)

@app.get("/")
async def home():
    await create_tables()
    return {"message":"fastapi is running,:we are trying to change it a little;"}

app.include_router(product_router)