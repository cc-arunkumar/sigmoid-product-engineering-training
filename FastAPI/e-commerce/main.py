from fastapi import FastAPI
import app.controllers.product_controller as product_controller
from app.db.database import engine
from app.db.base import Base

# Create tables
Base.metadata.create_all(bind=engine)

app = FastAPI()
app.include_router(product_controller.router)

@app.get("/")
def home():
    return {"message": "FastAPI server is running on http://127.0.0.1:8000!"}
