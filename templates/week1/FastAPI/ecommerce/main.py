from fastapi import FastAPI
from controllers.product_controller import router as product_router
from db.database import engine
from db.base import Base

app = FastAPI()

# Create tables
Base.metadata.create_all(bind = engine)

app.include_router(product_router)

@app.get("/")
def home():
    return {"FastAPI server is running"}