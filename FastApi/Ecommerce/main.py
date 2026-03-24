from fastapi import FastAPI
from app.controllers.product_controller import router as product_router
from app.db.database import Base, engine
app = FastAPI()
app.include_router(product_router) 


async def create_tables():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

@app.on_event("startup")
async def on_startup():
    await create_tables()
@app.get("/") 
def home():
    return {"message": "FastAPI Ecommerce Application is running!"}
