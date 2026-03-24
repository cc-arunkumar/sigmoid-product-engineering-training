from fastapi import APIRouter, HTTPException, Depends
import app.services.productService as productService
from app.models.productModel import Product, PatchProduct
from app.core.config import get_db
from sqlalchemy.ext.asyncio import AsyncSession

router = APIRouter(
    prefix="/api/products",
    tags=["Products"]
)

@router.get("/")
async def getAllProducts(db: AsyncSession = Depends(get_db)):
    return await productService.getAllProducts(db)

@router.get("/{productId}")
async def getProductById(productId: int, db: AsyncSession = Depends(get_db)):
    product = await productService.getProductById(productId, db)
    if(product is None): 
        raise HTTPException(status_code = 404, detail = "Product not found")
    return product

@router.post("/")
async def createProduct(product: Product, db: AsyncSession = Depends(get_db)):
    return await productService.createProduct(product, db)

@router.put("/{productId}")
async def updateProduct(productId: int, productData: Product, db: AsyncSession = Depends(get_db)):
    product = await productService.updateProduct(productId, productData, db)
    if(product is None): 
        raise HTTPException(status_code = 404, detail = "Product not found")
    return product

@router.patch('/{productId}')
async def updatePartialProduct(productId:int, patchData: PatchProduct, db: AsyncSession = Depends(get_db)):
    patchedProduct = await productService.patchUpdate(productId, patchData, db)

    if not patchedProduct:
        raise HTTPException(status_code=404, detail="Product not found !")

    return patchedProduct

@router.delete("/{productId}")
async def deleteProduct(productId: int, db: AsyncSession = Depends(get_db)):
    deletedProduct = await productService.deleteProduct(productId, db)

    if deletedProduct is None:
        raise HTTPException(status_code=404, detail="Product not found")

    return deletedProduct