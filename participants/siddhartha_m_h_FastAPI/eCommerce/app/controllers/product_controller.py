from fastapi import APIRouter, HTTPException, Depends
from app.models.product_model import Product, ProductPatch
from sqlalchemy.orm import Session
from app.core.config import get_db

from app.services.product_service import (
    get_all_products, 
    get_product_by_id, 
    create_product, 
    update_product, 
    delete_product, 
    patch_product
)

router = APIRouter(
    prefix = "/api/products",
    tags = ["Products"]
)

@router.get("/")
def read_products(db: Session = Depends(get_db)):
    products = get_all_products(db)
    return {"products": products}



@router.get("/{product_id}")
def read_product(product_id: int, db: Session = Depends(get_db)):
    product = get_product_by_id(db, product_id)
    if product:
        return {"product": product}
    raise HTTPException(status_code=404, detail="Product not found")


@router.post("/")
def add_product(product: Product, db: Session = Depends(get_db)):
    new_product = create_product(db, product)
    return {"product": new_product}

@router.put("/{product_id}")
def put_product(product_id: int, product: Product, db: Session = Depends(get_db)):
    updated_product = update_product(db, product_id, product)
    if updated_product:
        return {"product": updated_product}
    raise HTTPException(status_code=404, detail="Product not found")

@router.delete("/{product_id}")
def remove_product(product_id: int, db: Session = Depends(get_db)):
    success = delete_product(db, product_id)
    if success:
        return {"message": "Product deleted successfully"}
    raise HTTPException(status_code=404, detail="Product not found")

@router.patch("/{product_id}")
def partial_update_product(product_id: int, patch_data: ProductPatch, db: Session = Depends(get_db)):
    updated_product = patch_product(db, product_id, patch_data)
    if updated_product:
        return {"product": updated_product}
    raise HTTPException(status_code=404, detail="Product not found")