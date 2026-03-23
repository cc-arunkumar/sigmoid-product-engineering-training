from fastapi import APIRouter, HTTPException

from app.services.product_service import get_all_products
from app.services.product_service import get_product_by_id
 
from app.services.product_service import create_product
from app.models.product_model import Product   
router = APIRouter(
    prefix="/api/products",
    tags=["products"]
)

@router.get("/")
def get_products():
    products= get_all_products()
    return products

@router.get("/health")

def health_check():
    return {"status": "Product API is running!"}

@router.get("/{product_id}")
def get_product(product_id: int):
    product = get_product_by_id(product_id)
    if not product:
        return HTTPException(status_code=404, detail="Product not found")
    return product
@router.post("/")
def add_product(product: Product):
    new_product = create_product(product)
    return new_product