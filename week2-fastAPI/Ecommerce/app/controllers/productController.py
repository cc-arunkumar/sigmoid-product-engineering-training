from fastapi import APIRouter, HTTPException
import app.services.productService as productService
from app.models.productModel import Product

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

@router.post("/")
def createProduct(product: Product):
    return productService.createProduct(product)

@router.put("/{productId}")
def updateProduct(productId: int, productData: Product):
    product = productService.updateProduct(productId, productData)
    if(product is None): 
        raise HTTPException(status_code = 404, detail = "Product not found")
    return product