# products=[
#     {
#         "id": 1,
#         "name": "Laptop",
#         "price": 999.99,
#         "category": "Electronics",
#         "stock": 10
#     },
#     {
#         "id": 2,
#         "name": "Smartphone",
#         "price": 499.99,
#         "category": "Electronics",
#         "stock": 20
#     }
# ]
from sqlalchemy import select
from app.db.base import Product as ProductTable
#GET ALL PRODUCTS
async def get_all_products(db):
    result = await db.execute(select(ProductTable))
    return result.scalars().all()

#GET PRODUCT BY ID
async def get_product_by_id(db, product_id: int):
    result = await db.execute(select(ProductTable).where(ProductTable.id == product_id))
    return result.scalar_one_or_none()

#POST PRODUCT
async def create_product(db, product_data):
    new_product = ProductTable(**product_data.dict())
    db.add(new_product)
    db.commit()
    db.refresh(new_product)
    return new_product
  
#put product
async def update_product(db, product_id: int, product_data):
    product = await db.execute(select(ProductTable).where(ProductTable.id == product_id))
    product = product.scalar_one_or_none()
    if not product:
        return None
    for key, value in product_data.dict(exclude_unset=True).items():
        setattr(product, key, value)
    db.commit()
    db.refresh(product)
    return product

#delete product
async def delete_product(db, product_id: int):
    product = await db.execute(select(ProductTable).where(ProductTable.id == product_id))
    product = product.scalar_one_or_none()
    if not product:
        return False
    await db.delete(product)
    await db.commit()
    return product
            
#Patch
async def partial_update_product(db, product_id: int, product_data):
    product = await db.execute(select(ProductTable).where(ProductTable.id == product_id))
    product = product.scalar_one_or_none()
    if not product:
        return None
    for key, value in product_data.dict(exclude_unset=True).items():
        setattr(product, key, value)
    db.commit()
    db.refresh(product)
    return product




