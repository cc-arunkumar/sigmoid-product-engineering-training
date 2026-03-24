from fastapi import FastAPI

from app.controllers.product_controller import router as product_router

from app.db.database import engine

from app.db.base import Base

app = FastAPI()

#Create tables
# Base.metadata.create_all(bind=engine)

# @app.get("/")
# def home():
#     return {"message": "FastAPI server is not running!"}


# app.include_router(product_router)

async def init_db():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

@app.on_event("startup")
async def on_startup():
    await init_db()