from fastapi import FastAPI
from app.controllers.product_controller import product_router
from app.db.database import engine, Base

app = FastAPI()
app.include_router(product_router)

Base.metadata.create_all(bind=engine)

@app.get("/")
def home():
    return {"message" : "FastAPI server is running"}