"""
    Product Controller: Handles API endpoints related to products.
"""
"""
    IMPORTS
"""
from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.services.product_service import (
    get_all_products, 
    get_product_by_id, 
    create_product, 
    put_product,
    patch_product, 
    delete_product
)
from app.models.product_model import (Product,
                                       ProductPatch)
from app.core.config import get_db

product_router = APIRouter(
    prefix="/api/products",
    tags=["Products"]
)

@product_router.get("/")
async def get_products(db: AsyncSession = Depends(get_db)):
    return await get_all_products(db)

@product_router.get("/{product_id}")
async def get_product(product_id: int, db : AsyncSession = Depends(get_db)):
    product = await get_product_by_id(db, product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product

@product_router.post("/")
async def add_product(product: Product, db : AsyncSession = Depends(get_db)):
    new_product = await create_product(db, product)
    return {
        "status" : 201,
        "success" : True,
        "data" : new_product,
        "message" : "Product created successfully"
    }

@product_router.put("/{product_id}")
async def update_product(product_id: int, product: Product, db : AsyncSession = Depends(get_db)):
    updated_product = await put_product(db, product_id, product)
    if not updated_product:
        raise HTTPException(status_code=404, detail="Product not found")
    return {
        "status" : 200,
        "success" : True,
        "data" : updated_product,
        "message" : "Product updated successfully"
    }

@product_router.patch("/{product_id}")
async def partial_update_product(product_id: int, product: ProductPatch, db : AsyncSession = Depends(get_db)):
    updated_product = await patch_product(db, product_id, product)
    if not updated_product:
        raise HTTPException(status_code=404, detail="Product not found")
    return {
        "status" : 200,
        "success" : True,
        "data" : updated_product,
        "message" : "Patch Product done successfully"
    }

@product_router.delete("/{product_id}")
async def remove_product(product_id: int, db : AsyncSession = Depends(get_db)):
    if not await delete_product(db, product_id):
        raise HTTPException(status_code=404, detail="Product not found")
    return {
        "status" : 200,
        "success" : True,
        "message" : "Product deleted successfully"
    }