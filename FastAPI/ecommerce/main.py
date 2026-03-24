from fastapi import FastAPI 
from app.controllers.product_controller import router as product_router
from app.controllers import product_controller
from app.db.base import Base
from app.db.database import engine


app = FastAPI()
app.include_router(product_controller.router)

Base.metadata.create_all(bind=engine)

@app.get("/")
def home():
    return{"message":"FastAPI is running"}

app.include_router(product_controller.router)