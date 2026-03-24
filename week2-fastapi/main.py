# from fastapi import FastAPI
# from sqlalchemy import text
# from db.database import engine
# from db.base import Base
# from controllers.product_controller import router as product_router

# app = FastAPI()
# Base.metadata.create_all(bind=engine)
# # Include router
# @app.on_event("startup")
# def test_db_connection():
#     try:
#         with engine.connect() as conn:
#             conn.execute(text("SELECT 1"))
#         print("✅ Database connected successfully!")
#     except Exception as e:
#         print("❌ Database connection failed:", e)
# app.include_router(product_router)

# @app.get("/")
# def home():
#     return {"message": "Hello from Mac 🚀"}

from fastapi import FastAPI
from controllers.product_controller import router as product_router
from db.database import engine, Base

app = FastAPI()

app.include_router(product_router)

async def create_tables():
    async with engine.begin() as conn:
        # run_sync is used because Base.metadata.create_all is a synchronous method
        await conn.run_sync(Base.metadata.create_all)

@app.on_event("startup")
async def on_startup():
    await create_tables()