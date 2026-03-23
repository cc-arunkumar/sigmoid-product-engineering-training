from fastapi import APIRouter, HTTPException
from app.models.product_model import Product
from app.services.product_service import get_all_products, get_product_id, create_product, update_product, patch_update, delete_prod

router = APIRouter(
    prefix="/api/products",
    tags=["products"]
)

# home route
@router.get("/")
def get_products():
    return get_all_products()

# health check route
@router.get("/health")
def health_check():
    return {"status": "Product API is running"}

#get product by id
@router.get("/{product_id}")
def get_product_ID(product_id: int):
    product = get_product_id(product_id)
    if not product:
        raise HTTPException(status_code=404,detail="Product not found!")
    return product

# post product
@router.post("/")
def add_product(product: Product):
    return create_product(product)

# put product
@router.put("/{product_id}")
def put_product(product_id: int, product_data: Product):
    product = update_product(product_id,product_data)
    if not product:
        raise HTTPException(status_code=404,details="Product not found")
    return product
    

# patch product
@router.patch("/{product_id}")
def update_partial_product(product_id: int, patch_data: Product):
    patched_product = patch_update(product_id,patch_data)

    if not patched_product:
        raise HTTPException(status_code=404,detail="Product not found!")

    return patched_product


# delete product
@router.delete("/{product_id}")
def delete_product(product_id: int):
    product = delete_prod(product_id)

    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    return product