from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.base import ProductTable


# Get all products
async def get_all_products(db: AsyncSession):
    result = await db.execute(select(ProductTable))
    return result.scalars().all()


# Get product by ID
async def get_product_by_id(db: AsyncSession, product_id: int):
    result = await db.execute(
        select(ProductTable).where(ProductTable.id == product_id)
    )
    return result.scalar_one_or_none()


# Create product
async def create_product(db: AsyncSession, product_data):
    new_product = ProductTable(**product_data.dict())

    db.add(new_product)
    await db.commit()
    await db.refresh(new_product)

    return new_product


# Update product (PUT)
async def update_product(db: AsyncSession, product_id: int, updated_data):
    result = await db.execute(
        select(ProductTable).where(ProductTable.id == product_id)
    )

    product = result.scalar_one_or_none()

    if not product:
        return None

    for key, value in updated_data.dict().items():
        setattr(product, key, value)

    await db.commit()
    await db.refresh(product)

    return product


# Patch product (PATCH)
async def patch_product(db: AsyncSession, product_id: int, patch_data):
    result = await db.execute(
        select(ProductTable).where(ProductTable.id == product_id)
    )

    product = result.scalar_one_or_none()

    if not product:
        return None

    update_data = patch_data.dict(exclude_unset=True)

    for key, value in update_data.items():
        setattr(product, key, value)

    await db.commit()
    await db.refresh(product)

    return product


# Delete product
async def delete_product(db: AsyncSession, product_id: int):
    result = await db.execute(
        select(ProductTable).where(ProductTable.id == product_id)
    )

    product = result.scalar_one_or_none()

    if not product:
        return None

    await db.delete(product)
    await db.commit()

    return product