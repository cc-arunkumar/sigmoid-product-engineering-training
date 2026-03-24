from contextlib import asynccontextmanager
from fastapi import FastAPI
from app.controllers.product_controller import product_router
from app.db.database import engine, Base

@asynccontextmanager
async def lifespan(app: FastAPI):
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    yield

app = FastAPI(lifespan=lifespan)
app.include_router(product_router)

@app.get("/")
def home():
    return {"message" : "FastAPI server is running"}