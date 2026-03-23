from fastapi import APIRouter
from app.services.product_service import get_all_products
router=APIRouter(
    prefix="/api/product",
    tags=["Products"]
)

@router.get("/")
def get_products():
    products=get_all_products()
    return products
