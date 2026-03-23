from fastapi import FastAPI
import app.controller.product_controller as product_controller

app=FastAPI()

app.include_router(product_controller.router)

@app.get("/")
def home():
    return{"Message":"FastAPI is running !"}