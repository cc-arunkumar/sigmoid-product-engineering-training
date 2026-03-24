from fastapi import FastAPI;
from app.db.base import Base
from app.db.database import engine

from app.controllers.productcontroller import router as product_router

app=FastAPI()

#reate table
Base.metadata.create_all(bind=engine)

@app.get("/")
def home():
    return {"message" : "fastapi server is running..."}

app.include_router(product_router)
