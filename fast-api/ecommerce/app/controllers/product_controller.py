from fastapi import APIRouter, HTTPException

from app.services.product_service import delete_product, get_all_products
from app.services.product_service import get_product_by_id
 
from app.services.product_service import create_product
from app.services.product_service import update_product
from app.services.product_service import partial_update_product
from app.models.product_model import Product , ProductUpdate  
router = APIRouter(
    prefix="/api/products",
    tags=["products"]
)

@router.get("/")
def get_products():
    products= get_all_products()
    return products

# @router.get("/health")
# def health_check():
#     return {"status": "Product API is running!"}

@router.get("/{product_id}")
def get_product(product_id: int):
    product = get_product_by_id(product_id)
    if not product:
        return HTTPException(status_code=404, detail="Product not found")
    return product
@router.post("/")

def add_product(product: Product):
    new_product = create_product(product)
    return new_product

@router.put("/{product_id}")
def update_product_endpoint(product_id: int, product: Product):
    updated_product = update_product(product_id, product)
    if not updated_product:
        return HTTPException(status_code=404, detail="Product not found")
    return updated_product  

@router.delete("/{product_id}")
def delete_product_endpoint(product_id: int):   
    success = delete_product(product_id)
    if not success:
        return HTTPException(status_code=404, detail="Product not found")
    return {"message": "Product deleted successfully"}

@router.patch("/{product_id}")
def partial_update_product_endpoint(product_id: int, product: ProductUpdate):
    updated_product = partial_update_product(product_id, product)
    if not updated_product:
        return HTTPException(status_code=404, detail="Product not found")
    return updated_product