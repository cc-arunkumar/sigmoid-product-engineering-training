from fastapi import APIRouter
from services.product_service import get_all_products
router = APIRouter(
    prefix="/api/product",
    tags=["Products"]  
)
@router.get("/")
def get_products():
    return get_all_products()
@router.get("/health")
def health_check():
    return {"status": "Product APIs running!"}