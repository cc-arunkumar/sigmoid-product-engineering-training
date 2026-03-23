from fastapi import APIRouter, HTTPException
from services.product_service import (
    get_all_products,
    get_productById,
    create_product,
    update_product,
    patch_product,
    delete_product
)
from models.product_model import Product

router = APIRouter(
    prefix="/api/products",
    tags=["Products"]
)

# GET all products
@router.get("/")
def get_products():
    return get_all_products()


# GET product by ID
@router.get("/{product_id}")
def get_product_by_id(product_id: int):
    product = get_productById(product_id)

    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    return product


#  CREATE product
@router.post("/")
def add_product(product: Product):
    return create_product(product)


#  UPDATE product
@router.put("/{product_id}")
def update_product_by_id(product_id: int, product: Product):
    updated = update_product(product, product_id)

    if not updated:
        raise HTTPException(status_code=404, detail="Product not found")

    return updated


# PATCH product
@router.patch("/{product_id}")
def patch_product_by_id(product_id: int, product: dict):
    updated = patch_product(product_id, product)

    if not updated:
        raise HTTPException(status_code=404, detail="Product not found")

    return updated


# DELETE product
@router.delete("/{product_id}")
def delete_product_by_id(product_id: int):
    deleted = delete_product(product_id)

    if not deleted:
        raise HTTPException(status_code=404, detail="Product not found")

    return deleted