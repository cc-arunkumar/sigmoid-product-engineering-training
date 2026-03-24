# from sqlalchemy.orm import Session
# from sqlalchemy.ext.asyncio import AsyncSession
# from app.db.base import PrdouctTable
# from sqlalchemy import select


# # GET ALL PRODUCTS
# def get_all_products(db: Session):
#     return db.query(PrdouctTable).all()


# # GET PRODUCT BY ID
# def get_product_by_id(product_id: int, db: Session):
#     return db.query(PrdouctTable).filter(PrdouctTable.id == product_id).first()


# # CREATE PRODUCT
# def create_product(product_data, db: Session):
#     new_product = PrdouctTable(
#         name=product_data.name,
#         price=product_data.price,
#         category=product_data.category,
#         stock=product_data.stock
#     )
#     db.add(new_product)
#     db.commit()
#     db.refresh(new_product)
#     return new_product


# # PUT PRODUCT (FULL UPDATE)
# def put_products(product_id: int, product_data, db: Session):
#     product = db.query(PrdouctTable).filter(PrdouctTable.id == product_id).first()

#     if not product:
#         return None

#     product.name = product_data.name
#     product.price = product_data.price
#     product.category = product_data.category
#     product.stock = product_data.stock

#     db.commit()
#     db.refresh(product)
#     return product


# # PATCH PRODUCT (PARTIAL UPDATE)
# def patch_product(product_id: int, product_data, db: Session):
#     product = db.query(PrdouctTable).filter(PrdouctTable.id == product_id).first()

#     if not product:
#         return None

#     update_data = product_data.dict(exclude_unset=True)

#     for key, value in update_data.items():
#         setattr(product, key, value)

#     db.commit()
#     db.refresh(product)
#     return product


# # DELETE PRODUCT
# def delete_product(product_id: int, db: Session):
#     product = db.query(PrdouctTable).filter(PrdouctTable.id == product_id).first()

#     if not product:
#         return None

#     db.delete(product)
#     db.commit()
#     return product


from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.db.base import PrdouctTable

# GET ALL PRODUCTS
async def get_all_products(db: AsyncSession):
    result = await db.execute(select(PrdouctTable))
    return result.scalars().all()

# GET PRODUCT BY ID
async def get_product_by_id(db: AsyncSession, product_id: int):
    result = await db.execute(
        select(PrdouctTable).where(PrdouctTable.id == product_id)
    )
    return result.scalar_one_or_none()

# CREATE PRODUCT
async def create_product(db: AsyncSession, product_data):
    new_product = PrdouctTable(**product_data.model_dump())
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