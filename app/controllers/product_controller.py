from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from app.models.product_model import Product, ProductPatch
from app.services.product_service import (
    get_all_products,
     get_product_id,
      create_product, 
      update_product,
       patch_update,
        delete_prod
)
from app.core.config import get_db
router = APIRouter(
    prefix="/api/products",
    tags=["products"]
)

# home route
@router.get("/")
def get_products(db: Session = Depends(get_db)):
    return get_all_products(db)


#get product by id
@router.get("/{product_id}")
def get_product_ID(product_id: int, db: Session = Depends(get_db)):
    product = get_product_id(db, product_id)
    if not product:
        raise HTTPException(status_code=404,detail="Product not found!")
    return product

# post product
@router.post("/")
def add_product(product: Product, db: Session = Depends(get_db)):
    return create_product(db,
    product)

# put product
@router.put("/{product_id}")
def put_product(product_id: int, product_data: Product, db: Session = Depends(get_db)):
    product = update_product(db, product_id,product_data)
    if not product:
        raise HTTPException(status_code=404,details="Product not found")
    return product
    

# patch product
@router.patch("/{product_id}")
def update_partial_product(product_id: int, patch_data: Product, db: Session = Depends(get_db)):
    patched_product = patch_update(db, product_id,patch_data)

    if not patched_product:
        raise HTTPException(status_code=404,detail="Product not found!")

    return patched_product


# delete product
@router.delete("/{product_id}")
def delete_product(product_id: int, db: Session = Depends(get_db)):
    product = delete_prod(db, product_id)

    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    return product