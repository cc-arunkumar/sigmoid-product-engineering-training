from fastapi import FastAPI
from app.controllers.productController import router as productRouter
from app.db.database import engine
from app.db.base import Base

app = FastAPI()


# Create tables (ASYNC)
async def create_tables():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)


# Run on startup
@app.on_event("startup")
async def on_startup():
    await create_tables()


# Include router
app.include_router(productRouter)


@app.get("/")
def home():
    return {"message": "FastApi server is running by abhi"}