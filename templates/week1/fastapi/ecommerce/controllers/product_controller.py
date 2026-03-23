from fastapi import APIRouter
from services.product_service import get_all_products,get_productById
router = APIRouter(
    prefix="/api/products",
    tags=["Products"]
)

# get all logic
@router.get("/")
def get_products():
    return get_all_products()

# get by id logic
@router.get("/{product_id}")
def get_product_by_id(product_id: int):
    product = get_productById(product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    return product
