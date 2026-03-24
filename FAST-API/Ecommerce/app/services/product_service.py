from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.db.base import ProductTable

# GET ALL PRODUCTS
async def get_all_products(db: AsyncSession):
    result = await db.execute(select(ProductTable))
    return result.scalars().all()


# GET PRODUCT BY ID
async def get_product_by_id(db: AsyncSession, product_id: int):
    result = await db.execute(
        select(ProductTable).where(ProductTable.id == product_id)
    )
    return result.scalar_one_or_none()


# CREATE PRODUCT
async def create_product(db: AsyncSession, product_data):
    new_product = ProductTable(**product_data.model_dump())
    db.add(new_product)
    await db.commit()
    await db.refresh(new_product)
    return new_product


# PUT PRODUCT (FULL UPDATE)
async def put_products(db: AsyncSession, product_id: int, product_data):
    product = await get_product_by_id(db, product_id)
    if not product:
        return None

    for key, value in product_data.model_dump().items():
        setattr(product, key, value)

    await db.commit()
    await db.refresh(product)
    return product

# PATCH PRODUCT (PARTIAL UPDATE)
async def patch_product(db: AsyncSession, product_id: int, product_data):
    product = await get_product_by_id(db, product_id)
    if not product:
        return None

    for key, value in product_data.model_dump(exclude_unset=True).items():
        setattr(product, key, value)

    await db.commit()
    await db.refresh(product)
    return product


# DELETE PRODUCT
async def delete_product(db: AsyncSession, product_id: int):
    product = await get_product_by_id(db, product_id)
    if not product:
        return None

    await db.delete(product)
    await db.commit()
    return product