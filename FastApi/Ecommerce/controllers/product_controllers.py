from fastapi import FastAPI  , APIRouter
from services.product_service import get_all_products

router  = APIRouter(
    prefix="/api/products",
    tags=["products"]
)

@router.get("/")
def get_products():
    prodcuts = get_all_products()
    return prodcuts

@router.get("/health")
def system_health():
    return {"message": "System is healthy !!!!!!!"}