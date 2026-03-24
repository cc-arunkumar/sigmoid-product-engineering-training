from fastapi import APIRouter, HTTPException
from app.services.product_service import (
    get_all_products,
    get_product_by_id,
    create_product,
    update_product,patch_update
)
from app.models.product_model import Product, ProductUpdate


router = APIRouter(
    prefix="/api/products",
    tags=["products"]
)

@router.get("/")
def get_products():
    return {"products": get_all_products()}

@router.get("/{product_id}")
def get_product(product_id: int):
    product = get_product_by_id(product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return {"product": product}

@router.post("/")
def c_product(product: Product):
    return create_product(product.dict())   

@router.put("/{product_id}")
def u_product(product_id: int, product: Product):
    updated_p = update_product(product_id, product.dict())   

    if not updated_p:
        raise HTTPException(status_code=404, detail="Product not found")

    return updated_p   

# PATCH Product
@router.patch("/{product_id}")
def update_partial_product(product_id: int, patch_data: ProductUpdate):
    patched_product = patch_update(product_id, patch_data)

    if not patched_product:
        raise HTTPException(status_code=404, detail="Product not found!")

    return patched_product