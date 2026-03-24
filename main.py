from fastapi import FastAPI
from app.controllers.product_controller import router as product_router

app = FastAPI()

@app.get("/")
def home():
    return {"message": "FastAPI server is running"}

# Include product routes
app.include_router(product_router, prefix="/products", tags=["Products"])