from fastapi import APIRouter, HTTPException
from app.services.product_service import get_all_products, get_product_by_id


router=APIRouter(
    prefix="/api/product",
    tags=["Products"]
)

@router.get("/health")
def health_check():
    return{"Message":"Product API is healthy !"}


@router.get("/")
def get_all_products():
    products=get_all_products()
    return{"Products":products}

@router.get("/{product_id}")
def get_product_id(product_id:int):
    product=get_product_by_id(product_id)

    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product
