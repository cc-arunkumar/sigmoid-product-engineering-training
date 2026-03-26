from fastapi import APIRouter, HTTPException,Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.services.product_service import delete_product, get_all_products
from app.services.product_service import get_product_by_id
 
from app.services.product_service import create_product
from app.services.product_service import update_product
from app.services.product_service import partial_update_product
from app.models.product_model import Product , ProductUpdate  
from app.core.config import get_db
router = APIRouter(
    prefix="/api/products",
    tags=["products"]
)

@router.get("/")
async def get_products(db:AsyncSession = Depends(get_db)):
    products= get_all_products(db)
    return products

# @router.get("/health")
# def health_check():
#     return {"status": "Product API is running!"}

@router.get("/{product_id}")
async def get_product(product_id: int,db:AsyncSession = Depends(get_db)):
    product = await get_product_by_id(db,product_id)
    if not product:
        return HTTPException(status_code=404, detail="Product not found")
    return product
@router.post("/")

async def add_product(product: Product,db :AsyncSession=Depends(get_db)):
    new_product = await create_product(db,product)
    return new_product

@router.put("/{product_id}")
async def update_product_endpoint(product_id: int, product: Product,db: AsyncSession = Depends(get_db)):
    updated_product = await update_product(db, product_id, product)
    if not updated_product:
        return HTTPException(status_code=404, detail="Product not found")
    return updated_product  

@router.delete("/{product_id}")
async def delete_product_endpoint(product_id: int,db: AsyncSession = Depends(get_db)):   
    success = await delete_product(db,product_id)
    if not success:
        return HTTPException(status_code=404, detail="Product not found")
    return {"message": "Product deleted successfully"}

@router.patch("/{product_id}")
async def partial_update_product_endpoint(product_id: int, product: ProductUpdate,db: AsyncSession = Depends(get_db)):
    updated_product = await partial_update_product(db, product_id, product)
    if not updated_product:
        return HTTPException(status_code=404, detail="Product not found")
    return updated_product