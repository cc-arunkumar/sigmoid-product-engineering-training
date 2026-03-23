from fastapi import APIRouter, HTTPException
from app.services.product_service import get_all_products, get_product_by_id, create_product as create_product_service
from app.models.product_model import Product

router = APIRouter(
    prefix="/api/products",
    tags=["products"]
)


@router.get("/")
def get_products():
    return get_all_products()

@router.get("/health")
def health_check():
    return {"status": "Product API is running"}

@router.get("/{product_id}")
def get_product_ID(product_id: int):
    product = get_product_by_id(product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product

@router.post("/")
def add_product(product: Product):
    return create_product_service(product)



