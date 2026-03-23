from fastapi import  APIRouter, HTTPException

from app.services.product_service import get_all_products, get_product_by_id

router = APIRouter(
    prefix = "/api/products",
    tags = ["Products"]
)

@router.get("/")
def get_products():
    products = get_all_products()
    return products


@router.get("/health")
def health_check():
    return {"status": "healthy"}

@router.get("/{product_id}")
def get_product(product_id: int):
    product = get_product_by_id(product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product