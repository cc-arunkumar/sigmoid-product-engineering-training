from fastapi import APIRouter, HTTPException
from services.product_service import get_all_products, get_product_by_id, create_product, update_product, delete_product
from models.product_model import Product

router = APIRouter(
    prefix = "/api/products",
    tags = ["Products"]
)

@router.get("/")
def get_products():
    products = get_all_products()
    return products

@router.get("/{product_id}")
def get_product_id(product_id: int):
    product = get_product_by_id(product_id)

    if not product:
        raise HTTPException(status_code = 404, detail = "Product not found!")

    return product  

@router.post("/")
def add_product(product: Product):
    return create_product(product)

@router.put("/{product_id}")
def update_product_data(product: Product, product_id: int):
    return update_product(product, product_id)

@router.delete("/{product_id}")
def delete_product_id(product_id: int):
    return delete_product(product_id)

