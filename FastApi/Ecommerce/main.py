from fastapi import FastAPI
from app.controllers.product_controller import router as product_router
from app.db.base import Base
from app.db.database import engine
Base.metadata.create_all(bind=engine)
app = FastAPI()
app.include_router(product_router) 
@app.get("/") 
def home():
    return {"message": "FastAPI Ecommerce Application is running!"}
