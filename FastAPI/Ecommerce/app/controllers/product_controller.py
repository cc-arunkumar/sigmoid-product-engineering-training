"""
    Product Controller: Handles API endpoints related to products.
"""
"""
    IMPORTS
"""
from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session

from app.services.product_service import (
    get_all_products, 
    get_product_by_id, 
    create_product, 
    put_product,
    patch_product, 
    delete_product
)
from app.models.product_model import (Product,
                                       ProductPatch)
from app.core.config import get_db

product_router = APIRouter(
    prefix="/api/products",
    tags=["Products"]
)

@product_router.get("/")
def get_products(db: Session = Depends(get_db)):
    return get_all_products(db)

@product_router.get("/{product_id}")
def get_product(product_id: int, db : Session = Depends(get_db)):
    product = get_product_by_id(db, product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product

@product_router.post("/")
def add_product(product: Product, db : Session = Depends(get_db)):
    new_product = create_product(db, product)
    return {
        "status" : 201,
        "success" : True,
        "data" : new_product,
        "message" : "Product created successfully"
    }

@product_router.put("/{product_id}")
def update_product(product_id: int, product: Product, db : Session = Depends(get_db)):
    updated_product = put_product(db, product_id, product)
    if not updated_product:
        raise HTTPException(status_code=404, detail="Product not found")
    return {
        "status" : 200,
        "success" : True,
        "data" : updated_product,
        "message" : "Product updated successfully"
    }

@product_router.patch("/{product_id}")
def partial_update_product(product_id: int, product: ProductPatch, db : Session = Depends(get_db)):
    updated_product = patch_product(db, product_id, product)
    if not updated_product:
        raise HTTPException(status_code=404, detail="Product not found")
    return {
        "status" : 200,
        "success" : True,
        "data" : updated_product,
        "message" : "Patch Product done successfully"
    }

@product_router.delete("/{product_id}")
def remove_product(product_id: int, db : Session = Depends(get_db)):
    if not delete_product(db, product_id):
        raise HTTPException(status_code=404, detail="Product not found")
    return {
        "status" : 200,
        "success" : True,
        "message" : "Product deleted successfully"
    }