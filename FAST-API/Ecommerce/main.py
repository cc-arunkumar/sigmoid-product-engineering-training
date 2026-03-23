from fastapi import FastAPI

import app.controllers.product_controller as product_router

app = FastAPI()
app.include_router(product_router.router)
                     
@app.get("/")
def home() : 
    return{"message": "fastapi server is running !"} 