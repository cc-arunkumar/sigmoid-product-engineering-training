from fastapi import APIRouter, HTTPException, Depends
from services.product_service import get_all_products, get_product_by_id, create_product, update_product, patch_update, delete_product
from models.product_model import Product
from core.config import get_db
from sqlalchemy.orm import Session


router = APIRouter(
    prefix="/api/products",
    tags=["Product"]
)


@router.get("/")
def get_products(db: Session = Depends(get_db)):
    return get_all_products(db)


@router.get("/{product_id}")
def get_product_id(product_id: int, db: Session = Depends(get_db)):
    product = get_product_by_id(db, product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found!")
    return product

@router.post("/")
def add_product(product : Product,  db: Session = Depends(get_db)) :
    return create_product(db, product)

@router.put("/{product_id}")
def put_product(product_id: int, product : Product,  db: Session = Depends(get_db)):
    updated_product = update_product(db, product_id, product)
    if not updated_product:
        raise HTTPException(status_code=404, detail="Product not found!")
    return updated_product
    
@router.patch("/{product_id}")
def update_partial_product(product_id: int, patch_data : Product,  db: Session = Depends(get_db)):
    patched_product = patch_update(db, product_id, patch_data)
    if not patched_product:
        raise HTTPException(status_code=404, detail="Product not found!")
    return patched_product

@router.delete("/{product_id}")
def delete_product_by_id(product_id: int,  db: Session = Depends(get_db)):
    deleted_product = delete_product(db, product_id)
    if not deleted_product:
        raise HTTPException(status_code=404, detail="Product not found!")
    return {"message": f"Product {product_id} deleted successfully", "product": deleted_product}
