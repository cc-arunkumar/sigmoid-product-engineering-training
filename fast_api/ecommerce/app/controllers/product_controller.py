from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session

from app.services.product_service import (
    get_all_products,
    get_product_by_id,
    create_product,
    put_products,
    patch_product,
    delete_product
)

from app.models.product_model import Product, ProductPatch
from app.core.config import get_db


router = APIRouter(
    prefix="/api/products",
    tags=["Products"]
)


# GET ALL PRODUCTS
@router.get("/")
def get_products(db: Session = Depends(get_db)):
    return get_all_products(db)


# GET PRODUCT BY ID
@router.get("/{product_id}")
def get_product(product_id: int, db: Session = Depends(get_db)):
    product = get_product_by_id(product_id, db)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product


# CREATE PRODUCT
@router.post("/")
def create(product_data: Product, db: Session = Depends(get_db)):
    return create_product(product_data, db)


# PUT PRODUCT
@router.put("/{product_id}")
def put(product_id: int, product_data: Product, db: Session = Depends(get_db)):
    product = put_products(product_id, product_data, db)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product


# PATCH PRODUCT
@router.patch("/{product_id}")
def patch(product_id: int, product_data: ProductPatch, db: Session = Depends(get_db)):
    prod = patch_product(product_id, product_data, db)
    if not prod:
        raise HTTPException(status_code=404, detail="Product not found")
    return prod


# DELETE PRODUCT
@router.delete("/{product_id}")
def delete(product_id: int, db: Session = Depends(get_db)):
    product = delete_product(product_id, db)
    if not product:
        raise HTTPException(status_code=404, detail="Product Not Found")
    return product