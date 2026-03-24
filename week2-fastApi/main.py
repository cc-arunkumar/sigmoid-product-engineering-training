from fastapi import FastAPI
from app.controllers.productController import router as productRouter
from app.db.database import engine
from app.db.base import Base
app=FastAPI()
# Create tables
Base.metadata.create_all(bind=engine)
app.include_router(productRouter)
@app.get("/")
def home():
    return {"message":"FastApi server is running by abhi"}