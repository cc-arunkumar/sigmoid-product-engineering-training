from fastapi import FastAPI, APIRouter
from fastapi import HTTPException
from app.services.product_service import get_all_products, get_product_by_id, create_product, update_product, delete_product, patch_update
from app.models.products_model import Product

router = APIRouter(
    prefix="/api/products",
    tags=["Products"]
)

@router.get("/")
def get_products():
    products = get_all_products()
    return products

@router.get("/{product_id}")
def get_product_id(product_id: int):
    product = get_product_by_id(product_id= product_id)

    if not product:
        raise HTTPException(status_code = 404, detail="Product not found!!")
    return product

@router.get("/health")
def system_health():
    return {"message": "System is working fine"}

@router.post("/")
def add_product(product_details : Product):
    product = create_product(product_details=product_details)
    return product

@router.put("/{product_id}")
def modify_product(product_details : Product, product_id : int):
    product = update_product(product_details=product_details, product_id=product_id)
    return product

@router.delete("/{product_id}")
def remove_product(product_id : int):
    product = delete_product(product_id=product_id)
    return product

@router.patch("/{product_id}")
def update_partial_product(product_id: int, patch_details: Product):
    result = patch_update(product_id=product_id, patch_update=patch_details)

    if result is None:
        raise HTTPException(status_code=404, detail="Product not found!!")
    return result