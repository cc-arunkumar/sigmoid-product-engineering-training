from fastapi import FastAPI
from app.controllers.product_controller import router as product_router
from app.db.database import engine
from app.db.base import Base
app= FastAPI()
Base.metadata.create_all(bind=engine)
app.include_router(product_router)
@app.get("/")
def home():
    return {"message":"FastAPI server is running hihihahaha"}
app.include_router(product_router)