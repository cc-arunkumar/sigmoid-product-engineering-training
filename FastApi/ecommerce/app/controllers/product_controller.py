from fastapi import FastAPI, APIRouter
from fastapi import HTTPException, Depends
from app.services.product_service import get_all_products, get_product_by_id, create_product, update_product, delete_product, patch_update
from app.models.products_model import Product, ProductPatch
from app.core.config import get_db
from sqlalchemy.orm import Session

router = APIRouter(
    prefix="/api/products",
    tags=["Products"]
)

@router.get("/")
def get_products(db: Session = Depends(get_db)):
    products = get_all_products(db)
    return products

@router.get("/{product_id}")
def get_product_id(product_id: int, db: Session = Depends(get_db)):
    product = get_product_by_id(db, product_id= product_id)

    if not product:
        raise HTTPException(status_code = 404, detail="Product not found!!")
    return product

@router.get("/health")
def system_health():
    return {"message": "System is working fine"}

@router.post("/")
def add_product(product_details : Product, db: Session = Depends(get_db)):
    product = create_product(db, product_details=product_details)
    return product

@router.put("/{product_id}")
def modify_product(product_details : Product, product_id : int, db: Session = Depends(get_db)):
    product = update_product(db, product_details=product_details, product_id=product_id)
    return product

@router.delete("/{product_id}")
def remove_product(product_id : int, db: Session = Depends(get_db)):
    product = delete_product(db, product_id=product_id)
    return product

@router.patch("/{product_id}")
def update_partial_product(product_id: int, patch_details: ProductPatch, db: Session = Depends(get_db)):
    result = patch_update(db, product_id=product_id, patch_update=patch_details)

    if result is None:
        raise HTTPException(status_code=404, detail="Product not found!!")
    return result