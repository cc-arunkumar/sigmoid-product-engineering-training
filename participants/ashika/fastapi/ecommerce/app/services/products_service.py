
from sqlalchemy import select
from app.db.base import ProductTable


# get all products
async def getallProduct(db):
   result= await db.execute(select(ProductTable))
   return result.scalars().all()
 

# get product by id

async def get_product_by_id(db,product_id):
    # for product in products:
    #     if product["id"]==product_id:
    #         return product
    result =await db.execute(
         select(ProductTable).where(ProductTable.id==product_id)
     )
    return result.scalar_one_or_none()

#add product
async def create_product(db,product_data):
      newProduct=ProductTable(**product_data.dict())

      db.add(newProduct)
      await  db.commit()
      await db.refresh(newProduct)

      return newProduct

#update by using put
async def update_product(db,product_id, product_data):
     result =await db.execute(
         select(ProductTable).where(ProductTable.id==product_id)
     )
     product=result.scalar_one_or_none()

     if not product:
        return {"error": "Product not found"}

     update_data = product_data.dict()

     for key, value in update_data.items():
        setattr(product, key, value)

    # 4. Commit changes
     await db.commit()
     await db.refresh(product)

     return product
            
     return {"error": "Product not found"}

#update by using patch
async def patch_product(db,product_id, product_data):
    result =await db.execute(
         select(ProductTable).where(ProductTable.id==product_id)
     )
    product=result.scalar_one_or_none()

    if not product:
        return {"error": "Product not found"}

    update_data = product_data.dict(exclude_unset=True)

    for key, value in update_data.items():
        setattr(product, key, value)

    # 4. Commit changes
    await db.commit()
    await db.refresh(product)

    return product
            
#delete product
async def del_product(db,product_id):
     result =await db.execute(
         select(ProductTable).where(ProductTable.id==product_id)
     )
     
     product=result.scalar_one_or_none()

     if not product:
        return {"error": "Product not found"}
     await db.delete(product)
     await db.commit() 
     return {"error": "Product not found"}    