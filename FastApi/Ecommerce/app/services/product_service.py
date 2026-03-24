from sqlalchemy.orm import Session
from db.base import ProductTable

# GET All Products
def get_all_products(db : Session):
    return db.query(ProductTable).all()


# GET Products by id
def get_product_by_id(db: Session, product_id: int):
    return db.query(ProductTable).filter(ProductTable.id == product_id).first()

# POST to create product
def create_product(db: Session, product_details):
    new_product = ProductTable(**product_details.dict())

    db.add(new_product)
    db.commit()
    db.refresh(new_product)

    return new_product

# PUT to update product
def update_product(db: Session, product_details, product_id):
    product = db.query(ProductTable).filter(ProductTable.id == product_id).first()

    if not product:
        return None
    
    for key, value in product_details.dict().items():
        setattr(product, key, value)
    
    db.commit()
    db.refresh(product)

    return product
    

# DELETE Product
def delete_product(db: Session, product_id):
    product = db.query(ProductTable).filter(ProductTable.id == product_id).first()
    
    if not product:
        return None
    
    db.delete(product)
    db.commit()

    return product



# PATCH Product
def patch_update(db: Session, product_id: int, patch_update):
    product = db.query(ProductTable).filter(ProductTable.id == product_id).first()
    
    if not product:
        return None
    
    update_data = patch_update.dict(exclude_unset = True)

    for key, value in update_data.items():
        setattr(product, key, value)
    
    db.commit()
    db.refresh(product)

    return product


# products=[
#     {
#         "id": 1,
#         "name": "Iphone",
#         "price": 100000,
#         "category": "Electronics",
#         "stock": 10
#     },
#     {
#         "id": 2,
#         "name": "Samsung Galaxy",
#         "price": 80000,
#         "category": "Electronics",
#         "stock": 15
#     }
# ]

# def get_all_products():
#     return products

# def get_product_by_id(product_id: int):
#     for product in products:
#         if product["id"] == product_id:
#             return product
#     return None



# #post product
# def create_product(product):
#     new_product = product.dict()

#     #generate id manually
#     new_product["id"] = len(products) + 1

#     products.append(new_product)
#     return new_product

# def update_product(product_id: int, updated_data):
#     for product in products:
#         if product["id"] == product_id:
#             update_fields = updated_data.dict(exclude_unset=True)
#             product.update(update_fields)
#             return product
#     return None

# def replace_product(product_id: int, new_data):
#     for index, product in enumerate(products):
#         if product["id"] == product_id:
#             replaced = new_data.dict()
#             replaced["id"] = product_id
#             products[index] = replaced
#             return products[index]
#     return None

# def delete_product(product_id: int):
#     for index, product in enumerate(products):
#         if product["id"] == product_id:
#             products.pop(index)
#             return True
#     return False