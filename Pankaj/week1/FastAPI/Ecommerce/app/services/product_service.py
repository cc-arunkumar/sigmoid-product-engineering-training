from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.db.base import ProductTable
# products = [
#     {"id": 1, "name": "Laptop", "price": 999.99, "category": "Electronics","stock" : 10},
#     {"id": 2, "name": "Smartphone", "price": 499.99, "category": "Electronics","stock" : 20},
#     {"id": 3, "name": "Headphones", "price": 199.99, "category": "Electronics","stock" : 15},
# ]

async def get_all_products(db : AsyncSession):
    result = await db.execute(select(ProductTable))
    return result.scalars().all()

async def get_product_by_id(db : AsyncSession, product_id : int):
    result = await db.execute(select(ProductTable).filter(ProductTable.id == product_id))
    return result.scalars().first()

async def create_product(db : AsyncSession,product_data):
    new_product = ProductTable( **product_data.dict() )
    db.add(new_product)
    await db.commit()
    await db.refresh(new_product)
    
    return new_product

async def put_product(db : AsyncSession, product_id : int, product_data):
    result = await db.execute(select(ProductTable).filter(ProductTable.id == product_id))
    product = result.scalars().first()
    if not product:
        return None
    
    for key, value in product_data.dict().items():
        setattr(product, key, value)
    
    await db.commit()
    await db.refresh(product)
    
    return product

async def patch_product(db : AsyncSession, product_id : int , product_data):
    result = await db.execute(select(ProductTable).filter(ProductTable.id == product_id))
    product = result.scalars().first()
    
    if not product:
        return None
    for key, value in product_data.dict(exclude_unset=True).items():
        setattr(product, key, value)
    
    await db.commit()
    await db.refresh(product)
    return product

async def delete_product(db : AsyncSession,product_id : int):
    result = await db.execute(select(ProductTable).filter(ProductTable.id == product_id))
    product = result.scalars().first()
    if not product:
        return False
    
    await db.delete(product)
    await db.commit()
    
    return True

