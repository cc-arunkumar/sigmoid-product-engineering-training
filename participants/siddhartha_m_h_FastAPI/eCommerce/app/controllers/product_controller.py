from fastapi import APIRouter, HTTPException
from app.services.product_service import get_all_products, get_product_by_id, create_product, update_product, delete_product, patch_product
from app.models.product_model import Product

router = APIRouter(
    prefix = "/api/products",
    tags = ["Products"]
)

@router.get("/")
def read_products():
    products = get_all_products()
    return {"products": products}



@router.get("/{product_id}")
def read_product(product_id: int):
    product = get_product_by_id(product_id)
    if product:
        return {"product": product}
    raise HTTPException(status_code=404, detail="Product not found")


@router.post("/")
def add_product(product: Product):
    new_product = create_product(product)
    return {"product": new_product}

@router.put("/{product_id}")
def put_product(product_id: int, product: Product):
    updated_product = update_product(product_id, product)
    if updated_product:
        return {"product": updated_product}
    raise HTTPException(status_code=404, detail="Product not found")

@router.delete("/{product_id}")
def remove_product(product_id: int):
    success = delete_product(product_id)
    if success:
        return {"message": "Product deleted successfully"}
    raise HTTPException(status_code=404, detail="Product not found")

@router.patch("/{product_id}")
def partial_update_product(product_id: int, patch_data: Product):
    updated_product = patch_product(product_id, patch_data)
    if updated_product:
        return {"product": updated_product}
    raise HTTPException(status_code=404, detail="Product not found")