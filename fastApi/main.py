from fastapi import FastAPI
import controllers.product_controller as product_controller

app = FastAPI()

app.include_router(product_controller.router)

@app.get("/")
def home():
    return {"message": "FastAPI server is running"}