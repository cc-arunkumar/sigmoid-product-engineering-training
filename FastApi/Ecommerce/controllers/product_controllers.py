from fastapi import FastAPI  , APIRouter , HTTPException
from services.product_service import get_all_products , get_product_by_id , create_product
from models.products_model import Product

router  = APIRouter(
    prefix="/api/products",
    tags=["products"]
)

@router.get("/")
def get_products():
    prodcuts = get_all_products()
    return prodcuts

@router.get("/health")
def system_health():
    return {"message": "System is healthy !!!!!!!"}

@router.get("/{product_id}")
def get_product_id(product_id : int):
    product= get_product_by_id(product_id)

    if not product:
        raise HTTPException(status_code = 404 , detail = "Product not found !")
    
    return product

@router.post("/")
def add_product(product_details :Product):
    product = create_product(product_details = product_details)
    return product
  