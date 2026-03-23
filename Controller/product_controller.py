from fastapi import APIRouter

# from ..Services.product_services import get_all_products

from Services.product_services import get_all_products


router = APIRouter(
    prefix  = '/api/products', 
    tags = {"Products"}
)

@router.get("/health")
def health_cheak():
    return {"Status" : "Product API running"} 


@router.get("/")
def get_product():
    product = get_all_products()
    return product