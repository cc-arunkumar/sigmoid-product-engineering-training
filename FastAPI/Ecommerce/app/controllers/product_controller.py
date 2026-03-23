from fastapi import APIRouter, HTTPException
from app.services.product_service import get_all_products, get_product_by_id

product_router = APIRouter(
    prefix="/api/products",
    tags=["Products"]
)

@product_router.get("/")
def get_products():
    return get_all_products()

@product_router.get("/{product_id}")
def get_product(product_id: int):
    product = get_product_by_id(product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product
