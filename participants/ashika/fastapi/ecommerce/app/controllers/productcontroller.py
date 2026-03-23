from fastapi import APIRouter , HTTPException
from app.services.products_service import getallProduct , get_product_by_id

router=APIRouter(
    prefix="/api/products",
    tags=["Products"]
)


@router.get("/")
def get_products():
    products=getallProduct()
    return products

@router.get("/{product_id}")
def get_product_id(product_id:int):
    product=get_product_by_id(product_id)

    if not product:
        raise HTTPException(status_code=404 , detail="product not found")
    
    return product

