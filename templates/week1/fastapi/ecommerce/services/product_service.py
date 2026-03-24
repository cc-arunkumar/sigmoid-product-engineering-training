# products = [
#     {
#         "id":1,
#         "name":"Laputopu",
#         "price":100,
#         "category":"electronics",
#         "stock":1
#     },
#     {
#         "id":2,
#         "name":"dechtopu",
#         "price":10,
#         "category":"electronics",
#         "stock":2
#     }
# ]
# # GET ALL
# def get_all_products():
#     return products

# # get products by id
# def get_productById(product_id : int):
#     for product in products:
#         if(product_id == product["id"]):
#             return product
#     return None

# #CREATE PRODUCT
# def create_product(input_product):
#     new_product = input_product.dict()
#     new_product["id"] = len(products)+1
#     products.append(new_product)

#     return new_product

# # UPDATE PRODUCT
# def update_product(input_product, product_id: int):
#     for i in range(len(products)):
#         if products[i]["id"] == product_id:
#             input_product["id"] = product_id   
#             products[i] = input_product        
#             return input_product

#     return None

# #DELETE Product
# def delete_product(product_id:int):
#     for product in products:
#         if product_id == product["id"]:
#             products.remove(product)
#             return product
#     return "Product not found"

# #PATCH Product
# def patch_product(product_id: int, input_product):
#     for product in products:
#         if product["id"] == product_id:
#             product.update(input_product)  
#             return product

#     return "Product not found"


# from sqlalchemy.orm import Session
# from db.base import ProductTable


# # GET all products
# def get_all_products(db: Session):
#     return db.query(ProductTable).all()


# # GET product by ID
# def get_product_by_id(db: Session, product_id: int):
#     return db.query(ProductTable).filter(ProductTable.id == product_id).first()


# # CREATE product
# def create_product(db: Session, product_data):
#     new_product = ProductTable(**product_data.dict())

#     db.add(new_product)
#     db.commit()
#     db.refresh(new_product)

#     return new_product


# # UPDATE (PUT - full replace)
# def update_product(db: Session, product_id: int, updated_data):
#     product = db.query(ProductTable).filter(ProductTable.id == product_id).first()

#     if not product:
#         return None

#     for key, value in updated_data.dict().items():
#         setattr(product, key, value)

#     db.commit()
#     db.refresh(product)

#     return product


# # PATCH (partial update)
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


# # DELETE product
# def delete_product(db: Session, product_id: int):
#     product = db.query(ProductTable).filter(ProductTable.id == product_id).first()

#     if not product:
#         return None

#     db.delete(product)
#     db.commit()

#     return product





from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from db.base import ProductTable

async def get_all_products(db: AsyncSession):
    result = await db.execute(select(ProductTable))
    return result.scalars().all()

async def get_product_by_id(db: AsyncSession, product_id: int):
    result = await db.execute(
        select(ProductTable).where(ProductTable.id == product_id)
    )
    return result.scalar_one_or_none()

async def create_product(db: AsyncSession, product_data):
    # .dict() is deprecated in Pydantic v2; use .model_dump() if using v2
    new_product = ProductTable(**product_data.dict())
    db.add(new_product)
    await db.commit()
    await db.refresh(new_product)
    return new_product

async def update_product(db: AsyncSession, product_id: int, updated_data):
    result = await db.execute(
        select(ProductTable).where(ProductTable.id == product_id)
    )
    product = result.scalar_one_or_none()
    
    if not product:
        return None

    # Full update (PUT logic)
    for key, value in updated_data.dict().items():
        setattr(product, key, value)

    await db.commit()
    await db.refresh(product)
    return product

async def patch_product(db: AsyncSession, product_id: int, patch_data):
    result = await db.execute(
        select(ProductTable).where(ProductTable.id == product_id)
    )
    product = result.scalar_one_or_none()

    if not product:
        return None

    # Partial update (PATCH logic) - only updates fields sent in the request
    update_data = patch_data.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(product, key, value)

    await db.commit()
    await db.refresh(product)
    return product

async def delete_product(db: AsyncSession, product_id: int):
    result = await db.execute(
        select(ProductTable).where(ProductTable.id == product_id)
    )
    product = result.scalar_one_or_none()

    if not product:
        return None

    await db.delete(product)
    await db.commit()
    return product