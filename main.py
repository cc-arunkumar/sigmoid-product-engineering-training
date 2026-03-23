from fastapi import FastAPI
from controllers.product_controller import router as product_router

app = FastAPI(title="My Sigmoid Project API")

# Include the router from the controllers folder
app.include_router(product_router)

@app.get("/")
def root():
    return {"message": "Welcome to the Main API"}