# from sqlalchemy.orm import Session

# async 
from sqlalchemy import select 

from db.base import ProductTable


# def get_all_products(db: Session):
#     return db.query(ProductTable).all()



# def get_product_by_id(db: Session, product_id: int):
#     return db.query(ProductTable).filter(ProductTable.id == product_id).first()


# def create_product(db: Session, product_data):
#     new_product = ProductTable(**product_data.dict())

#     db.add(new_product)
#     db.commit()
#     db.refresh(new_product)

#     return new_product


# def update_product(db: Session, product_id: int, updated_data):
#     product = db.query(ProductTable).filter(ProductTable.id == product_id).first()

#     if not product:
#         return None

#     for key, value in updated_data.dict().items():
#         setattr(product, key, value)

#     db.commit()
#     db.refresh(product)

#     return product


# def patch_product(db: Session, product_id: int, patch_data):
#     product = db.query(ProductTable).filter(ProductTable.id == product_id).first()

#     if not product:
#         return None

#     update_data = patch_data.dict(exclude_unset=True)

#     for key, value in update_data.items():
#         setattr(product, key, value)

#     db.commit()
#     db.refresh(product)

#     return product


# def delete_product(db: Session, product_id: int):
#     product = db.query(ProductTable).filter(ProductTable.id == product_id).first()

#     if not product:
#         return None

#     db.delete(product)
#     db.commit()

#     return product



async def get_all_products (db):
    result = await db.execute(select (ProductTable))
    return result.scalars().all()


async def get_product_by_id(db, product_id: int):
    result = await db.execute(
        select (ProductTable).where (ProductTable.id == product_id)
        )
    return result.scalar_one_or_none()


async def create_product (db, product_data):
    new_product = ProductTable (**product_data.dict())
    db.add(new_product)
    await db.commit()


async def update_product (db, product_id: int, updated_data):
    result = await db.execute(
        select (ProductTable).where (ProductTable.id == product_id)
        )
    product = result.scalar_one_or_none()
    if not product:
        return None
    for key, value in updated_data.dict().items():
        setattr(product, key, value)
        await db.commit()
        await db.refresh (product)
        return product
    


async def patch_product(db, product_id: int, patch_data):
    result = await db.execute(
        select (ProductTable).where(ProductTable.id == product_id)
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
