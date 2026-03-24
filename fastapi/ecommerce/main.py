from fastapi import FastAPI
from app.controllers.product_controller import router as product_router
from app.db.database import engine
from app.db.base import Base
app= FastAPI()
async def create_tables():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
@app.on_event("startup")
async def startup_event():
    await create_tables()
app.include_router(product_router)
@app.get("/")
def home():
    return {"message":"FastAPI server is running hihihahaha"}
app.include_router(product_router)