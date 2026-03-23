from fastapi import FastAPI
from controllers.product_controller import router as products_router
app = FastAPI()

app.include_router(products_router)

@app.get("/")
def home():
    return "hello_hi"

