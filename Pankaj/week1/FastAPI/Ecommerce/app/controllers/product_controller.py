from fastapi import FastAPI
from app.coontrollers.product_controller import router as product_router

app = FastAPI()

app.include_router(product_router)
@app.get("/")
def home():
    return {"message":"FastAPI Ecommerce Application is running!!"}