from fastapi import APIRouter, HTTPException

from app.services.product_service import get_all_products, get_product_id

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