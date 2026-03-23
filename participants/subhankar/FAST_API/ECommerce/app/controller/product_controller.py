from fastapi import APIRouter
import app.services.product_service as product_service

router=APIRouter(
    prefix="/api/product",
    tags=["Products"]
)

@router.get("/health")
def health_check():
    return{"Message":"Product API is healthy !"}


@router.get("/")
def get_all_products():
    products=product_service.get_all_products()
    return{"Products":products}