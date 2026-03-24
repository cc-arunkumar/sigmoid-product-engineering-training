# from fastapi import FastAPI 
# from app.controllers.product_controller import router as product_router
# from app.controllers import product_controller
# from app.db.base import Base
# from app.db.database import engine


# app = FastAPI()
# app.include_router(product_controller.router)

# Base.metadata.create_all(bind=engine)

# @app.get("/")
# def home():
#     return{"message":"FastAPI is running"}

# app.include_router(product_controller.router)

from fastapi import FastAPI
from app.controllers.product_controller import router as product_router
from app.db.database import engine, Base

app = FastAPI()

app.include_router(product_router)

async def create_tables():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

@app.on_event("startup")
async def on_startup():
    await create_tables()

@app.get("/")
async def home():
    return {"message": "FastAPI is running"}

