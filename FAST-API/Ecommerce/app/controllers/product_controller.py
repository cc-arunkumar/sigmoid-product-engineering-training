from fastapi import APIRouter, HTTPException
from app.models.product_model import Product,ProductPartial
from app.services.product_service import get_all_products, get_product_by_id, create_product,update_product, update_partially, delete_product

router = APIRouter(
    prefix="/api/products",
    tags=["Products"]
)

@router.get("/")
def get_products():
    products = get_all_products()
    return products


@router.get("/{product_id}")
def get_product_id(product_id : int):
    product = get_product_by_id(product_id)

    if not product:
        raise HTTPException(status_code=404, detail="Product not found!")
    
    return product


@router.post("/")
def add_product(product : Product):
    return create_product(product)


@router.put("/{product_id}")
def put_product(product_id : int,product_data:Product):
    updated_product = update_product(product_id,product_data )

    if not updated_product :
        raise HTTPException(status_code=404, detail="Product not found !")
    
    return updated_product


@router.patch("/{product_id}")
def update_product(product_id:int, patch_data: ProductPartial):
    patched_product = update_partially(product_id, patch_data)

    if not patched_product:
        raise HTTPException (status_code=404, detail="Product not found!")
    
    return patched_product



@router.delete("/{product_id}")
def delete(product_id:int):
    products=delete_product(product_id)
    if not products:
        raise HTTPException(status_code=404,detail="Product Not Found")
    return products

