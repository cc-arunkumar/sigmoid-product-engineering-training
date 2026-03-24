from fastapi import APIRouter, HTTPException
import app.services.productService as productService
from app.models.productModel import Product, PatchProduct

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

@router.patch('/{productId}')
def updatePartialProduct(productId:int, patchData: PatchProduct):
    patchedProduct = productService.patchUpdate(productId, patchData)

    if not patchedProduct:
        raise HTTPException(status_code=404, detail="Product not found !")

    return patchedProduct

@router.delete("/{productId}")
def deleteProduct(productId: int):
    deletedProduct = productService.deleteProduct(productId)

    if deletedProduct is None:
        raise HTTPException(status_code=404, detail="Product not found")

    return deletedProduct