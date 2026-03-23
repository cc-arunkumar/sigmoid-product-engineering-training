from fastapi import APIRouter, HTTPException
from app.models.product_model import Product
from app.services.product_service import get_all_products, get_product_id, create_product

router = APIRouter(
    prefix="/api/products",
    tags=["products"]
)

# home route
@router.get("/")
def get_products():
    return get_all_products()

# health check route
@router.get("/health")
def health_check():
    return {"status": "Product API is running"}

#get product by id
@router.get("/{product_id}")
def get_product_ID(product_id: int):
    product = get_product_id(product_id)
    if not product:
        raise HTTPException(status_code=404,detail="Product not found!")
    return product

# post product
@router.post("/")
def add_product(product: Product):
    return create_product(product)
    