from fastapi import FastAPI
from app.controllers.product_controller import router as product_router
from app.db.database import engine
from app.db.base import Base

app= FastAPI()
app.include_router(product_router)

Base.metadata.create_all(bind=engine)

@app.get("/")
def home():
    return {"message":"fastapi is running,:we are trying to change it a little;"}

app.include_router(product_router)