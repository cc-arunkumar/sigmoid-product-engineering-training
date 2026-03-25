from fastapi import APIRouter, HTTPException
from services.product_service import get_all_products, get_product_by_id

router = APIRouter(
    prefix="/api/products",
    tags=["products"]
)


@router.get("/")
def get_products():
    return get_all_products()

@router.get("/health")
def health_check():
    return {"status": "Product API is running"}

@router.get("/{product_id}")
def get_product_ID(product_id: int):
    product = get_product_by_id(product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product

