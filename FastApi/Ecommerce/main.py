from fastapi import FastAPI
from controller.product_controller import router as product_router

app = FastAPI()
app.include_router(product_router)  

@app.get("/")
def home():
    return{"message": "Welcome to the Ecommerce API!!!!!"}
