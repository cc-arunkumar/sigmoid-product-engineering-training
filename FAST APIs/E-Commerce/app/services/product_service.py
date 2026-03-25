from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.base import ProductTable


async def get_all_products(db: AsyncSession):
    result = await db.execute(select(ProductTable))
    return result.scalars().all()


async def get_product_by_id(db: AsyncSession, product_id: int):
    result = await db.execute(
        select(ProductTable).where(ProductTable.id == product_id)
    )
    return result.scalar_one_or_none()


async def create_product(db: AsyncSession, product_data):
    # .dict() is deprecated in Pydantic v2; use .model_dump() if using v2
    new_product = ProductTable(**product_data.dict())

    db.add(new_product)
    await db.commit()
    await db.refresh(new_product)

    return new_product


async def update_product(db: AsyncSession, product_id: int, updated_data):
    result = await db.execute(
        select(ProductTable).where(ProductTable.id == product_id)
    )
    product = result.scalar_one_or_none()

    if not product:
        return None

    # Full update (PUT logic)
    for key, value in updated_data.dict().items():
        setattr(product, key, value)

    await db.commit()
    await db.refresh(product)

    return product


async def patch_product(db: AsyncSession, product_id: int, patch_data):
    result = await db.execute(
        select(ProductTable).where(ProductTable.id == product_id)
    )
    product = result.scalar_one_or_none()

    if not product:
        return None

    # Partial update (PATCH logic)
    # only updates fields sent in the request
    update_data = patch_data.dict(exclude_unset=True)

    for key, value in update_data.items():
        setattr(product, key, value)

    await db.commit()
    await db.refresh(product)

    return product


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
