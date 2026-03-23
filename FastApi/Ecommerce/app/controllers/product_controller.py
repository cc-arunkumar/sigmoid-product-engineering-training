from fastapi import FastAPI,APIRouter,HTTPException
from app.services.product_service import get_all_products
from app.services.product_service import get_product_by_id
from app.services.product_service import create_product
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