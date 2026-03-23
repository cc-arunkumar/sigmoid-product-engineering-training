from fastapi import APIRouter
from app.services.productService import getAllProducts;

router = APIRouter(
    prefix="/api/products",
    tags=["Products"]
)

@router.get("/")
def getProducts():
    return getAllProducts()

