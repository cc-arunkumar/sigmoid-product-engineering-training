from fastapi import FastAPI
from app.controllers.product_controller import router as product_router
from app.db.database import engine, base

app = FastAPI()

async def create_tables():
    async with engine.begin() as conn:
        await conn.run_sync(base.metadata.create_all)

@app.on_event("startup")
async def on_startup():
    await create_tables()

# Include routes
app.include_router(product_router)
