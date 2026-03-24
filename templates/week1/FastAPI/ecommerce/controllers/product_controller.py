from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from typing import List

from services.product_service import (
    get_all_products,
    get_product_by_id,
    create_product,
    update_product,
    patch_product,
    delete_product
)
from models.product_model import Product, ProductPatch
from core.config import get_db

router = APIRouter(
    prefix="/api/products",
    tags=["Products"]
)

@router.get("/", response_model=List[Product])
def get_products(db: Session = Depends(get_db)):
    return get_all_products(db)

@router.get("/{product_id}", response_model=Product)
def get_product(product_id: int, db: Session = Depends(get_db)):
    product = get_product_by_id(db, product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product

@router.post("/", response_model=Product)
def add_product(product: Product, db: Session = Depends(get_db)):
    return create_product(db, product)

@router.put("/{product_id}", response_model=Product)
def replace_product(product_id: int, product: Product, db: Session = Depends(get_db)):
    updated_product = update_product(db, product_id, product)
    if not updated_product:
        raise HTTPException(status_code=404, detail="Product not found")
    return updated_product

@router.patch("/{product_id}", response_model=Product)
def update_partial_product(
    product_id: int, 
    product: ProductPatch, 
    db: Session = Depends(get_db)
):
    updated_product = patch_product(db, product_id, product)
    if not updated_product:
        raise HTTPException(status_code=404, detail="Product not found")
    return updated_product

@router.delete("/{product_id}")
def remove_product(product_id: int, db: Session = Depends(get_db)):
    deleted_product = delete_product(db, product_id)
    if not deleted_product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    return {
        "message": "Product deleted successfully",
        "deleted_product": deleted_product
    }

# from fastapi import APIRouter, HTTPException, Depends
# from sqlalchemy.orm import Session
# from services.product_service import (
#     get_all_products,
#     get_product_by_id,
#     create_product,
#     update_product,
#     delete_product,
#     patch_product
# )

# from models.product_model import Product, ProductUpdate
# from core.config import get_db

# router = APIRouter(
#     prefix = "/api/products",
#     tags = ["Products"]
# )


# @router.get("/")
# def get_products():
#     products = get_all_products()
#     return products


# @router.get("/{product_id}")
# def get_product_id(product_id: int):
#     product = get_product_by_id(product_id)

#     if not product:
#         raise HTTPException(status_code = 404, detail = "Product not found!")

#     return product  


# @router.post("/")
# def add_product(product: Product):
#     return create_product(product)


# @router.delete("/{product_id}")
# def delete_product_id(product_id: int):
#     return delete_product(product_id)


# @router.put("/{product_id}")
# def update_product_data(product_id: int, product: ProductUpdate):
#     updated_data = product.dict()
#     result = update_product(product_id, updated_data)
    
#     if result == "Product not found":
#         raise HTTPException(status_code=404, detail=result)
#     return result


# @router.patch("/{product_id}")
# def patch_product_id(product_id: int, patch_data: ProductUpdate):
#     patched_product = patch_product(product_id, patch_data)

#     if not patched_product:
#         raise HTTPException(status_code = 404, detail = "Product not found!")
#     return patched_product