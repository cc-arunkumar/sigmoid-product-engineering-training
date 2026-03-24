# from fastapi import APIRouter
# from models.product_model import Product,ProductPatch
# from services.product_service import get_all_products,get_product_by_id,create_product,update_product,patch_product,delete_product
# router = APIRouter(
#     prefix="/api/product",
#     tags=["Products"]  
# )
# @router.get("/")
# def get_products():
#     return get_all_products()
# @router.get("/{product_id}")
# def get_product(product_id: int):
#     product = get_product_by_id(product_id)
    
#     if not product:
#         raise HTTPException(status_code=404, detail="Product not found")
    
#     return product
# @router.post("/")
# def add_product(product :Product):
#     return create_product(product)
# @router.put("/{product_id}")
# def update_product_endpoint(product_id: int, product: Product):
#     updated = update_product(product_id, product)
#     if not updated:
#         raise HTTPException(status_code=404, detail="Product not found")
#     return updated
# @router.patch("/{product_id}")
# def patch_product_endpoint(product_id: int, update_data: ProductPatch):
#     updated = patch_product(product_id, update_data)
#     if not updated:
#         raise HTTPException(status_code=404, detail="Product not found")
#     return updated
# @router.delete("/{product_id}")
# def delete_product_endpoint(product_id: int):
#     deleted = delete_product(product_id)
#     if not deleted:
#         raise HTTPException(status_code=404, detail="Product not found")
#     return {"message": f"Product with id {product_id} deleted successfully"}

# @router.get("/health")
# def health_check():
#     return {"status": "Product APIs running!"}
# app/controllers/product_controller.py
from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from typing import List

from models.product_model import Product, ProductPatch
from services.product_service import (
    get_all_products,
    get_product_by_id,
    create_product,
    update_product,
    patch_product,
    delete_product
)
from db.database import SessionLocal

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

router = APIRouter(
    prefix="/api/products",
    tags=["Products"]
)

# Get all products
@router.get("/")
def read_products(db: Session = Depends(get_db)):
    return get_all_products(db)

# Get single product
@router.get("/{product_id}", response_model=Product)
def read_product(product_id: int, db: Session = Depends(get_db)):
    product = get_product_by_id(db, product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product

# Create product
@router.post("/", response_model=Product)
def add_product(product: Product, db: Session = Depends(get_db)):
    return create_product(db, product)

# Replace product (PUT)
@router.put("/{product_id}", response_model=Product)
def replace_product(product_id: int, product: Product, db: Session = Depends(get_db)):
    updated_product = update_product(db, product_id, product)
    if not updated_product:
        raise HTTPException(status_code=404, detail="Product not found")
    return updated_product

# Partial update product (PATCH)
@router.patch("/{product_id}", response_model=Product)
def update_partial_product(product_id: int, product: ProductPatch, db: Session = Depends(get_db)):
    updated_product = patch_product(db, product_id, product)
    if not updated_product:
        raise HTTPException(status_code=404, detail="Product not found")
    return updated_product

# Delete product
@router.delete("/{product_id}")
def remove_product(product_id: int, db: Session = Depends(get_db)):
    deleted_product = delete_product(db, product_id)
    if not deleted_product:
        raise HTTPException(status_code=404, detail="Product not found")
    return {"message": "Product deleted successfully", "deleted_product": deleted_product}