from fastapi import FastAPI
from controllers.product_controller import router as product_router
from db.database import engine
from db.base import Base
from sqlalchemy import text

from db import base  # ensures models are loaded

app = FastAPI()

# ✅ Create tables (ASYNC WAY)
async def create_tables():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

# ✅ Startup event
@app.on_event("startup")
async def on_startup():
    await create_tables()

# ✅ Optional: DB connection test (ASYNC)
@app.on_event("startup")
async def test_db_connection():
    try:
        async with engine.begin() as conn:
            await conn.execute(text("SELECT 1"))
        print("✅ Database connected successfully!")
    except Exception as e:
        print("❌ Database connection failed:", e)

# ✅ Routes
@app.get("/")
async def home():
    return {"message": "FastAPI server is running"}

# ✅ Include router
app.include_router(product_router)