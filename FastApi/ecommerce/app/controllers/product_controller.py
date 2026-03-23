from fastapi import FastAPI, APIRouter
from app.services.product_service import get_all_products

router = APIRouter(
    prefix="/api/products",
    tags=["Products"]
)

@router.get("/")
def get_products():
    products = get_all_products()
    return products

@router.get("/health")
def system_health():
    return {"message": "System is working fine"}