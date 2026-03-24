from fastapi import FastAPI
from app.controller.product_controller import router as product_router
from db.base import Base
from db.database import engine

Base.metadata.create_all(bind=engine)

app = FastAPI()
app.include_router(product_router)  

@app.get("/")
def home():
    return{"message": "Welcome to the Ecommerce API!!!!!"}
