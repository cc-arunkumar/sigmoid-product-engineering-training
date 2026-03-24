from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.services.product_service import (
    get_all_products,
    get_product_by_id,
    create_product,
    update_product,
    patch_update,
)
from app.models.product_model import Product, ProductUpdate, ProductOut
from app.core.config import get_db


router = APIRouter(
    prefix="/api/products",
    tags=["products"]
)

@router.get("/")
async def get_products(db: AsyncSession = Depends(get_db)):
    products = await get_all_products(db)
    return {"products": [ProductOut.from_orm(p) for p in products]}

@router.get("/{product_id}")
async def get_product(product_id: int, db: AsyncSession = Depends(get_db)):
    product = await get_product_by_id(db, product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return {"product": ProductOut.from_orm(product)}

@router.post("/")
async def create_product_endpoint(product: Product, db: AsyncSession = Depends(get_db)):
    new_p = await create_product(db, product)
    return ProductOut.from_orm(new_p)   

@router.put("/{product_id}")
async def update_product_endpoint(product_id: int, product: Product, db: AsyncSession = Depends(get_db)):
    updated_p = await update_product(db, product_id, product)   

    if not updated_p:
        raise HTTPException(status_code=404, detail="Product not found")
    return ProductOut.from_orm(updated_p)

# PATCH Product
@router.patch("/{product_id}")
async def update_partial_product(product_id: int, patch_data: ProductUpdate, db: AsyncSession = Depends(get_db)):
    patched_product = await patch_update(db, product_id, patch_data)

    if not patched_product:
        raise HTTPException(status_code=404, detail="Product not found!")
    return ProductOut.from_orm(patched_product)