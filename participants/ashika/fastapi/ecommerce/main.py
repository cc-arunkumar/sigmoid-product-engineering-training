from fastapi import FastAPI;

from app.db.database import engine , Base

from app.controllers.productcontroller import router as product_router

app=FastAPI()

app.include_router(product_router)

#create table
async def create_tables():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

@app.on_event("startup")    
async def on_startup():
    await create_tables() 

