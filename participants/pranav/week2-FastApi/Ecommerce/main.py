from fastapi import FastAPI
from app.controllers.product_controllers import router as product_router


app=FastAPI()

@app.get("/")
def home():
    return {"message":"FastAPI server is running"}
 
app.include_router(product_router)
