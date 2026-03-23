from fastapi import APIRouter, HTTPException
from app.models.product_model import Product
from app.services.product_service import get_all_products, get_product_by_id, create_product

router = APIRouter(
    prefix="/api/product",
    tags= ["Products"]
)
# @router.get("/health")
# def health_check():
#     return{"status":"ProductAPI is running"}

@router.get("/")
def get_products():
    products = get_all_products()
    return products

@router.get("/{product_id}")
def get_product_id(product_id: int):
    product = get_product_by_id(product_id)
        
    if not product:
        raise HTTPException(status_code=404, detail="Product not found!")
    return product
            
@router.post("/")  
def add_product(product: Product):
    
    print("-------------> controller")
    return create_product(product)
              
              
@router.put("/{product_id}")
def update_product_api(product_id: int, product: Product):
    result = update_product(product_id, product)
    if not result:
        raise HTTPException(status_code=404, detail="Product not found")
    return result              

@router.patch("/{product_id}")
def patch_product_api(product_id: int, product: Product):
    result = patch_product(product_id, product)
    if not result:
        raise HTTPException(status_code=404, detail="Product not found")
    return result

@router.delete("/{product_id}")
def delete_product_api(product_id: int):
    result = delete_product(product_id)
    if not result:
        raise HTTPException(status_code=404, detail="Product not found")
    return {"message": "Product deleted successfully"}
