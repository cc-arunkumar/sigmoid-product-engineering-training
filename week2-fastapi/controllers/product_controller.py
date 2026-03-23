from fastapi import APIRouter
from models.product_model import Product
from services.product_service import get_all_products,get_product_by_id,create_product
router = APIRouter(
    prefix="/api/product",
    tags=["Products"]  
)
@router.get("/")
def get_products():
    return get_all_products()
@router.get("/{product_id}")
def get_product(product_id: int):
    product = get_product_by_id(product_id)
    
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    return product
@router.post("/")
def add_product(product :Product):
    return create_product(product)
@router.get("/health")
def health_check():
    return {"status": "Product APIs running!"}