from fastapi import APIRouter, HTTPException
from app.services.product_service import (
    get_all_products,
    get_product_by_id,
    create_product,
    put_product,
    patch_product
)
from app.models.product_model import Product, ProductUpdate

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


@router.post("/")
def add_product(product: Product):
    return create_product(product)


@router.put("/{product_id}")
def update_product(product_id: int, product: Product):
    updated = put_product(product_id, product)
    
    if updated:
        return updated
    
    raise HTTPException(status_code=404, detail="Product not found")


@router.patch("/{product_id}")
def update_partial_product(product_id: int, product: ProductUpdate):
    updated = patch_product(product_id, product)

    if updated:
        return updated
    
    raise HTTPException(status_code=404, detail="Product not found")