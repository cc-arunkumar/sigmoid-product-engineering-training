from fastapi import FastAPI, APIRouter, HTTPException
from app.services.product_service import get_all_products, get_product_by_id, create_product
from app.models.product_model import Product
router = APIRouter(
    prefix="/api/products",
    tags=["Products123"]
)
@router.get("/")
def get_products():
    products = get_all_products()
    return products

@router.get("/{product_id}")
def get_product(product_id: int):
    product = get_product_by_id(product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product

@router.post("/")
def add_product(product: Product):
    return create_product(product)


@router.get("/health")
def health_check():
    return {"status": "Product API is running"}
