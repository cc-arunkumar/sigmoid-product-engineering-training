# products =[
#     {
#         "id": 1,
#         "name": "Laptop",
#         "price": 50000,
#         "category": "Electronics",
#         "stock": 10
#     },
#     {
#         "id": 2,
#         "name": "Smartphone",
#         "price": 25000,
#         "category": "Electronics",
#         "stock": 15
#     }
# ]


from sqlalchemy import select

from sqlalchemy.orm import Session

from app.db.base import ProductTable


async def get_all_products(db:Session):
    # return products
    # return db.query(ProductTable).all()
    result = await db.execute(select (ProductTable))
    return result.scalars().all()

async def get_product_by_id(db:Session, product_id:int):
    # for product in products:
    #     if product["id"]==product_id:
    #         return product
    # return None
    # return db.query(ProductTable).filter(ProductTable.id==product_id)
    result = await db.execute(
        select (ProductTable).where(ProductTable.id == product_id)
    )
    return result.scalar_one_or_none()

async def create_product(db:Session,product_data):
    # new_product= product_data.dict()

    # #Generating ID manually
    # new_product["id"]= len(products) +1

    # products.append(new_product)

    # return products
    new_product= ProductTable(**product_data.dict())

    db.add(new_product)
    await db.commit()
    # db.refresh(new_product)

    # return new_product



# def update_product_by_id(product_id: int, product_data):
#     for index, product in enumerate(products):
#         if product["id"] == product_id:
#             updated_product = product_data.dict()

#             # ID preserve karna hai
#             updated_product["id"] = product_id

#             products[index] = updated_product
#             return updated_product

#     return None

#update by using put
async def update_product_by_id(db ,product_id: int , product_data):
    # product = db.query(ProductTable).filter(ProductTable.id==product_id).first()

    result = await db.execute(
        select(ProductTable).where(ProductTable.id== product_id)
    )

    product= result.scalar_one_or_none()


    if not product:
        return None

    for key, value in product_data.dict().items():
        setattr(product,key,value)

    # db.commit()
    # db.refresh(product)

    return product
    #  updateproduct=product_data.dict()
    #  updateproduct["id"]= product_id
    #  for product in products:
    #     if product["id"]==product_id:
    #        product=updateproduct
    #        return product  
            
    #  return {"error": "Product not found"}


#update partial product

# def patch_update(product_id:int, patch_update):
    
#     # for product in products:
#     #     if product[id]==product_id:
#     #         patched_data=patch_update.dict(exclude_unset=True)

#     #         for key, value in patched_data.items():
#     #             product[key]= value
            
#     #         return product
        
#     # return None
#     product = db.query(ProductTable).filter(ProductTable.id==product_id).first()

#     if not product:
#         return None

#     update_data= patch_update.dict(exclude_unset= True)

#     for key , value in update_data.items():
#         setattr(product, key, value)

#     db.commit()
#     db.refresh(product)

#     return product

async def patch_update(product_id: int, patch_update, db):

    # product = db.query(ProductTable).filter(ProductTable.id == product_id).first()

    result =await db.execute(
        select(ProductTable).where(ProductTable.id==product_id)
    )

    product = result.scalar_one_or_none()

    if not product:
        return None

    update_data = patch_update.dict(exclude_unset=True)

    for key, value in update_data.items():
        setattr(product, key, value)

    await db.commit()
    await db.refresh(product)

    return product


#delete product

async def delete_product_by_id(db, product_id: int):
    # for index, product in enumerate(products):
    #     if product["id"] == product_id:
    #         deleted_product = products.pop(index)  # remove from list
    #         return deleted_product

    # return None
    # product= db.query(ProductTable).filter(ProductTable.id==product_id)
    result = await db.execute(
        select(ProductTable).where(ProductTable.id==product_id)
    )
    product = result.scalar_one_or_none()

    if not product:
        return None
    
    await db.delete(product)
    await db.commit()

    return product