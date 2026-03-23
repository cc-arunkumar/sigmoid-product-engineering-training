from fastapi import APIRouter, HTTPException
import app.services.productService as productService

router = APIRouter(
    prefix="/api/products",
    tags=["Products"]
)

@router.get("/")
def getAllProducts():
    return productService.getAllProducts()

@router.get("/{productId}")
def getProductById(productId: int):
    product = productService.getProductById(productId)
    if(product is None): 
        raise HTTPException(status_code = 404, detail = "Product not found")
    return product