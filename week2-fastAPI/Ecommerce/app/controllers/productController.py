from fastapi import APIRouter, HTTPException, Depends
import app.services.productService as productService
from app.models.productModel import Product, PatchProduct
from sqlalchemy.orm import Session
from app.core.config import get_db

router = APIRouter(
    prefix="/api/products",
    tags=["Products"]
)

@router.get("/")
def getAllProducts(db: Session = Depends(get_db)):
    return productService.getAllProducts(db)

@router.get("/{productId}")
def getProductById(productId: int, db: Session = Depends(get_db)):
    product = productService.getProductById(productId, db)
    if(product is None): 
        raise HTTPException(status_code = 404, detail = "Product not found")
    return product

@router.post("/")
def createProduct(product: Product, db: Session = Depends(get_db)):
    return productService.createProduct(product, db)

@router.put("/{productId}")
def updateProduct(productId: int, productData: Product, db: Session = Depends(get_db)):
    product = productService.updateProduct(productId, productData, db)
    if(product is None): 
        raise HTTPException(status_code = 404, detail = "Product not found")
    return product

@router.patch('/{productId}')
def updatePartialProduct(productId:int, patchData: PatchProduct, db: Session = Depends(get_db)):
    patchedProduct = productService.patchUpdate(productId, patchData, db)

    if not patchedProduct:
        raise HTTPException(status_code=404, detail="Product not found !")

    return patchedProduct

@router.delete("/{productId}")
def deleteProduct(productId: int, db: Session = Depends(get_db)):
    deletedProduct = productService.deleteProduct(productId, db)

    if deletedProduct is None:
        raise HTTPException(status_code=404, detail="Product not found")

    return deletedProduct