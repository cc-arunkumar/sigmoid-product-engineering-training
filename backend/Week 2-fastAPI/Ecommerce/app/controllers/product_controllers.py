from fastapi import HTTPException
from sqlalchemy.orm import Session
from app.schemas.product_schema import ProductCreate, ProductUpdate
from app.services.product_service import (
    get_all_products,
    get_product_by_id,
    create_prduct,
    update_product,
    patch_update_product,
    delete_product
)

def fetch_products(db : Session):
    return get_all_products(db)

def fetch_product(product_id : int , db : Session):
    product = get_product_by_id(product_id, db)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product

def add_product(product_data:ProductCreate, db : Session):
    return create_prduct(product_data, db)
   
def edit_product(product_id : int, product_data:ProductCreate, db : Session):
    product = update_product(product_id, product_data, db)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
        
    return {"message": "Product updated successfully", "updated_product": product}

def patch_edit_product(product_id : int, product_data:ProductUpdate, db : Session):
    product = patch_update_product(product_id, product_data, db)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
        
    return {"message": "Product updated successfully", "updated_product": product}

def remove_product(product_id : int, db : Session):
    product = delete_product(product_id, db)

    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    return {"message": "Product deleted successfully", "deleted_product": product}
