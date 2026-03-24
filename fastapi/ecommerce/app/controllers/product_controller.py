from fastapi import FastAPI, APIRouter, HTTPException, Depends 
from sqlalchemy.orm import Session
from app.services.product_service import get_all_products, get_product_by_id, create_product, update_product, delete_product, partial_update_product
from app.models.product_model import Product, ProductPartialUpdate
from app.core.config import get_db

router = APIRouter(
    prefix="/api/products",
    tags=["Products"]
)
@router.get("/")
def get_products(db:Session = Depends(get_db)):
    return get_all_products(db)

@router.get("/{product_id}")
def get_product(product_id: int, db: Session = Depends(get_db)):
    product = get_product_by_id(db, product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product

@router.post("/")
def add_product(product: Product, db: Session = Depends(get_db)):
    return create_product(db, product)

@router.put("/{product_id}")
def update_product_info(product_id: int, product: Product, db: Session = Depends(get_db)):
    updated_product = update_product(db, product_id, product)
    if not updated_product:
        raise HTTPException(status_code=404, detail="Product not found")
    return updated_product

@router.delete("/{product_id}")
def delete_product_info(product_id: int, db: Session = Depends(get_db)):
    deleted_product = delete_product(db, product_id)
    if not deleted_product:
        raise HTTPException(status_code=404, detail="Product not found")
    return {"message": "Product deleted successfully"}

@router.patch("/{product_id}")  
def partial_update_product_info(product_id: int, product: ProductPartialUpdate, db: Session = Depends(get_db)):
    updated_product = partial_update_product(db,product_id, product)
    if not updated_product:
        raise HTTPException(status_code=404, detail="Product not found")
    return updated_product 

@router.get("/health")
def health_check():
    return {"status": "Product API is running"}
