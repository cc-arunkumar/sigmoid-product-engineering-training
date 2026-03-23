from fastapi import  APIRouter, HTTPException

from app.services.product_service import get_all_products, get_product_by_id, create_product as create_product_service, update_product as update_product_service

from app.models.product_model import Product, ProductUpdate

router = APIRouter(
    prefix = "/api/products",
    tags = ["Products"]
)

@router.get("/")
def get_products():
    products = get_all_products()
    return products


@router.get("/health")
def health_check():
    return {"status": "healthy"}

@router.get("/{product_id}")
def get_product(product_id: int):
    product = get_product_by_id(product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product



@router.post("/")
def create_product(product:Product):
    return create_product_service(product)

@router.patch("/{product_id}")
def update_product(product_id: int, product: ProductUpdate):
    updated = update_product_service(product_id, product)
    if not updated:
        raise HTTPException(status_code=404, detail="Product not found")
    return updated