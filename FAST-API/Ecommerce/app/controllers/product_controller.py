from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.services.product_service import (
    get_all_products,
    get_product_by_id,
    create_product,
    put_products,
    patch_product,
    delete_product
)

from app.models.product_model import Product, ProductPatch
from app.core.config import get_db

router = APIRouter(
    prefix="/api/products",
    tags=["Products"]
)

# GET ALL PRODUCTS
@router.get("/")
async def get_products(db: AsyncSession = Depends(get_db)):
    return await get_all_products(db)

# GET PRODUCT BY ID
@router.get("/{product_id}")
async def get_product(product_id: int, db: AsyncSession = Depends(get_db)):
    product = await get_product_by_id(db, product_id)  
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product

# CREATE PRODUCT
@router.post("/")
async def create(product_data: Product, db: AsyncSession = Depends(get_db)):
    return await create_product(db, product_data)  

# PUT PRODUCT
@router.put("/{product_id}")
async def put(product_id: int, product_data: Product, db: AsyncSession = Depends(get_db)):
    product = await put_products(db, product_id, product_data)  
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product

# PATCH PRODUCT
@router.patch("/{product_id}")
async def patch(product_id: int, product_data: ProductPatch, db: AsyncSession = Depends(get_db)):
    product = await patch_product(db, product_id, product_data)  
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product

# DELETE PRODUCT
@router.delete("/{product_id}")
async def delete(product_id: int, db: AsyncSession = Depends(get_db)):
    product = await delete_product(db, product_id)  
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product