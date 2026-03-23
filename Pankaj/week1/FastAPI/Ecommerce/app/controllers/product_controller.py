from fastapi import APIRouter, HTTPException
from app.services.product_service import (
    get_all_products,
    get_product_by_id,
    create_product,
    put_product
)
from app.models.product_model import Product 

router = APIRouter(
    prefix="/api/products",
    tags=["Products"]
)

# GET ALL
@router.get("/")
def get_products():
    return get_all_products()


# GET BY ID
@router.get("/{product_id}")
def get_product(product_id: int):
    product = get_product_by_id(product_id)
    
    if product:
        return product
    
    raise HTTPException(status_code=404, detail="Product not found")


# CREATE
@router.post("/")
def add_product(product: Product):   # 🔥 correct naming
    return create_product(product)   # 🔥 correct function


#  UPDATE
@router.put("/{product_id}")
def update_product(product_id: int, product: Product):
    updated = put_product(product_id, product)
    
    if updated:
        return updated
    
    raise HTTPException(status_code=404, detail="Product not found")

@router.patch("")