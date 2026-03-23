from fastapi import APIRouter, HTTPException
from app.services.product_service import get_all_products,get_product_by_id


router = APIRouter(
    prefix="/api/products",
    tags=["products"]
)

@router.get("/")
def get_products():
    return get_all_products()



#GET products by ID
@router.get("/{product_id}")
def get_product(product_id: int):
    product = get_product_by_id(product_id)

    if not product:
        raise HTTPException(status_code= 404, detail= "Product not Found")

    return product
