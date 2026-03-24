from fastapi import FastAPI
from app.controllers.product_controller import router as product_router
from app.db.database import engine
from app.db.base import Base

app = FastAPI()

# Create tables on startup event
@app.on_event("startup")
def create_tables():
    Base.metadata.create_all(bind=engine)

@app.get("/")
def home():
    return {"message": "FastAPI server is running"}

# Include product routes
app.include_router(product_router, prefix="/products", tags=["Products"])