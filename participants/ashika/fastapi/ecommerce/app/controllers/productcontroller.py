from fastapi import APIRouter
from app.services.products_service import getallProduct

router=APIRouter(
    prefix="/api/products",
    tags=["Products"]
)


@router.get("/")
def get_products():
    products=getallProduct()
    return products


