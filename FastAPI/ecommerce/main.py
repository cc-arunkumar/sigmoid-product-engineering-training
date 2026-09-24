from fastapi import FastAPI
from controllers.product_controller import router as product_router

app=FastAPI()

app.include_router(product_router)

@app.get("/")
def home():
    return{"message":"fastAPI server is running"}