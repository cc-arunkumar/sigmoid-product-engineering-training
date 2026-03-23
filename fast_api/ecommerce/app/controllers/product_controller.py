from fastapi import APIRouter,HTTPException
from app.services.product_service import get_all_products
from app.services.product_service import get_product_by_id,create_product
from app.models.product_model import Product

router = APIRouter(
    prefix="/api/products",
    tags=["Products"]
)

#GET PRODUCTS
@router.get("/")
def get_products():
    products=get_all_products()
    return products

#GET PRODUCTS BY ID
@router.get("/{product_id}")
def get_product(product_id: int):
    product = get_product_by_id(product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product

#CREATE PRODUCTS
@router.post("/")
def create(product_data:Product):
    return create_product(product_data)

# #DELETE PRODUCTS
# @router.delete("/{product_id}")
# def delete(product_id):
    


# @router.get("/health")
# def health_check():
#     return {"status": "Product API is running"}