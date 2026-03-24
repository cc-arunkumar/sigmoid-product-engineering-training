from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.db.base import ProductTable
from app.models.product_model import Product, ProductUpdate


async def get_all_products(db: AsyncSession):
    result = await db.execute(select(ProductTable))
    return result.scalars().all()


async def get_product_by_id(db: AsyncSession, product_id: int):
    result = await db.execute(select(ProductTable).where(ProductTable.id == product_id))
    return result.scalar_one_or_none()


async def create_product(db: AsyncSession, product_data: Product):
    new_product = ProductTable(**product_data.dict())

    db.add(new_product)
    await db.commit()
    await db.refresh(new_product)

    return new_product


async def update_product(db: AsyncSession, product_id: int, updated_data: Product):
    result = await db.execute(select(ProductTable).where(ProductTable.id == product_id))
    product = result.scalar_one_or_none()
    if not product:
        return None

    for key, value in updated_data.dict(exclude_unset=True).items():
        setattr(product, key, value)

    await db.commit()
    await db.refresh(product)
    return product


# PATCH Product
async def patch_update(db: AsyncSession, product_id: int, patch_data: ProductUpdate):
    result = await db.execute(select(ProductTable).where(ProductTable.id == product_id))
    product = result.scalar_one_or_none()
    if not product:
        return None

    for key, value in patch_data.dict(exclude_unset=True).items():
        setattr(product, key, value)

    await db.commit()
    await db.refresh(product)
    return product
