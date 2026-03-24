from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.product_model import Product, ProductPatch
from sqlalchemy.orm import Session
from app.core.config import get_db

from app.services.product_service import (
    get_all_products, 
    get_product_by_id, 
    create_product, 
    update_product, 
    delete_product, 
    patch_product
)

router = APIRouter(
    prefix = "/api/products",
    tags = ["Products"]
)

@router.get("/")
async def read_products(db: AsyncSession = Depends(get_db)):
    return await get_all_products(db)



@router.get("/{product_id}")
async def read_product(product_id: int, db: AsyncSession = Depends(get_db)):
    product = await get_product_by_id(db, product_id)

    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    return product


@router.post("/")
async def add_product(product: Product, db: AsyncSession = Depends(get_db)):
    return await create_product(db, product)

@router.put("/{product_id}")
async def put_product(product_id: int, product: Product, db: AsyncSession = Depends(get_db)):
    updated_product = await update_product(db, product_id, product)
    if updated_product:
        return {"product": updated_product}
    raise HTTPException(status_code=404, detail="Product not found")

@router.delete("/{product_id}")
async def remove_product(product_id: int, db: AsyncSession = Depends(get_db)):
    success = await delete_product(db, product_id)
    if success:
        return {
            "message": "Product deleted successfully",
            "product": success
            }
    
    raise HTTPException(status_code=404, detail="Product not found")

@router.patch("/{product_id}")
async def partial_update_product(product_id: int, patch_data: ProductPatch, db: AsyncSession = Depends(get_db)):
    updated_product = await patch_product(db, product_id, patch_data)
    if updated_product:
        return {"product": updated_product}
    raise HTTPException(status_code=404, detail="Product not found")