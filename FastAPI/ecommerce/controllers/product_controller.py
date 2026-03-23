from fastapi import FastAPI, APIRouter
from services.product_service import get_all_products

router=APIRouter(
    prefix="/api/products",
    tags=["Products"]
)

@router.get("/")
def get_products():
    products=get_all_products()
    return products