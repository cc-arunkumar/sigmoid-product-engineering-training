from fastapi import APIRouter,HTTPException
from app.services.product_service import get_all_products
from app.services.product_service import get_all_products, get_product_by_id
from app.services.product_service import create_product
from app.services.product_service import update_product
from app.services.product_service import delete_product

from app.models.product_model import Product
router=APIRouter(
    prefix="/api/product",
    tags=["Products"]
)

@router.get("/")
def get_products():
    products=get_all_products()
    return products
@router.get("/{product_id}")
def get_product_id(product_id:int):
    product=get_product_by_id(product_id)

    if not product:
        raise HTTPException(status_code=404,detail="Product not found!")
    return product

@router.post("/")
def add_product(product: Product):
    return create_product(product)

@router.put("/{product_id}")
def update_product_id(product_id: int, updated_product: Product):
    updated_product_data = update_product(product_id, updated_product)
    if not updated_product_data:
        raise HTTPException(status_code=404, detail="Product not found")
    return {"product": updated_product_data}

@router.delete("/{product_id}")
def delete_product_id(product_id: int):
    deleted_product = delete_product(product_id)
    if not deleted_product:
        raise HTTPException(status_code=404, detail="Product not found")
    return {"message": "Product deleted successfully"}