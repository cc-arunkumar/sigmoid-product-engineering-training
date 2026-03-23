from fastapi import FastAPI, APIRouter, HTTPException
from app.services.product_service import get_all_products, get_product_by_id, add_product
from app.models.product_model import Product

router = APIRouter(
    prefix="/api/products",
    tags = ["products"]
)

@router.get("/")
def get_products():
    products=get_all_products()
    return {"products":products}

@router.get("/{product_id}")
def get_product(product_id: int):
    product=get_product_by_id(product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    return {"product":product}

@router.post("/")
def create_product(product: Product):
   
    return add_product(product)



# @router.get("/health")
# def get_health():
#     return {"message":"Product service is healthy   "} 