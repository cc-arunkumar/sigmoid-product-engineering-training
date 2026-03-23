from fastapi import APIRouter
from app.services.product_service import get_all_products

product_router = APIRouter(
    prefix="/api/products",
    tags=["Products"]
)

@product_router.get("/")
def get_products():
    return get_all_products()