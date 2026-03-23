"""
    Product Controller: Handles API endpoints related to products.
"""

"""
    IMPORTS
"""
from fastapi import APIRouter, HTTPException
from app.services.product_service import get_all_products, get_product_by_id, create_product
from app.models.product_model import Product

product_router = APIRouter(
    prefix="/api/products",
    tags=["Products"]
)

@product_router.get("/")
def get_products():
    return get_all_products()

@product_router.get("/{product_id}")
def get_product(product_id: int):
    product = get_product_by_id(product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product

@product_router.post("/")
def add_product(product: Product):
    new_product = create_product(product)
    return {
        "status" : 201,
        "success" : True,
        "data" : new_product,
        "message" : "Product created successfully"
    }