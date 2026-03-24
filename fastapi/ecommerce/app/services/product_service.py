# app/services/product_service.py

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.models.product_model import Product, ProductPartialUpdate
from app.db.base import Product as ProductModel


# Get all products
async def get_all_products(db: AsyncSession):
    result = await db.execute(select(ProductModel))
    return result.scalars().all()


# Get product by ID
async def get_product_by_id(db: AsyncSession, product_id: int):
    result = await db.execute(
        select(ProductModel).where(ProductModel.id == product_id)
    )
    return result.scalar_one_or_none()


# Add product
async def create_product(db: AsyncSession, product_data: Product):
    new_product = ProductModel(**product_data.dict())

    db.add(new_product)
    await db.commit()               # ✅ FIX
    await db.refresh(new_product)   # ✅ FIX

    return new_product


# Update product
async def update_product(db: AsyncSession, product_id: int, product_data: Product):
    result = await db.execute(
        select(ProductModel).where(ProductModel.id == product_id)
    )
    product = result.scalar_one_or_none()

    if not product:
        return None

    for key, value in product_data.dict().items():
        setattr(product, key, value)

    await db.commit()               
    await db.refresh(product)       

    return product


# Delete product
async def delete_product(db: AsyncSession, product_id: int):
    result = await db.execute(
        select(ProductModel).where(ProductModel.id == product_id)
    )
    product = result.scalar_one_or_none()

    if not product:
        return None

    await db.delete(product)        
    await db.commit()               

    return product


# Partial update product
async def partial_update_product(
    db: AsyncSession,
    product_id: int,
    product_data: ProductPartialUpdate
):
    result = await db.execute(
        select(ProductModel).where(ProductModel.id == product_id)
    )
    product = result.scalar_one_or_none()

    if not product:
        return None

    for key, value in product_data.dict(exclude_unset=True).items():
        setattr(product, key, value)

    await db.commit()               
    await db.refresh(product)       

    return product