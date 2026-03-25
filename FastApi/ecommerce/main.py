from fastapi import FastAPI
from app.controllers.product_controller import router as product_router
from app.db.database import engine
from app.db.base import Base

app = FastAPI()

@app.on_event("startup")
async def on_startup():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

app.include_router(product_router)

@app.get("/")
def home():
    return {"message": "FastAPI server is running..."}
