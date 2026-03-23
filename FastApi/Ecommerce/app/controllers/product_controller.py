from fastapi import FastAPI,APIRouter,HTTPException
from app.services.product_service import get_all_products
from app.services.product_service import get_product_by_id
from app.services.product_service import create_product
from app.services.product_service import update_product
from app.services.product_service import delete_product
from app.services.product_service import update_partial_product
from app.models.products_model import Product
router = APIRouter(
    prefix="/api/products",
    tags=["products"],
)
@router.get("/")
def get_products():
    products = get_all_products()
    return {"products": products}
@router.get("/{product_id}")
def get_product_id(product_id: int):
    product = get_product_by_id(product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return {"product": product}
@router.post("/")
def add_product(product: Product):
    new_product = create_product(product)
    return {"product": new_product}
@router.put("/{product_id}")
def update_product_id(product_id: int, updated_product: Product):
    updated_product_data = update_product(product_id, updated_product)
    if not updated_product_data:
        raise HTTPException(status_code=404, detail="Product not found")
    return {"product": updated_product_data}
@router.delete("/{product_id}")
def delete_product_id(product_id: int):
    deleted_product = delete_product(product_id)
    if not deleted_product:
        raise HTTPException(status_code=404, detail="Product not found")
    return {"message": "Product deleted successfully"}
@router.patch("/{product_id}")
def update_partial_product_id(product_id: int, updated_fields: dict):
    updated_product_data = update_partial_product(product_id, updated_fields)
    if not updated_product_data:
        raise HTTPException(status_code=404, detail="Product not found")
    return {"product": updated_product_data}