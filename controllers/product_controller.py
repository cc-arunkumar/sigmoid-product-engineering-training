from fastapi import APIRouter

# We define the prefix here so we don't have to repeat it in every decorator
router = APIRouter(
    prefix="/api/products",
    tags=["products"]
)

@router.get("/health")
def health_check():
    return {"status": "success", "message": "Product API is healthy!"}

@router.get("/")
def get_all_products():
    return {"products": ["Laptop", "Mouse", "Keyboard"]}