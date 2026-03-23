from fastapi import APIRouter, HTTPException
from app.services.product_service import get_all_products, get_product_by_id, create_product, replace_product, delete_product, patch_product
from app.models.product_model import Product
from typing import List

router = APIRouter(
    prefix="/api/products",
    tags=["products"]
)


@router.get("/", response_model=List[Product])
def get_products():
    return get_all_products()

@router.get("/health")
def health_check():
    return {"status": "Product API is running"}

@router.get("/{product_id}", response_model=Product)
def get_product_ID(product_id: int):
    product = get_product_by_id(product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product

@router.post("/", response_model=Product)
def add_product(product: Product):
    return create_product(product)


@router.put("/{product_id}", response_model=Product)
def update_product(product_id: int, product: Product):
    updated_product = replace_product(product_id, product)

    if not updated_product:
        raise HTTPException(status_code=404, detail="Product not found")

    return updated_product


@router.delete("/{product_id}", status_code=204)
def delete_product_endpoint(product_id: int):
    success = delete_product(product_id)

    if not success:
        raise HTTPException(status_code=404, detail="Product not found")

    return None



