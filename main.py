# from fastapi import FastAPI
# from app.controllers.product_controller import router as product_router
# from app.db.database import engine
# from app.db.base import Base

# app = FastAPI()


# # create table
# Base.metadata.create_all(bind=engine)

# @app.get("/")
# def home():
#     return {"message": "FastAPI Server is running"}

# app.include_router(product_router)
# ---------------------async-----------------------
from fastapi import FastAPI
from app.controllers.product_controller import router as product_router
from app.db.database import engine, Base
app = FastAPI()
app.include_router(product_router)

from app.db.database import engine, Base

async def create_tables():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

@app.on_event("startup")
async def on_startup():
    await create_tables()