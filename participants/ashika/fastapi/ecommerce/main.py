from fastapi import FastAPI;

from app.controllers.productcontroller import router as product_router

app=FastAPI()

@app.get("/")
def home():
    return {"message" : "fastapi server is running..."}

app.include_router(product_router)
