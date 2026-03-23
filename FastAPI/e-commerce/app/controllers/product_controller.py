from fastapi import APIRouter, HTTPException
from app.services.product_service import get_all_products, get_product_by_id, create_product as add_product, put_product, patch_product, delete_product as remove_product
from app.models.product_model import Product, ProductPatch


router = APIRouter(
    prefix="/api/product",
    tags=["Products"]
)

# @router.get("/health")
# def health_check():
#     return {"status": "Product APIs running smoothly!"}

@router.get("/")
def get_products():
    products = get_all_products()
    return products

@router.get("/{product_id}")
def get_product_id(product_id: int):
    product = get_product_by_id(product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found.")
    return product

@router.post("/")
def create_product(product: Product):
    new_product = add_product(product)
    return new_product

@router.put("/{product_id}")
def update_product(product_id: int, product: Product):
    updated_product = put_product(product_id, product)
    if not updated_product:
        raise HTTPException(status_code=404, detail="Product not found")
    return {
        "status" : 200,
        "success" : True,
        "data" : updated_product,
        "message" : "Product updated successfully"
    }

@router.patch("/{product_id}")
def partial_update_product(product_id: int, product: ProductPatch):
    updated_product = patch_product(product_id, product)
    if not updated_product:
        raise HTTPException(status_code=404, detail="Product not found")
    return {
        "status" : 200,
        "success" : True,
        "data" : updated_product,
        "message" : "Patch Product done successfully"
    }

@router.delete("/{product_id}")
def delete_product(product_id: int):
    deleted = remove_product(product_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Product not found")
    return {
        "status" : 200,
        "success" : True,
        "message" : "Product deleted successfully"
    }
