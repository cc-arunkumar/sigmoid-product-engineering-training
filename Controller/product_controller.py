from fastapi import APIRouter

# from ..Services.product_services import get_all_products

from Services.product_services import get_all_products , get_product_by_id


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

@router.get("/{product_id}")
def get_product_id(product_id: int):
    product = get_product_by_id(product_id)

    if not product:
        return {"statuscode": 404, "details": "Product not found"}

    return product