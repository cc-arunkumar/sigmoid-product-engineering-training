from fastapi import APIRouter
from services.product_service import get_all_products
router = APIRouter(
    prefix="/api/products",
    tags=["Products"]
)

@router.get("/")
def get_products():
    return get_all_products()
