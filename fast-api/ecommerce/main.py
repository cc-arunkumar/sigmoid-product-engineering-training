from fastapi import FastAPI 
from app.controllers.product_controller import router as product_router
from app.db.database import engine, Base
from app.db.base import Product  # Import Product model to register it with Base
app = FastAPI()
async def create_tables():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

@app.on_event("startup")
async def on_startup():
    await create_tables()
    
@app.get("/")
def home():
    return {"message": "FastAPI server is working!"}
app.include_router(product_router)