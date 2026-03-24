# products=[
#     {
#         "id":1,
#         "name":"Laptop",
#         "price":500000,
#         "category":"Electronics",
#         "stock":10
#     },
#     {
#         "id":2,
#         "name":"Mobile",
#         "price":250000,
#         "category":"Electronics",
#         "stock":15
#     }
# ]
# # GET PRODUCT BY ID 
# def get_product_by_id(product_id: int):
#     # mention datatype of product id always 
#     for product in products:
#         if product["id"]==product_id:
#             return product
#     return None
# # GET ALL PRODUCTS
# def get_all_products():
#     return products
# #CREATING A NEW PRODUCT
# def create_product(product_data):
#     new_product=product_data.dict()
#     new_product["id"]=len(products)+1
#     field_order = ["id", "name", "price", "category", "stock"]
#     ordered_product = {k: new_product[k] for k in field_order if k in new_product}

#     # THIS WILL CONVERT INCOMING REQUEST BODY DATA INTO A DICTIONARY 
#     products.append(ordered_product)
#     return new_product
# # UPDATE A PRODUCT
# def update_product(product_data,product_id:int):
#     # alternative 1
#     # pydantic is a class,product data is an instance or an object of pydantic class so we convert it to a dictinoary for easier processing for us 
#     updated_product=product_data.dict()
#     for product in products:
#         if product["id"]==product_id:
#             product["name"]=updated_product["name"]
#             product["price"]=updated_product["price"]
#             product["category"]=updated_product["category"]
#             product["stock"]=updated_product["stock"]
#             return product
#     return None

#     # alternative 2
#     # call get by id to see if product is there or not 

#     #alternative3
#     # enumerate is very useful to iterate trhrough multiple vairable sequentially and together simultaneously
#     # for index,product in enumerate(products):
#     #     if product["id"]==product_id:
#     #         updated_product=product_data.dict()
#     #         updated_product["id"]=product_id
#     #         products[index]=updated_product
#     #         return updated_product
#     # return None

# # PATCH A PRODUCT
# def patch_product(product_data,product_id:int):
#     # alternative1
#     # unsafe patch no variable datatype check and no invalid key check possible 
#     # patched_details=product_data
#     # fields_to_patch=patched_details.keys()
#     # for product in products:
#     #     if product["id"]==product_id:
#             # for field in fields_to_patch:
#     #             product[field]=patched_details[field]
#     #         return patched_details
#     # return None

#     # alternative2
#     for product in products:
#         if product['id'] == product_id:
#             patch_data = product_data.dict(exclude_unset=True)
#         # exclude unset=True means:
#         # 1. Set explicitly to unset fields provided by users
#         # 2. Unset user didn't provide it all, even if default exist
#         # *Only include fields that were actually provided when creating this*
#             for key,value in patch_data.items():
#                 product[key] = value
#             return product
#     return None

    
# def delete_product_by_id(product_id:int):
#     for product in products:
#         if product["id"]==product_id:
#             products.remove(product)
#             return True
#     return False


from sqlalchemy.orm import Session
from app.db.base import ProductTable


def get_all_products(db: Session):
    return db.query(ProductTable).all()


def get_product_by_id(db: Session, product_id: int):
    return db.query(ProductTable).filter(ProductTable.id == product_id).first()


def create_product(db: Session, product_data):
    new_product = ProductTable(**product_data.dict())

    db.add(new_product)
    db.commit()
    db.refresh(new_product)

    return new_product


def update_product(db: Session, product_id: int, updated_data):
    product = db.query(ProductTable).filter(ProductTable.id == product_id).first()

    if not product:
        return None

    for key, value in updated_data.dict().items():
        setattr(product, key, value)

    db.commit()
    db.refresh(product)

    return product


def patch_product(db: Session, product_id: int, patch_data):
    product = db.query(ProductTable).filter(ProductTable.id == product_id).first()

    if not product:
        return None

    update_data = patch_data.dict(exclude_unset=True)

    for key, value in update_data.items():
        setattr(product, key, value)

    db.commit()
    db.refresh(product)

    return product


def delete_product_by_id(db: Session, product_id: int):
    product = db.query(ProductTable).filter(ProductTable.id == product_id).first()

    if not product:
        return None

    db.delete(product)
    db.commit()

    return product