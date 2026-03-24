from fastapi import FastAPI, APIRouter, HTTPException

from app.models.product_model import Product, ProductUpdate
from app.services.product_service import get_all_products, get_product_by_id, create_product, replace_product, patch_update, delete_product

router = APIRouter(
    prefix="/api/products",
    tags=["Products"]
)

# Get All products
@router.get("/")
def get_products():
    products = get_all_products()
    return products

# Get product by ID
@router.get("/{product_id}")
def get_product(product_id: int):
    product = get_product_by_id(product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    return product

# Create new product
@router.post("/")
def add_product(product: Product):
    return create_product(product)

# Put product
@router.put("/{product_id}")
def update_product(product_id: int, product: Product):
    updated_product = replace_product(product_id, product)

    if not updated_product:
        raise HTTPException(status_code=404, detail="Product not found !")

    return updated_product

# Patch product
@router.patch("/{product_id}")
def update_partial_product(product_id: int, patch_data: ProductUpdate):
    patched_product = patch_update(product_id, patch_data)

    if not patched_product:
        raise HTTPException(status_code=404, detail="Product not found !")

    return patched_product

# Delete product
@router.delete("/{product_id}")
def delete_product_route(product_id: int):
    deleted = delete_product(product_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Product not found")
    return {"message": f"Product {product_id} deleted successfully"}