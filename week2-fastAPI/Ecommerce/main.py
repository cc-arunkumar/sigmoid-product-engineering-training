from fastapi import FastAPI
from app.controllers.productController import router as productRouter

app = FastAPI()

app.include_router(productRouter)

@app.get("/")
def home():
    return {"message": "FastAPI server is started..."}