from fastapi import FastAPI
from controllers.product_controller import router as product_router
from db.database import engine
from db.base import Base

app = FastAPI()

Base.metadata.create_all(bind=engine)

@app.get("/") #DEFAULT

def home():
    return{"message" : "FastAPI server is running"}   

app.include_router(product_router)