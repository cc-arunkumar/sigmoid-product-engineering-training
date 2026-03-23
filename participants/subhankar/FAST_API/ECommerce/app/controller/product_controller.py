from fastapi import APIRouter, HTTPException
from app.services.product_model import Product
from app.services.product_service import delete_product, get_all_products, get_product_by_id, create_product, update_product, delete_product


router=APIRouter(
    prefix="/api/product",
    tags=["Products"]
)

@router.get("/health")
def health_check():
    return{"Message":"Product API is healthy !"}


@router.get("/")
def get_products():
    products=get_all_products()
    return{"Products":products}

@router.get("/{product_id}")
def get_product_id(product_id:int):
    product=get_product_by_id(product_id)

    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product

@router.post("/")
def add_product(product:Product):
    return create_product(product)

@router.put("/{product_id}")
def update_product_(product_id:int, updated_product:Product):
    return update_product(product_id, updated_product)

@router.delete("/{product_id}")
def remove_product_(product_id:int):
    if delete_product(product_id):
        return{"Message":"Product deleted successfully"}
    else:
        raise HTTPException(status_code=404, detail="Product not found")