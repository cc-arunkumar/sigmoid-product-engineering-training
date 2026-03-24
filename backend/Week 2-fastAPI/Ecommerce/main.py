from fastapi import FastAPI
from app.database import Base, engine
from app.routes.product_routes import router as product_router
from app.models.product_model import Product  # important import

app = FastAPI()

Base.metadata.create_all(bind=engine)

app.include_router(product_router, prefix="/api/products", tags=["Products"])