from fastapi import APIRouter
from app.models.product_model import ProductCreate, ProductUpdate
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
def get_products():
    return fetch_products()

@router.get("/{product_id}")
def get_single_product(product_id:int):
    return fetch_product(product_id)

@router.post("/")
def create_new_product(product_data : ProductCreate):
    return add_product(product_data)

@router.put("/{product_id}")
def update_existing_product(product_id:int, product_data:ProductUpdate):
    return edit_product(product_id, product_data)

@router.patch("/{product_id}")
def patch_update_existing_product(product_id:int, product_data:ProductCreate):
    return patch_edit_product(product_id, product_data)


@router.delete("/{product_id}")
def delete_existing_products(product_id : int):
    return remove_product(product_id)
