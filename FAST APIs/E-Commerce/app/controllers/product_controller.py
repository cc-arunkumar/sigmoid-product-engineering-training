from fastapi import FastAPI, APIRouter, HTTPException

from app.models.product_model import Product
from app.services.product_service import get_all_products, get_product_by_id, create_product

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

@router.post("/")
def add_product(product: Product):
    return create_product(product)