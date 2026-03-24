from fastapi import APIRouter, Depends
from app.schemas.product_schema import ProductCreate, ProductUpdate
from app.database import get_db
from sqlalchemy.orm import Session
from app.controllers.product_controllers import (
    fetch_products,
    fetch_product,
    add_product,
    edit_product,
    patch_edit_product,
    remove_product
)

router = APIRouter()

@router.get("/")
def get_products(db : Session = Depends(get_db)):
    return fetch_products(db)

@router.get("/{product_id}")
def get_single_product(product_id:int, db : Session = Depends(get_db)):
    return fetch_product(product_id, db)

@router.post("/")
def create_new_product(product_data : ProductCreate, db : Session = Depends(get_db)):
    return add_product(product_data, db)

@router.put("/{product_id}")
def update_existing_product(product_id:int, product_data:ProductUpdate, db : Session = Depends(get_db)):
    return edit_product(product_id, product_data, db)

@router.patch("/{product_id}")
def patch_update_existing_product(product_id:int, product_data:ProductCreate, db : Session = Depends(get_db)):
    return patch_edit_product(product_id, product_data, db)


@router.delete("/{product_id}")
def delete_existing_products(product_id : int, db : Session = Depends(get_db)):
    return remove_product(product_id, db)
