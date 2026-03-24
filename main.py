from fastapi import FastAPI
from app.controllers.product_controller import router as product_router
from app.db.database import engine
from app.db.base import Base

app = FastAPI()


# create table
Base.metadata.create_all(bind=engine)

@app.get("/")
def home():
    return {"message": "FastAPI Server is running"}

app.include_router(product_router)