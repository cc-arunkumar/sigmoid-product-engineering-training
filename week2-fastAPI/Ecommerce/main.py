from fastapi import FastAPI
from app.controllers.productController import router as productRouter

from app.db.database import engine, Base
from app.db.base import ProductTable 

app = FastAPI()

app.include_router(productRouter)

async def create_tables():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
        

@app.on_event("startup")
async def on_startup():
    await create_tables()

@app.get("/")
def home():
    return {"message": "FastAPI server is started..."}