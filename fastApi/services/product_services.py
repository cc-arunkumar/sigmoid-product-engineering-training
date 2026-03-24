# from models.product_model import ProductUpdate

# products = [
#     {"id": 1, "name": "iPhone 15", "price": 80000, "stock": 10, "category": "Electronics"},
#     {"id": 2, "name": "Samsung Galaxy S23", "price": 75000, "stock": 15, "category": "Electronics"},
#     {"id": 3, "name": "OnePlus 12", "price": 65000, "stock": 8, "category": "Electronics"},
#     {"id": 4, "name": "Realme GT", "price": 35000, "stock": 20, "category": "Electronics"},
#     {"id": 5, "name": "Nike Shoes", "price": 5000, "stock": 25, "category": "Fashion"},
#     {"id": 6, "name": "Levi's Jeans", "price": 3000, "stock": 18, "category": "Fashion"},
# ]

# GET all products
# def get_all_products():
#     return products

# def  get_product_by_id(product_id : int):
#     for product in products:
#         if(product["id"] == product_id):
#             return product
        
# #POST create product
# def create_product(product_data):
#     new_product = product_data.dict()
#     new_product["id"] = len(products) + 1
#     products.append(new_product)
#     return products

# #PUT update product
# def update_product(product_id : int, product_data):
#     for product in products:
#         if(product["id"] == product_id):
#             product.update(product_data.dict())
#             return product
#     return None

# #PATCH update product partially
# def patch_product(product_id: int, update_data: ProductUpdate):
#     product = get_product_by_id(product_id)

#     if not product:
#         return None
    
#     # Update only provided fields
#     update_dict = update_data.dict(exclude_unset=True) # so that only values that are entered by user are updated

#     for key, value in update_dict.items():
#             product[key] = value

#     return product

# #DELETE delete product
# def delete_product(product_id: int):
#     product = get_product_by_id(product_id)
#     if not product:
#         return None
#     products.remove(product)
#     return product

# app/services/product_service.py
# from sqlalchemy.orm import Session
# from typing import Optional

# from db.base import ProductTable  # Your SQLAlchemy Product model
# from models.product_model import Product, ProductPatch

# # Get all products
# def get_all_products(db: Session):
#     return db.query(ProductTable).all()

# # Get product by ID
# def get_product_by_id(db: Session, product_id: int):
#     return db.query(ProductTable).filter(ProductTable.id == product_id).first()

# # Create new product
# def create_product(db: Session, product_data: Product):
#     new_product = ProductTable(**product_data.dict())
#     db.add(new_product)
#     db.commit()
#     db.refresh(new_product)
#     return new_product

# # Update product fully (PUT)
# def update_product(db: Session, product_id: int, updated_data: Product):
#     product = db.query(ProductTable).filter(ProductTable.id == product_id).first()
#     if not product:
#         return None

#     for key, value in updated_data.dict().items():
#         setattr(product, key, value)

#     db.commit()
#     db.refresh(product)
#     return product

# # Partial update product (PATCH)
# def patch_product(db: Session, product_id: int, patch_data: ProductPatch):
#     product = db.query(ProductTable).filter(ProductTable.id == product_id).first()
#     if not product:
#         return None

#     update_data = patch_data.dict(exclude_unset=True)
#     for key, value in update_data.items():
#         setattr(product, key, value)

#     db.commit()
#     db.refresh(product)
#     return product

# # Delete product
# def delete_product(db: Session, product_id: int):
#     product = db.query(ProductTable).filter(ProductTable.id == product_id).first()
#     if not product:
#         return None

#     db.delete(product)
#     db.commit()
#     return product


from sqlalchemy import select
from db.base import ProductTable


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