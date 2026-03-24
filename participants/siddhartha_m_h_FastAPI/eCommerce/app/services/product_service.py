from app.db.base import ProductTable
from sqlalchemy.orm import Session
from sqlalchemy import select


async def get_all_products(db):
    result = await db.execute(select(ProductTable))
    return result.scalars().all()


async def get_product_by_id(db, product_id: int):
    result = await db.execute(
        select(ProductTable).where(ProductTable.id == product_id)
    )
    return result.scalar_one_or_none()

async def create_product(db, product_data):
    new_product = ProductTable(**product_data.dict())

    db.add(new_product)
    await db.commit()
    await db.refresh(new_product)

    return new_product


async def update_product(db, product_id: int, updated_data):
    result = await db.execute(
        select(ProductTable).where(ProductTable.id == product_id)
    )
    product = result.scalar_one_or_none()

    if not product:
        return None
    
    for key,value in updated_data.dict().items():
        setattr(product, key, value)

    await db.commit()
    await db.refresh(product)

    return product


async def delete_product(db, product_id: int):
    result = await db.execute(
        select(ProductTable).where(ProductTable.id == product_id)
    )

    product = result.scalar_one_or_none()

    if not product:
        return None
    
    await db.delete(product)
    await db.commit()

    return product

    
    

async def patch_product(db, product_id: int, patch_data):
    result = await db.execute(
        select(ProductTable).where(ProductTable.id == product_id)
    )

    product = result.scalar_one_or_none()

    if not product:
        return None
    
    update_data = patch_data.dict(exclude_unset = True)

    for key, value in update_data.items():
        setattr(product, key, value)

    await db.commit()
    await db.refresh(product)

    return product
