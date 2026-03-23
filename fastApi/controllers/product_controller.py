from fastapi import FastAPI, APIRouter, HTTPException
from services.product_services import get_all_products, get_product_by_id, create_product, update_product, patch_product, delete_product
from models.product_model import Product

router = APIRouter(
    prefix = "/api/product",
    tags= ["Products"]
)

@router.get("/health")
def health_check():
    return {"status" : "Product APIs running !"}

@router.get("/")
def get_products():
    products = get_all_products()
    return products

@router.get("/{product_id}")
def get_product(product_id : int):
    product = get_product_by_id(product_id)
    
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    return product

@router.post("/")
def add_product(product: Product):
    return create_product(product)

@router.put("/{product_id}")
def update_prod(product_id : int, product: Product):
    return update_product(product_id, product)

@router.patch("/{product_id}")
def patch_product_endpoint(product_id: int, update_data: dict):
    updated = patch_product(product_id, update_data)
    if not updated:
        raise HTTPException(status_code=404, detail="Product not found")
    return updated

@router.delete("/{product_id}")
def delete_product_endpoint(product_id: int):
    deleted = delete_product(product_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Product not found")
    return {"message": f"Product with id {product_id} deleted successfully"}