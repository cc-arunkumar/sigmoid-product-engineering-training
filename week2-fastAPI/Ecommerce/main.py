from fastapi import FastAPI
from app.controllers.productController import router as productRouter

from app.db.database import engine, Base
from app.db.base import ProductTable  # ensure model is registered

app = FastAPI()

Base.metadata.create_all(bind=engine)

app.include_router(productRouter)

@app.get("/")
def home():
    return {"message": "FastAPI server is started..."}