from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import Session
from app.services.product_service import (
    get_all_products,
    get_product_by_id,
    create_product,
    update_product,patch_update
)
from app.models.product_model import Product, ProductUpdate
from app.core.config import get_db


router = APIRouter(
    prefix="/api/products",
    tags=["products"]
)

@router.get("/")
def get_products(db: Session = Depends(get_db)):
    return {"products": get_all_products(db)}

@router.get("/{product_id}")
def get_product(product_id: int, db: Session = Depends(get_db)):
    product = get_product_by_id(db, product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return {"product": product}

@router.post("/")
def c_product(product: Product, db: Session = Depends(get_db)):
    return create_product(db, product)   

@router.put("/{product_id}")
def u_product(product_id: int, product: Product, db: Session = Depends(get_db)):
    updated_p = update_product(db, product_id, product)   

    if not updated_p:
        raise HTTPException(status_code=404, detail="Product not found")

    return updated_p   

# PATCH Product
@router.patch("/{product_id}")
def update_partial_product(product_id: int, patch_data: ProductUpdate, db: Session = Depends(get_db)):
    patched_product = patch_update(db, product_id, patch_data)

    if not patched_product:
        raise HTTPException(status_code=404, detail="Product not found!")

    return patched_product