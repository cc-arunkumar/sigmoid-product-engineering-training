from sqlalchemy.orm import Session
from app.db.base import ProductTable
from sqlalchemy import select

# GET All Products
async def get_all_products(db : Session):
    result = await db.execute(select(ProductTable))
    return result.scalars().all()


# GET Products by id
async def get_product_by_id(db: Session, product_id: int):
    result = await db.execute(select(ProductTable).where(ProductTable.id == product_id))
    return result.scalar_one_or_none()

# POST to create product
async def create_product(db: Session, product_details):
    new_product = ProductTable(**product_details.dict())

    db.add(new_product)
    await db.commit()
    await db.refresh(new_product)

    return new_product

# PUT to update product
async def update_product(db: Session, product_details, product_id):
    result = await db.execute(select(ProductTable).where(ProductTable.id == product_id))
    product = result.scalar_one_or_none()

    if not product:
        return None
    
    for key, value in product_details.dict().items():
        setattr(product, key, value)
    
    await db.commit()
    await db.refresh(product)

    return product
    

# DELETE Product
async def delete_product(db: Session, product_id):
    result = await db.execute(select(ProductTable).where(ProductTable.id == product_id))
    product = result.scalar_one_or_none()
    
    if not product:
        return None
    
    await db.delete(product)
    await db.commit()

    return product



# PATCH Product
async def patch_update(db: Session, product_id: int, patch_update):
    result = await db.execute(select(ProductTable).where(ProductTable.id == product_id))
    product = result.scalar_one_or_none()
    
    if not product:
        return None
    
    update_data = patch_update.dict(exclude_unset = True)

    for key, value in update_data.items():
        setattr(product, key, value)
    
    await db.commit()
    await db.refresh(product)

    return product