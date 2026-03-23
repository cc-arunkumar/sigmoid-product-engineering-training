from fastapi import FastAPI 
import app.controllers.product_controller as product_controller

app = FastAPI()
app.include_router(product_controller.router)

@app.get("/")
def home():
    return{"message":"FastAPI is running"}
