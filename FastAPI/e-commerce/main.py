from fastapi import FastAPI
import app.controllers.product_controller as product_controller
from app.db.database import engine, Base


# Create tables
# Base.metadata.create_all(bind=engine)

app = FastAPI()
app.include_router(product_controller.router)

async def create_tables():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

@app.on_event("startup")
async def startup_event():
    await create_tables()

@app.get("/")
def home():
    return {"message": "FastAPI server is running on http://127.0.0.1:8000!"}

