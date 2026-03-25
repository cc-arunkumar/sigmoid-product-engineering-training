# from app.models.product_model import Product

# products = [
#     {
#         "id": 1,
#         "name": "Product 1",
#         "price": 100,
#         "category": "Category A",
#         "stock": 10
#     },
#     {
#         "id": 2,
#         "name": "Product 2",
#         "price": 200,
#         "category": "Category B",
#         "stock": 20
#     }
# ]

# def get_all_products():
#     return products

# def get_product_by_id(product_id: int):
#     for product in products:
#         if product['id'] == product_id:
#             return product
        

# def create_product(product_data):
#     new_product = product_data.dict()
#     new_product['id'] = len(products) + 1
#     products.append(new_product)
#     return new_product

# def replace_product(product_id: int, product_data: Product):
#     for index, prod in enumerate(products):
#         if prod["id"] == product_id:
#             updated_product = {
#                 "id": product_id,
#                 **product_data.dict()
#             }
#             products[index] = updated_product
#             return updated_product
#     return None


# def delete_product(product_id: int):
#     for index, prod in enumerate(products):
#         if prod["id"] == product_id:
#             del products[index]
#             return True
#     return False   


# # PATCH Product
# def patch_update(product_id: int, patch_update):

#     for product in products:
#         if product["id"] == product_id:
#             patched_data = patch_update.dict(exclude_unset=True)

#             # exclude_unset=True means:
#             # In pydantic model, fields can be:
#             # 1. Set explicitly (user provided a value)
#             # 2. Unset (user didn't provide it at all, even if a default exists)

#             # "Only include fields that were actually provided when creating this object"
#             for key, value in patched_data.items():
#                 product[key] = value

#             return product

#     return None








# # from sqlalchemy.orm import Session


# from sqlalchemy.ext.asyncio import AsyncSession
# from app.db.base import ProductTable
# from sqlalchemy import select


# async def get_all_products(db: AsyncSession):
#     result = await db.execute(select(ProductTable))
#     return result.scalars().all()


# async def get_product_by_id(db: AsyncSession, product_id: int):
#     result = await db.execute(select(ProductTable).where(ProductTable.id == product_id))
#     return result.scalar_one_or_none()


# async def create_product(db: AsyncSession, product_data):
#     new_product = ProductTable(**product_data.dict())
#     db.add(new_product)
#     await db.commit()
#     await db.refresh(new_product)
#     return new_product


# async def update_product(db: AsyncSession, product_id: int, updated_data):
#     product = await get_product_by_id(db, product_id)
#     if not product:
#         return None

#     for key, value in updated_data.dict().items():
#         setattr(product, key, value)

#     db.add(product)
#     await db.commit()
#     await db.refresh(product)
#     return product


# async def patch_product(db: AsyncSession, product_id: int, patch_data):
#     product = await get_product_by_id(db, product_id)

#     if not product:
#         return None

#     update_data = patch_data.dict(exclude_unset=True)

#     for key, value in update_data.items():
#         setattr(product, key, value)

#     db.add(product)
#     await db.commit()
#     await db.refresh(product)

#     return product


# async def delete_product(db: AsyncSession, product_id: int):
#     product = await get_product_by_id(db, product_id)

#     if not product:
#         return None

#     await db.delete(product)
#     await db.commit()

#     return product



from sqlalchemy import select

from app.db.base import ProductTable


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

    for key, value in updated_data.dict().items():
        setattr(product, key, value)

    await db.commit()
    await db.refresh(product)

    return product


async def patch_product(db, product_id: int, patch_data):
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

