from fastapi import APIRouter, HTTPException
from app.services.product_service import get_all_products, get_product_by_id

router = APIRouter(
    prefix="/api/products",
    tags=["Products"]
)

@router.get("/")
def get_products():
    return get_all_products()


@router.get("/{product_id}")
def get_product(product_id: int):
    product = get_product_by_id(product_id)
    
    if product:
        return product
    
    raise HTTPException(status_code=404, detail="Product not found")