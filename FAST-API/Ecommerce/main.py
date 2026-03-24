from fastapi import FastAPI
from app.controllers.product_controller import router as product_router
from app.db.database import engine
from app.db.base import Base

from app.db import base  

app = FastAPI()

# Async function to create tables
async def create_tables():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

# Run table creation on startup
@app.on_event("startup")
async def on_startup():
    await create_tables()

@app.get("/")
def home():
    return {"message": "FastAPI Server is running"}

# Include product routes
app.include_router(product_router)