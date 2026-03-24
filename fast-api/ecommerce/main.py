from fastapi import FastAPI 
from app.controllers.product_controller import router as product_router
from app.db.database import engine, Base
from app.db.base import Product  # Import Product model to register it with Base
app = FastAPI()
Base.metadata.create_all(bind=engine)

@app.get("/")
def home():
    return {"message": "FastAPI server is working!"}
app.include_router(product_router)