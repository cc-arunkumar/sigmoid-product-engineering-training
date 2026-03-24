from fastapi import FastAPI, APIRouter
from fastapi import HTTPException, Depends
from app.services.product_service import get_all_products, get_product_by_id, create_product, update_product, delete_product, patch_update
from app.models.products_model import Product, ProductPatch
from app.core.config import get_db
from sqlalchemy.orm import Session
from sqlalchemy.ext.asyncio import AsyncSession
router = APIRouter(
    prefix="/api/products",
    tags=["Products"]
)

@router.get("/")
async def get_products(db: AsyncSession = Depends(get_db)):
    return await get_all_products(db)

@router.get("/{product_id}")
async def get_product_id(product_id: int, db: AsyncSession = Depends(get_db)):
    product = await get_product_by_id(db, product_id= product_id)

    if not product:
        raise HTTPException(status_code = 404, detail="Product not found!!")
    return product

@router.post("/")
async def add_product(product_details : Product, db: AsyncSession = Depends(get_db)):
    product = await create_product(db, product_details=product_details)
    return product

@router.put("/{product_id}")
async def modify_product(product_details : Product, product_id : int, db: AsyncSession = Depends(get_db)):
    product = await update_product(db, product_details=product_details, product_id=product_id)
    return product

@router.delete("/{product_id}")
async def remove_product(product_id : int, db: AsyncSession = Depends(get_db)):
    product = await delete_product(db, product_id=product_id)
    return product

@router.patch("/{product_id}")
async def update_partial_product(product_id: int, patch_details: Product, db: AsyncSession = Depends(get_db)):
    result = await patch_update(db, product_id=product_id, patch_update=patch_details)

    if result is None:
        raise HTTPException(status_code=404, detail="Product not found!!")
    return result