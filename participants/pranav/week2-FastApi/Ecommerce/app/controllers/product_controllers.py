from fastapi import APIRouter,HTTPException,Request
from app.model.product_model import Product

from app.services.product_service import get_all_products , get_product_by_id,create_product,update_product_by_id,patch_update
import app.services.product_service as product_service

router = APIRouter(
    prefix="/api/products",
    tags=["Products"]
)

@router.get("/")
def get_products():
    products = get_all_products()
    return products

@router.get("/{product_id}")
def get_product_id(product_id:int,req:Request):
    print(req.url)
    product=get_product_by_id(product_id)

    if not product:
        raise HTTPException(status_code=404,detail="Product Not Found")
    return product



@router.post("/")
def add_product(product:Product):
    return create_product(product)



@router.put("/{product_id}")
def update_product(product_id:int,product:Product):
    update_product=update_product_by_id(product_id,product)

    if not update_product:
        raise HTTPException(status_code=404,detail="Product not fount!")
    return update_product


@router.patch('/{product_id}')
def update_partial_product(product_id:int, patch_data:Product):
    patched_product = patch_update(product_id, patch_data)

    if not patched_product:
        raise HTTPException(status_code=404, detail="Product not found !")

    return patched_product
