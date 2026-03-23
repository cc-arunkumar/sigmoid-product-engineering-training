from fastapi import HTTPException
from app.models.product_model import ProductCreate, ProductUpdate
from app.services.product_service import (
    get_all_products,
    get_product_by_id,
    create_prduct,
    update_product,
    patch_update_product,
    delete_product
)

def fetch_products():
    return get_all_products()

def fetch_product(product_id : int):
    product = get_product_by_id(product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product

def add_product(product_data:ProductCreate):
    return create_prduct(product_data)
   
def edit_product(product_id : int, product_data:ProductCreate):
    product = update_product(product_id, product_data)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
        
    return {"message": "Product updated successfully", "updated_product": product}

def patch_edit_product(product_id : int, product_data:ProductCreate):
    product = patch_update_product(product_id, product_data)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
        
    return {"message": "Product updated successfully", "updated_product": product}

def remove_product(product_id : int):
    product = delete_product(product_id)

    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    return {"message": "Product deleted successfully", "deleted_product": product}
