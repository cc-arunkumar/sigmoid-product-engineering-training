from fastapi import APIRouter, HTTPException
from app.services.product_services import get_all_products , get_product_by_id , create_product , update_product_by_id , update_product_partial_by_id
from app.models.product_model import Product

router = APIRouter(
    prefix="/api/products",
    tags=["Products"]
)

@router.get("/")
def get_products():
    products = get_all_products()
    return products

@router.get("/{product_id}")
def get_product_id(product_id : int):
    product = get_product_by_id(product_id)

    if not product:
        raise HTTPException(status_code=404,detail="Product not found")
    
    return product

@router.post("/")
def add_product(product: Product):
    return create_product(product)

@router.put("/{product_id}")
def update_product(product_id : int,product: Product):
    product = update_product_by_id(product_id,product)
    if not product:
        raise HTTPException(status_code=404,detail="Product not found")
    return product

@router.patch("/{product_id}")
def update_product_partial(product_id: int,data : Product):
    product = update_product_partial_by_id(product_id,data)
    if not product:
        raise HTTPException(status_code=404,detail="Product not found")
    return product