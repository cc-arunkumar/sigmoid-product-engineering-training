from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.productModel import Product, PatchProduct
from app.db.base import ProductTable


async def getAllProducts(db: AsyncSession):
    result = await db.execute(select(ProductTable))
    return result.scalars().all()


async def getProductById(productId: int, db: AsyncSession):
    result = await db.execute(
        select(ProductTable).where(ProductTable.id == productId)
    )
    return result.scalar_one_or_none()


async def createProduct(product: Product, db: AsyncSession):
    data = product.model_dump()

    new_product = ProductTable(**data)

    db.add(new_product)
    await db.commit()
    await db.refresh(new_product)

    return new_product


async def updateProduct(productId: int, productData: Product, db: AsyncSession):
    result = await db.execute(
        select(ProductTable).where(ProductTable.id == productId)
    )
    product = result.scalar_one_or_none()

    if not product:
        return None

    update_data = productData.model_dump()

    for key, value in update_data.items():
        setattr(product, key, value)

    await db.commit()
    await db.refresh(product)

    return product


async def patchUpdate(productId: int, patchData: PatchProduct, db: AsyncSession):
    result = await db.execute(
        select(ProductTable).where(ProductTable.id == productId)
    )
    product = result.scalar_one_or_none()

    if not product:
        return None

    update_data = patchData.model_dump(exclude_unset=True)

    if not update_data:
        return product

    for key, value in update_data.items():
        setattr(product, key, value)

    await db.commit()
    await db.refresh(product)

    return product


async def deleteProduct(productId: int, db: AsyncSession):
    result = await db.execute(
        select(ProductTable).where(ProductTable.id == productId)
    )
    product = result.scalar_one_or_none()

    if not product:
        return None

    await db.delete(product)
    await db.commit()

    return product