# from fastapi import FASTAPI , APIROUTER
# from fastapi import APIRouter

# router = APIRouter(
#   prefix = "/api/products",
#   tags = ["products"]
# )

# @router.get("/health")
# def health_check():
#     return {"message": "Product APIs running"}

from fastapi import APIRouter,HTTPException

from app.services.product_service import get_all_products, get_product_by_id as fetch_product_by_id, create_product, update_product, delete_product, replace_product
from app.models.product_model import Product

router = APIRouter(
    prefix="/api/products",
    tags=["products"]
)

@router.get("/")
def get_products():
  products = get_all_products()
  return products

@router.get("/{product_id}")
def get_product(product_id : int):
  product = fetch_product_by_id(product_id)
  if not product:
    raise HTTPException(status_code=404, detail="Product not found")
  return product

@router.post("/")
def add_product(product: Product):
  return create_product(product)

@router.put("/{product_id}")
def put_product(product_id: int, product: Product):
  replaced = replace_product(product_id, product)
  if not replaced:
    raise HTTPException(status_code=404, detail="Product not found")
  return replaced

@router.patch("/{product_id}")
def patch_product(product_id: int, product: Product):
  updated = update_product(product_id, product)
  if not updated:
    raise HTTPException(status_code=404, detail="Product not found")
  return updated

@router.delete("/{product_id}")
def remove_product(product_id: int):
  deleted = delete_product(product_id)
  if not deleted:
    raise HTTPException(status_code=404, detail="Product not found")
  return {"message": "Product deleted successfully"}