from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.db.base import ProductTable


async def get_all_products(db: AsyncSession):
    result = await db.execute(select(ProductTable))
    return result.scalars().all()


async def get_product_by_id(db: AsyncSession, product_id: int):
    result = await db.execute(select(ProductTable).filter(ProductTable.id == product_id))
    return result.scalars().first()


async def create_product(db: AsyncSession, product_details):
    new_product = ProductTable(**product_details.dict())
    db.add(new_product)
    await db.commit()
    await db.refresh(new_product)
    return new_product


async def update_product(db: AsyncSession, product_details, product_id: int):
    result = await db.execute(select(ProductTable).filter(ProductTable.id == product_id))
    product = result.scalars().first()

    if not product:
        return None

    for key, value in product_details.dict().items():
        setattr(product, key, value)

    await db.commit()
    await db.refresh(product)
    return product


async def delete_product(db: AsyncSession, product_id: int):
    result = await db.execute(select(ProductTable).filter(ProductTable.id == product_id))
    product = result.scalars().first()

    if not product:
        return None

    await db.delete(product)
    await db.commit()
    return product


async def patch_update(db: AsyncSession, product_id: int, patch_update):
    result = await db.execute(select(ProductTable).filter(ProductTable.id == product_id))
    product = result.scalars().first()

    if not product:
        return None

    update_data = patch_update.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(product, key, value)

    await db.commit()
    await db.refresh(product)
    return product
